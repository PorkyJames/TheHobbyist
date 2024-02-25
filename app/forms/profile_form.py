from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User


class ProfileForm(FlaskForm):
    def __init__(self, user_id=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_id = user_id

    # Modify the custom validator to exclude the current user's username
    def username_exists(form, field):
        # If user_id is provided, exclude the current user from the check
        if form.user_id:
            existing_user = User.query.filter(
                User.username == field.data, User.id != form.user_id).first()
        else:
            existing_user = User.query.filter_by(username=field.data).first()

        if existing_user:
            raise ValidationError('Username already taken.')
        
    username = StringField('User Name', validators=[DataRequired(), Length(max=15), username_exists])
    bio = StringField('Bio', validators=[DataRequired(), Length(max=100)])
    mbti = StringField('MBTI', validators=[DataRequired(), Length(max=4)])
    interests = StringField('Interests', validators=[Length(max=100)])
    city = StringField("City", validators=[Length(max=50)])
    state = StringField("State", validators=[Length(max=50)])
    first_name = StringField("First Name", validators=[DataRequired(), Length(max=25)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(max=25)])

