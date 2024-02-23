from ..models import db, User, environment, SCHEMA
from ..models.hobby import Hobby

from sqlalchemy import text

def seed_hobbies():
    # Fetch users by username
    demo_user = User.query.filter_by(username='demoo').first()
    marnie_user = User.query.filter_by(username='marniee').first()
    bobbie_user = User.query.filter_by(username='bobbiee').first()

    # Specific Seeded Hobby based on Demo, Marine, and Bobbie.
    rock_climbing_hobby = Hobby(
        # user_id=demo_user.id, 
        profile_id=demo_user.profile.id,
        name='Rock Climbing',
        description='Testing your limits by climbing natural rock formations or artificial rock walls.',
        location='Climbing Gyms and Outdoor Crags',
        thoughts="It was very tough as I didn't really exercise in a while. I think this will really help me get back into shape."
    )

    snowboarding_hobby = Hobby(
        # user_id=demo_user.id,
        profile_id=demo_user.profile.id,
        name='Snowboarding',
        description='Sliding down snow-covered slopes with your feet strapped to a snowboard.',
        location='Mountain Resorts',
        thoughts='Carving through the snow is incredibly therapeutic. It really helps me put my mind at ease from all of the hustle and bustle of the world'
    )

    photography_hobby = Hobby(
        # user_id=marnie_user.id, 
        profile_id=demo_user.profile.id, 
        name='Photography',
        description='Capturing life moments and the unseen beauty of the world.',
        location='Anywhere you want',
        thoughts='I cannot express how much emotion I can capture into one picture. They do say a picture is worth a thousand words.'
    )

    hiking_hobby = Hobby(
        # user_id=marnie_user.id,
        profile_id=demo_user.profile.id,
        name='Hiking',
        description='Exploring the beauty of nature through trails and mountains.',
        location='National Parks',
        thoughts="Nothing more refreshing than going on a hike and achieving something new that day. It is a blessing, but a curse for my knees."
    )

    woodworking_hobby = Hobby(
        # user_id=bobbie_user.id, 
        profile_id=demo_user.profile.id,
        name='Woodworking',
        description='Creating beautiful and functional items from different types of wood.',
        location='Workshop',
        thoughts='I love crafting small bits of wood into one massive project. It is so satisfying to be able to work on beautiful sculptures made out of wood.'
    )

    # Add all of the seeded hobbies to the database
    db.session.add(rock_climbing_hobby)
    db.session.add(snowboarding_hobby)
    db.session.add(photography_hobby)
    db.session.add(hiking_hobby)
    db.session.add(woodworking_hobby)

    db.session.commit()

#! Function to undo seed hobbies
def undo_hobbies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.hobbies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM hobbies"))
    db.session.commit()
