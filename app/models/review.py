from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.Text)
    star_rating = db.Column(db.Integer)
    # created_at = db.Column(db.DateTime)
    # updated_at = db.Column(db.DateTime)

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "hobby_id": self.hobby_id,
            "review_text": self.review_text,
            "star_rating": self.star_rating,
        }
