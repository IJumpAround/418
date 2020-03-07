from flask import Flask
from ratemydorm import create_app


app = create_app()

app.run()