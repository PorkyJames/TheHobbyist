from flask import Blueprint, jsonify, abort, request, redirect
from flask_login import current_user, login_required, logout_user

from ..models.db import db
from ..models.profile import Profile
from ..models.hobby import Hobby
from ..models.user import User

from ..forms.profile_form import ProfileForm

profile_routes = Blueprint("/profiles", __name__)

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

#! Create Route
@profile_routes.route("/profiles", methods = ["POST"])
@login_required
def create_profile():

    # Parse the JSON data from the request
    data = request.get_json()
    
    # Create an instance of the ProfileForm, populating it with data from the request
    form = ProfileForm(data=data)
    
    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # Validate the form
    if form.validate_on_submit():
        # Create the profile with the validated data
        new_profile = Profile(
            user_id=current_user.id,
            username=form.username.data,
            bio=form.bio.data,
            mbti=form.mbti.data,
            interests=form.interests.data,
            city=form.city.data,
            state=form.state.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        # Add the new profile created to our database
        db.session.add(new_profile)
        db.session.commit()

        return jsonify(new_profile.to_dict()), 201
    
    return {'errors': (form.errors)}, 400

    # # ! Now that we've created the profile and added to our Database,
    # # ! we need to let the User select their first hobby. 

    # # Associate hobbies with the user
    # selected_hobbies_ids = data['hobbies'] 

    # for hobby_id in selected_hobbies_ids:
    #     # Fetch the hobby by ID and set its user_id
    #     hobby = Hobby.query.get(hobby_id)
    #     if hobby:
    #         hobby.user_id = current_user.id
    #         db.session.add(hobby)

    # db.session.commit()
    
    # return jsonify(new_profile.to_dict()), 201

#! Read Routes

# User can see the detail of each profile in its own page
@profile_routes.route("/profiles/<int:profileId>")
def each_profile_details(profileId):
    # Query to get each Profile based on ID
    each_profile = Profile.query.get(profileId)

    # Edge Cases for Errors
    # # If the profile doesn't exist, then we can't find it
    # if not each_profile:
    #     abort(404, {"error": "Profile not Found"})

    if not each_profile:
        return jsonify({'error': "Profile not Found"}), 404

    return jsonify(each_profile.to_dict()), 200

# @profile_routes.route("/profiles/<int:profileId>")
# @login_required
# def user_profile_details(profileId):
#     # Query to get the current user's profile Id
#     user_profile = Profile.query.filter(Profile.user_id == current_user.id).all()

#     if user_profile:
#         profile_data = user_profile.to_dict()
#         return jsonify(profile_data), 200

#! Update Routes
# Logged in User can update their profile in the profile menu / button
@profile_routes.route("/profiles/<int:profileId>", methods=["PUT"])
@login_required
def update_user_profile(profileId):
    # Query to get the user's profile by ID and ensure it belongs to the current user
    user_profile = Profile.query.filter_by(id=profileId, user_id=current_user.id).first()

    # if profile not found
    if user_profile is None:
        return jsonify({"error": "Profile not found or not authorized"}), 404

    data = request.get_json()

    # if 'username' in data and data['username'] != user_profile.username:
    #     existing_user = User.query.filter(
    #         User.username == data['username'],
    #         User.id != current_user.id
    #     ).first()
    #     if existing_user:
    #         return jsonify({'errors': ['Username already taken']}), 400

    # Instantiate a new form instance with data from the request
    form = ProfileForm(data=data, user_id=current_user.id)

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # if 'username' in data and data['username'] != user_profile.username:

    #     existing_user = User.query.filter(
    #         User.username == data['username'],
    #         User.id != current_user.id
    #     ).first()

    #     # print(f"Existing user found: {existing_user}")

    #     if existing_user:
    #         return jsonify({"error": "Username already taken"}), 400
    
    if form.validate_on_submit():
        # Update profile fields with data from the form
        user_profile.username = form.username.data
        user_profile.bio = form.bio.data
        user_profile.mbti = form.mbti.data
        user_profile.interests = form.interests.data
        user_profile.city = form.city.data
        user_profile.state = form.state.data
        user_profile.first_name = form.first_name.data
        user_profile.last_name = form.last_name.data

        db.session.commit()

        return jsonify(user_profile.to_dict()), 200
    else:
        # If the form does not validate, return the form errors
        print(form.errors)
        return {'errors': (form.errors)}, 400

#! Delete Routes
# User can delete their profile which will result in them being logged out 
@profile_routes.route("/profiles/<int:profileId>", methods=["DELETE"])
@login_required
def delete_user_profile(profileId):
    # Query to get the user's profile by ID and ensure it belongs to the current user
    user_profile = Profile.query.filter_by(id=profileId, user_id=current_user.id).first()

    # Error Messages to check if profile exists
    if not user_profile:
        return jsonify({"message": "Profile does not exist"}), 400
    
    if user_profile.user_id != current_user.id:
        return jsonify({'message': "Profile does not belong to User"}), 401
    
    # Delete the Profile and User
    if user_profile.user_id == current_user.id:
        db.session.delete(user_profile)
        
        # Query for the user
        user = User.query.get(current_user.id)
        if user:
            db.session.delete(user)
            db.session.commit()
            logout_user() 
            # redirect('/')
            return jsonify({'message': "Profile and User has been Deleted Successfully"}), 200
        else:
            return jsonify({'message': "User not found"}), 400

    # return jsonify({"message": "Profile has been deleted successfully"}), 200
