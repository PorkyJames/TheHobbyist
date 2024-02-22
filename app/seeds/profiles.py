# Seeder for Profiles

from ..models import db, User, environment, SCHEMA
from ..models.profile import Profile

from sqlalchemy import text

def seed_profiles():
    # Fetch each demo user by filter
    demo_user = User.query.filter_by(username='demoo').first()
    marnie_user = User.query.filter_by(username='marniee').first()
    bobbie_user = User.query.filter_by(username='bobbiee').first()

    # Demo Profile Seed
    demo_profile = Profile(
        user_id=demo_user.id,
        username="demoo",
        # name='Demo Profile',
        mbti='ENFP',
        bio='Hi, my name is Demo! I love to rock climb and snowboard.',
        interests="The Great Outdoors!",
        city="Salinas",
        state="CA",
        first_name="Demo",
        last_name="User"
    )

    # Marine Profile Seed
    marnie_profile = Profile(
        user_id=marnie_user.id,
        username="marniee",
        # name='Marnie Profile',
        mbti='INTJ',
        bio='Marnie here! I am passionate about photography and exploring the great outdoors.',
        interests="Art and Photography",
        city="Reno",
        state="NV",
        first_name="Marnie",
        last_name="Person"
    )

    # Bobbie profile seed
    bobbie_profile = Profile(
        user_id=bobbie_user.id,
        username="bobbiee",
        # name='Bobbie Profile',
        mbti='ISTP',
        bio='Bobbie at your service, exploring the world of woodworking and DIY.',
        interests="Woodworking and Crafting",
        city="Austin",
        state="TX",
        first_name="Bobbie",
        last_name="Human"
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

