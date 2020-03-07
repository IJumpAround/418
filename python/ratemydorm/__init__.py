import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# from . import auth


app = Flask(__name__, instance_relative_config=True)
app.config.from_object('ratemydorm.default_config.Config')
app.config.from_pyfile('config.cfg', silent=True)

db = SQLAlchemy(app)


print(app.config)

try:
    os.makedirs(app.instance_path)
except OSError:
    pass

db.init_app(app)
with app.app_context():
    from . import routes
    db.create_all()
