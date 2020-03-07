## Start dev server
1. pip install -r requirements.txt to install packages
1. Override any settings you want by creating a new folder.
    * `python/instance`
    * Create config.cfg inside instance folder to override settings from `default_config.py`
    * **DON'T MODIFY `default_config.py`**, make changes in the config file you made instead
1. Setting DEBUG=True in the config allows the server to reload on source code changes
1. Run your ssh forward before starting the app. https://trello.com/c/6bIcfAnv
1. run start.py from your IDE
