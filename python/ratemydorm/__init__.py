from flask import Flask
from flask_cors import CORS
import logging

config = {}


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, resources=r"/*", supports_credentials=True)
    app.config['CORS_HEADERS'] = ['Access-Control-Allow-Origin', 'Content-Type']

    # logging.getLogger('flask_cors').level = logging.DEBUG

    # Load configuration from default_config.py, overwrite with instance/config.cfg if it exists
    if test_config is None:
        try:
            app.config.from_object('ratemydorm.default_config.Config')
            app.config.from_pyfile('config.cfg')
        except IOError:
            print("instance/config.cfg was not found. Using default settings")
    else:
        app.config.from_mapping(test_config)

    config['aws_access_key_id'] = app.config.get('AWS_ACCESS_KEY_ID')
    config['aws_secret_access_key'] = app.config.get('AWS_SECRET')
    config['aws_region'] = 'us-east-2'
    config['aws_bucket'] = app.config.get('AWS_BUCKET')

    # Import routes
    from ratemydorm.routes import auth
    from ratemydorm.routes import example
    from ratemydorm.routes import status
    from ratemydorm.routes import user
    from ratemydorm.routes import searchpage
    from ratemydorm.routes import dorms
    from ratemydorm.routes import s3
    from ratemydorm.routes import images

    # Register routes
    app.register_blueprint(auth.bp)
    app.register_blueprint(example.bp)
    app.register_blueprint(status.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(searchpage.bp)
    app.register_blueprint(dorms.bp)
    app.register_blueprint(s3.bp)
    app.register_blueprint(images.bp)

    # Setup project logger
    logger = logging.getLogger('main')
    log_level = logging.getLevelName(app.config['LOG_LEVEL'])
    logger.level = log_level
    ch = logging.StreamHandler()
    ch.setLevel(log_level)
    formatter = logging.Formatter('%(asctime)s-[%(filename)s.%(funcName)s() %(levelname)s]: %(message)s',
                                  datefmt='%m/%d/%y %H:%M:%S')
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    logger.info('test123')
    return app
