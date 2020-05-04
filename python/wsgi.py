import logging
from ratemydorm import create_app

gunicorn_error_logger = logging.getLogger('gunicorn.error')

app = create_app()
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)
app.logger.debug('this will show in the log')
app.debug = True
if __name__ == "__main__":
    app.run()
