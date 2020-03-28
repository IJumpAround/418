import functools
from flask import Blueprint, flash, redirect, request, session, url_for, g, current_app

from werkzeug.security import check_password_hash, generate_password_hash
from ratemydorm.sql.db_connect import get_connection
from mysql.connector.errors import IntegrityError, InterfaceError

import logging

bp = Blueprint('auth', __name__, url_prefix='/auth')


def exclude_from_before_request(func):
    func._exclude_from_loading = True
    return func


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

        elif cursor.execute('SELECT user_id FROM users WHERE username = %(username)s', params)\
                is not None:
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

        return error

    return 400


@bp.route('/login', methods=['GET', 'POST'])
# @exclude_from_before_request
def login():
    logging.debug(request.json)
    data_response = {'success': False}
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
            data_response['success'] = True
            return data_response, 200

        data_response['message'] = error
        return data_response, 401
    connection.commit()
    # return {}


@bp.route('/user', methods=['GET'])
def get_user_id_and_role():
    logging.debug(request.json)

    user_id = session.get('user_id')
    admin = session.get('admin')
    admin = True if admin else False


@bp.route('/test_rendering', methods=['GET'])
def test():
    logging.debug(f'session value in test route: {session}')
    logging.debug(f'g value in test route {g.get("user")}')
    user = {
        'user_id': session.get('user_id'),
        'role': session.get('role'),
    }

    return user


@bp.route('/user_logged_in', methods=['GET'])
def user_logged_in():
    if g.user is None:
        return 401
    else:
        return 200


@bp.before_request
def load_logged_in_user():
    logging.debug(request.json)
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        try:
            connection = get_connection()
        except InterfaceError as e:
            return e.msg

        cursor = connection.cursor(buffered=True)
        cursor.execute(
            'SELECT * FROM users WHERE user_id = %(user_id)s', {'user_id': user_id}
        )
        g.user = cursor.fetchone()


@bp.route('/logout')
def logout():
    session.clear()
    return 200


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return 401

        return view(**kwargs)
    return wrapped_view
