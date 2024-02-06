from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(15))
    bio = db.Column(db.Text(50))
    mbti = db.Column(db.String(4))

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "name": self.name,
            "mbti": self.mbti,
            "bio": self.bio
        }
