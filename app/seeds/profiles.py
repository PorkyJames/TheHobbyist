# Seeder for Profiles

from ..models import db, User, environment, SCHEMA
from ..models.profile import Profile

from sqlalchemy import text

def seed_profiles():
    # Fetch each demo user by filter
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    # Demo Profile Seed
    demo_profile = Profile(
        user_id=demo_user.id,
        name='Demo Profile',
        mbti='ENTJ',
        bio='Hi, my name is Demo! I love to rock climb and snowboard.'
    )

    # Marine Profile Seed
    marnie_profile = Profile(
        user_id=marnie_user.id,
        name='Marnie Profile',
        mbti='INFP',
        bio='Marnie here! I am passionate about photography and exploring the great outdoors.'
    )

    # Bobbie profile seed
    bobbie_profile = Profile(
        user_id=bobbie_user.id,
        name='Bobbie Profile',
        mbti='ISTP',
        bio='Bobbie at your service, exploring the world of woodworking and DIY.'
    )

    # Add each profile to the database
    db.session.add(demo_profile)
    db.session.add(marnie_profile)
    db.session.add(bobbie_profile)

    # Commit the changes to the database
    db.session.commit()

#! Function to undo seed profiles
def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))
    db.session.commit()

