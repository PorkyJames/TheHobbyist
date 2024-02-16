from flask import Blueprint, jsonify, abort, request, redirect
from flask_login import current_user, login_required, logout_user

from ..models.db import db
from ..models.profile import Profile
from ..models.hobby import Hobby
from ..models.user import User

from ..forms.profile_form import ProfileForm

profile_routes = Blueprint("/profiles", __name__)

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
            name=form.name.data,
            bio=form.bio.data,
            mbti=form.mbti.data
        )
        # Add the new profile created to our database
        db.session.add(new_profile)
        db.session.commit()

        return jsonify(new_profile.to_dict()), 201
    
    return jsonify(form.errors), 400

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

# # User can see the details of their own Board in its own page
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

    if user_profile is None:
        return jsonify({"error": "Profile not found or not authorized"}), 404

    # Instantiate a new form instance with data from the request
    form = ProfileForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        # Update profile fields with data from the form
        user_profile.name = form.name.data
        user_profile.bio = form.bio.data
        user_profile.mbti = form.mbti.data

        db.session.commit()

        return jsonify(user_profile.to_dict()), 200
    else:
        # If the form does not validate, return the form errors
        return jsonify({"errors": form.errors}), 400

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