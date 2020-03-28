import functools
from flask import (Blueprint, flash, redirect, render_template, request, session, url_for, g)
from flask_cors import CORS

from werkzeug.security import check_password_hash, generate_password_hash
from ratemydorm.sql.db_connect import get_connection
from mysql.connector.errors import IntegrityError, InterfaceError

import logging

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['GET', 'POST'])
def register():
    logging.info('Register route')

    connection = get_connection()
    cursor = connection.cursor()
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        first_name = request.json['first_name']
        last_name = request.json['last_name']

        error = None
        params = {
            'username': username,
            'password': password,
            'email': email,
            'first_name': first_name,
            'last_name': last_name
        }

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        elif cursor.execute(
            'SELECT user_id FROM users WHERE username = %(username)s', params
        ) is not None:
            error = f'User {username} is already registered.'
        elif cursor.execute(
            'SELECT user_id FROM users WHERE email = %(email)s', params
        ) is not None:
            error = f'Email {email} is already in use'

        if error is None:
            params['password'] = generate_password_hash(password)
            try:
                cursor.execute(
                    'INSERT INTO users (username, password, first_name, last_name, email) VALUES (%(username)s, '
                    '%(password)s, %(first_name)s, %(last_name)s, %(email)s)',
                    params
                )

                connection.commit()
                return 'user registered'
            except IntegrityError as e:
                logging.error(f'User exists: {e}')
                return 'Username already exists!'

        flash(error)

    return {}


@bp.route('/passwordhash', methods=['POST'])
def hash_test():
    logging.info(f'/passwordhash {request.form}')
    password = request.form['password']

    value = generate_password_hash(password)

    return {'hash': value}


@bp.route('/hashcheck', methods=['POST'])
def check_hash_test():
    password = request.form['password']
    hash = "pbkdf2:sha256:150000$28k4qheS$ac024a6a882fff20167946377fe8bd1f4c3cb70e9bdcfbd7a8a40e98a4c208ce"
    value = check_password_hash(hash,password)
    return {'value': value}


@bp.route('/login', methods=['GET', 'POST'])
def login():
    logging.debug(request.json)
    connection = get_connection()
    cursor = connection.cursor(named_tuple=True)

    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        params = {'password': password,
                  'email': email}
        error = None
        cursor.execute(
            'SELECT user_id, password FROM users WHERE email = %(email)s', params
        )
        user = cursor.fetchone()

        if user is None:
            error = 'Incorrect email.'
        elif not check_password_hash(user.password, password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user.user_id
            return f'Success: {session}'

        return error
    connection.commit()
    return {}


# @bp.before_request
def load_logged_in_user():
    logging.debug(request.json)

    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        try:
            connection = get_connection()
        except InterfaceError as e:
            return (e.msg)

        cursor = connection.cursor()
        g.user = cursor.execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

    logging.info(f"user: {g.user}")
    logging.debug(f'user_id {session.get("user_id")}')


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