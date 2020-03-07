import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# from . import auth

db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('default_config')
    if test_config is None:
        app.config.from_pyfile('config.cfg', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.init_app(app)
    with app.app_context():
        from . import routes

       # app.register_blueprint(auth.bp)

        db.create_all()
        return app
