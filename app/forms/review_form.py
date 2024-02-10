from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):
    review_text = TextAreaField('Review Text', validators=[DataRequired(), Length(min=1, max=100)])
    star_rating = SelectField('Star Rating', choices=[
        ('1', '1 Star'),
        ('2', '2 Stars'),
        ('3', '3 Stars'),
        ('4', '4 Stars'),
        ('5', '5 Stars')
    ], validators=[DataRequired(), NumberRange(min=1, max=5, message='Invalid star rating')])
