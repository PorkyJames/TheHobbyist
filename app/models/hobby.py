from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

class Hobby(db.Model):
    __tablename__ = 'hobbies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String)
    thoughts = db.Column(db.String)
    # created_at = db.Column(db.DateTime)
    # updated_at = db.Column(db.DateTime)

    # Relationships
    reviews = db.relationship('Review', back_populates='hobby', cascade='all, delete-orphan')
    bookmarks = db.relationship('Bookmark', back_populates='hobby', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id, 
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "thoughts": self.thoughts
            # "created_at": self.created_at.isoformat() if self.created_at else None,
            # "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
