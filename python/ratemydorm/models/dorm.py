class Dorm:
    def __init__(self, latitude, longitude, room_num, floor, building, quad, address, features, dorm_id=None):
        self.dorm_id = dorm_id
        self.latitude = latitude
        self.longitude = longitude
        self.room_num = room_num
        self.floor = floor
        self.building = building
        self.quad = quad
        self.address = address
        self.features = Features(**features)


class Features:
    def __init__(self, room_type, bathroom, ac, gym, laundry, internet, kitchen):
        self.room_type = room_type
        self.bathroom = bathroom
        self.ac = ac
        self.gym = gym
        self.laundry = laundry
        self.internet = internet
        self.kitchen = kitchen
