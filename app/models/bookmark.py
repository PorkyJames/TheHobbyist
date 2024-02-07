from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # created_at = db.Column(db.DateTime)

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "hobby_id": self.hobby_id,
            # "created_at": self.created_at.isoformat() if self.created_at else None,
        }
