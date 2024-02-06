from ..models import db, User, environment, SCHEMA
from ..models.review import Review
from ..models.hobby import Hobby

from sqlalchemy import text

def seed_reviews():
    # Fetch users by username
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    # Fetch hobbies by name
    rock_climbing_hobby = Hobby.query.filter_by(name='Rock Climbing').first()
    snowboarding_hobby = Hobby.query.filter_by(name='Snowboarding').first()
    photography_hobby = Hobby.query.filter_by(name='Photography').first()

    # Demo leaves a review for Rock Climbing
    if demo_user and rock_climbing_hobby:
        rock_climbing_review = Review(
            user_id=demo_user.id, 
            hobby_id=rock_climbing_hobby.id,
            review_text='Rock climbing is an exhilarating experience that challenges both body and mind.',
            star_rating=5
        )
        db.session.add(rock_climbing_review)
    
    if marnie_user and photography_hobby:
        photography_review = Review(
            user_id=marnie_user.id, 
            hobby_id=photography_hobby.id,
            review_text='Photography has given me something that I will always cherish.',
            star_rating=5
        )
        db.session.add(photography_review)
    
    if bobbie_user and snowboarding_hobby:
        snowboarding_review = Review(
            user_id=bobbie_user.id, 
            hobby_id=snowboarding_hobby.id,
            review_text='Snowboarding was quite difficult. It was hard to enjoy it when I was constantly falling',
            star_rating=2
        )
        db.session.add(snowboarding_review)

    # Commit the changes to the database
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
