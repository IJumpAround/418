import functools
from flask import (Blueprint, flash, redirect, render_template, request, session, url_for, g)

from werkzeug.security import check_password_hash, generate_password_hash
from ratemydorm.sql.db_connect import get_connection
from mysql.connector.errors import IntegrityError, InterfaceError

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    connection = get_connection()

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        params = {
            'username': username,
            'password': password
        }

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif cursor.execute(
            'SELECT id FROM users WHERE username = %(username)s', params
        ) is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            params['password'] = generate_password_hash(password)
            try:
                cursor.execute(
                    'INSERT INTO users (username, password) VALUES (%(username)s, %(password)s)',
                    params
                )

                cursor.commit()
                return redirect(url_for('bp.login'))
            except IntegrityError:
                return('Username already exists!')

        flash(error)

    return {}


@bp.route('/login', methods=('GET', 'POST'))
def login():
    connection = get_connection()
    cursor = connection.cursor()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        user = cursor.execute(
            'SELECT * FROM users WHERE username = ?', (username,)
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)
    connection.commit()
    return render_template('bp/login.html')


@bp.before_request
def load_logged_in_user():
    try:
        connection = get_connection()
    except InterfaceError as e:
        return(e.msg)
    cursor = connection.cursor()
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = cursor.execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view