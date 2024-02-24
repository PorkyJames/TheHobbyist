from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

from ..models import User

class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    username = db.Column(db.String(15))
    bio = db.Column(db.Text)
    mbti = db.Column(db.String(4))
    interests = db.Column(db.String(50)) 
    city = db.Column(db.String(50))  
    state = db.Column(db.String(50))  
    first_name = db.Column(db.String(25))  
    last_name = db.Column(db.String(25)) 

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'), nullable=False)
    hobbies = db.relationship('Hobby', backref='profile', lazy='dynamic', cascade='delete, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "username": self.username,
            "mbti": self.mbti,
            "bio": self.bio,
            "interests": self.interests,
            "city": self.city,
            "state": self.state,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }
