from flask import Flask
from flask_cors import CORS
import logging

app = Flask(__name__, instance_relative_config=True)
CORS(app)

# Load configuration from default_config.py, overwrite with instance/config.cfg if it exists
app.config.from_object('python.ratemydorm.default_config.Config')
app.config.from_pyfile('config.cfg', silent=True)


global_config = {}
global_config.update(app.config)

# Import routes
from . import auth
from .routes import routes
from .routes import example

# Register routes
app.register_blueprint(auth.bp)
app.register_blueprint(routes.bp)
app.register_blueprint(example.bp)


logging.basicConfig(format='%(asctime)s-%(levelname)s: %(message)s',
                    datefmt='%m/%d/%y %H:%M:%S',
                    level=app.config['LOG_LEVEL'])
