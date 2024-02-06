from ..models import db, User, environment, SCHEMA
from ..models.bookmark import Bookmark
from ..models.hobby import Hobby

from sqlalchemy import text

def seed_bookmarks():
    # Fetch users by username
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    # Fetch hobbies by name
    photography_hobby = Hobby.query.filter_by(name='Photography').first()
    snowboarding_hobby = Hobby.query.filter_by(name='Snowboarding').first()
    rock_climbing_hobby = Hobby.query.filter_by(name='Rock Climbing').first()

    # Create bookmarks
    if demo_user and photography_hobby:
        demo_bookmark = Bookmark(
            user_id=demo_user.id, 
            hobby_id=photography_hobby.id
            )
        
        db.session.add(demo_bookmark)
    
    if marnie_user and snowboarding_hobby:
        marnie_bookmark = Bookmark(
            user_id=marnie_user.id, 
            hobby_id=snowboarding_hobby.id
            )
        db.session.add(marnie_bookmark)
    
    if bobbie_user and rock_climbing_hobby:
        bobbie_bookmark = Bookmark(
            user_id=bobbie_user.id, 
            hobby_id=rock_climbing_hobby.id
            )
        db.session.add(bobbie_bookmark)

    # Commit the changes to the database
    db.session.commit()

def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))
    db.session.commit()
