from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

from ..models import User

class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15))
    bio = db.Column(db.Text(100))
    mbti = db.Column(db.String(4))

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "username": self.username,
            "mbti": self.mbti,
            "bio": self.bio
        }
