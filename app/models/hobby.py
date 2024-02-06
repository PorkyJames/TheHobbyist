from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Hobby(db.Model):
    __tablename__ = 'hobbies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Relationships
    bookmarks = db.relationship('Bookmark', backref='hobby')
    reviews = db.relationship('Review', backref='hobby')
