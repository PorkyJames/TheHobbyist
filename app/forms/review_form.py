from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, HiddenField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm): 
    hobby_id = IntegerField('Hobby ID', validators=[DataRequired()])
    review_text = TextAreaField('Review Text', validators=[DataRequired(), Length(min=1, max=100)])
    star_rating = IntegerField('Star Rating', validators=[DataRequired(), NumberRange(min=1, max=5, message='Invalid star rating')])
        
