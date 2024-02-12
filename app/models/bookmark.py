from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # is_active = db.Column(db.Boolean, default=True, nullable=False)
    # created_at = db.Column(db.DateTime)

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'), nullable=False)

    hobby = db.relationship('Hobby', back_populates='bookmarks')

    def to_dict(self, include_hobby=False):
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "hobby_id": self.hobby_id,
            # "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        if include_hobby and self.hobby:
            data['hobby'] = {
                "name": self.hobby.name,
                "description": self.hobby.description,
                "location": self.hobby.location,
            }
        return data
