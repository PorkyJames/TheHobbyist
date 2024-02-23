from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User

def username_exists(form, field):
    # Checking if username exists
    username = field.data
    user = User.query.filter_by(username=username).first()
    if user:
        raise ValidationError('Username already taken.')

class ProfileForm(FlaskForm):

    username = StringField('User Name', validators=[DataRequired(), Length(max=15), username_exists])
    bio = TextAreaField('Bio', validators=[DataRequired(), Length(max=100)])
    mbti = StringField('MBTI', validators=[DataRequired(), Length(max=4)])
    interests = StringField('Interests', validators=[Length(max=100)])
    city = StringField("City", validators=[Length(max=50)])
    state = StringField("State", validators=[Length(max=50)])
    first_name = StringField("First Name", validators=[DataRequired(), Length(max=25)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(max=25)])

