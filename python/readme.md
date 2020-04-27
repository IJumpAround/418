## Start dev server
1. This project was built with python 3.8
1. It was tested using a python 3.8 venv located in the python folder.
    * https://docs.python.org/3/library/venv.html#creating-virtual-environments
    * Follow directions then run `venv/scripts/activate` before installing requirements if you choose to use venv.
1. pip install -r requirements.txt to install packages
1. Override any settings you want by creating a new folder.
    * `python/instance/`
    * Create config.cfg inside instance folder to override settings from `default_config.py`
    * **DON'T MODIFY `default_config.py`**, make changes in the config file you made instead
1. Setting DEBUG=True in the config allows the server to reload on source code changes
1. Run your ssh forward before starting the app. https://trello.com/c/6bIcfAnv
1. run start.py from your IDE
    * Alternatively do `python start.py`
    
# API

### Users
User related endpoints

#### Profile
* Location: `/user/profile`
* Method: **GET**

Params:
{'user_id': int}
Example response:
```python
result = {
  'message': None,
  'payload': {
    'images': [{
      'dorm_id': 10,
      'url': 'asecondimageforthesamedormbythesameuser',
      'user_id': 18
    }, {
      'dorm_id': 10,
      'url': 'testurl',
      'user_id': 18
    }],
    'reviews': [{
      'dorm_id': 10,
      'rating': 5,
      'review_id': 8,
      'review_text': 'I LOVED HATED ENJOYED DESPISED SOMETHINGED this dorm',
      'timestamp': 'Sun, 05 Apr 2020 16:58:40 GMT',
      'user_id': 18
    }, {
      'dorm_id': 10,
      'rating': 3,
      'review_id': 9,
      'review_text': 'A second review by the same user for the same dorm',
      'timestamp': 'Sun, 05 Apr 2020 16:53:49 GMT',
      'user_id': 18
    }],
    'user': {
      'email': 'test123@albany.edu',
      'first_name': 'Test',
      'last_name': 'User',
      'profile_bio': None,
      'profile_image': None,
      'status': None,
      'user_role': '',
      'username': 'Testy'
    }
  }
}
```

### Dorm

#### Add Dorm
* `/dorms`
* Method **POST**

Example Request:
```python
"""Endpoint for dorm creation
    Example post request:
    {
      "address": "test address, test, test state, 00000",
      "room_num": "3",
      "building": "Adirondack Hall",
      "quad": "Colonial",
      "floor": "1",
      "latitude": 42.6878856096061,
      "longitude": -73.82490425053925,
      "features": {
        "room_type": "Triple",
        "bathroom": "On Floor",
        "ac": "false",
        "gym": "false",
        "laundry": "On Floor",
        "internet": "Both",
        "kitchen": "In Dorm Kitchen"
        }
    }
"""    
```


#### Add review
* `/dorms/review`
* Method = **POST**

Example request data:
```python
"""
{
  user_id: 2,
  dorm_id: 3,
  rating: 5,
  review_text: 'some review text'
}
"""
```


### Images


#### S3 Url
* /s3Upload
* Method = **POST**

Example request
```json
{
  "filename": "name of file being uploaded"
}
```


#### Storing Image URL