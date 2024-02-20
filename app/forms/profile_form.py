from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ProfileForm(FlaskForm):
    username = StringField('User Name', validators=[DataRequired(), Length(max=15)])
    bio = TextAreaField('Bio', validators=[Length(max=100)])
    mbti = StringField('MBTI', validators=[Length(max=4)])
