from marshmallow import Schema, fields


class FeaturesSchema(Schema):
    room_type = fields.Str(allow_none=False)
    bathroom = fields.Str(allow_none=False)
    ac = fields.Bool(allow_none=False)
    gym = fields.Bool(allow_none=False)
    laundry = fields.String(allow_none=False)
    internet = fields.String(allow_none=False)
    kitchen = fields.String(allow_none=False)


class AddDormRequestSchema(Schema):
    address = fields.String(allow_none=False)
    room_num = fields.Integer(allow_none=False)
    building = fields.String(allow_none=False)
    quad = fields.String(allow_none=False)
    floor = fields.Integer(allow_none=False)
    latitude = fields.Decimal()
    longitude = fields.Decimal()
    features = fields.Nested(FeaturesSchema)
