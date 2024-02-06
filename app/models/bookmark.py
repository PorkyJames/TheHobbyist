from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)

    # Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey('hobbies.id'), nullable=False)
