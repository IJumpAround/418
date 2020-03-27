import functools
from flask import (Blueprint, flash, redirect, render_template, request, session, url_for, g)
from ratemydorm.sql.db_connect import get_connection
from mysql.connector.errors import IntegrityError, InterfaceError

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/loadcards', methods=('GET', 'POST'))
def load_cards():
    connection = get_connection()
    cursor = connection.cursor()

    if request.method == 'POST':
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        error = None
        params = {
            'latitude': latitude,
            'longitude': longitude
        }
