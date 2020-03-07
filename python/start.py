# Yes this is dumb and shows up as an error, don't change it though.
from ratemydorm import create_app


if __name__ == '__main__':
    app = create_app()
    app.run(host='localhost',
            port=5001)