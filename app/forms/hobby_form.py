from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class HobbyForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=20)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=255)])
    location = StringField('Location', validators=[Length(max=50)])
