from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Hobby(db.Model):
    __tablename__ = 'hobbies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String)
    # created_at = db.Column(db.DateTime)
    # updated_at = db.Column(db.DateTime)

    # Relationships
    bookmarks = db.relationship('Bookmark', backref='hobby')
    reviews = db.relationship('Review', backref='hobby')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,  # if this field is necessary
            "name": self.name,
            "description": self.description,
            "location": self.location,
            # "created_at": self.created_at.isoformat() if self.created_at else None,
            # "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
