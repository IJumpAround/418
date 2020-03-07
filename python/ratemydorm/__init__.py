from flask import Flask
from flask_cors import CORS


app = Flask(__name__, instance_relative_config=True)
CORS(app)

app.config.from_object('python.ratemydorm.default_config.Config')
app.config.from_pyfile('config.cfg', silent=True)

global_config = {}
global_config.update(app.config)


from . import auth, routes

app.register_blueprint(auth.bp)
app.register_blueprint(routes.bp)