from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ProfileForm(FlaskForm):
    username = StringField('User Name', validators=[DataRequired(), Length(max=15)])
    bio = TextAreaField('Bio', validators=[DataRequired(), Length(max=100)])
    mbti = StringField('MBTI', validators=[DataRequired(), Length(max=4)])
    interests = StringField('Interests', validators=[Length(max=100)])
    city = StringField("City", validators=[Length(max=50)])
    state = StringField("State", validators=[Length(max=50)])
    first_name = StringField("First Name", validators=[DataRequired(), Length(max=25)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(max=25)])

