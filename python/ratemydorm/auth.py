import functools
from flask import (Blueprint, flash, redirect, render_template, request, session, url_for, g)

from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('auth', __name__, url_prefix='/auth')

from python.ratemydorm.sql.db_connect import connector
from mysql.connector.errors import IntegrityError


@bp.route('/register', methods=('GET', 'POST'))
def register():
    cursor = connector.cursor()
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
                return redirect(url_for('auth.login'))
            except IntegrityError:
                return('Username already exists!')

        flash(error)

    return {}


@bp.route('/login', methods=('GET', 'POST'))
def login():
    cursor = connector.cursor()
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

    return render_template('auth/login.html')



@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = models.db.execute(
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