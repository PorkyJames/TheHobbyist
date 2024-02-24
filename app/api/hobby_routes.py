from flask import Blueprint, jsonify, request, abort
from flask_login import current_user, login_required

from ..models.db import db
from ..models.hobby import Hobby
from ..models.bookmark import Bookmark

from ..forms.hobby_form import HobbyForm

hobby_routes = Blueprint("hobbies", __name__)

#! Create Route
@hobby_routes.route("/hobbies", methods = ["POST"])
@login_required
def create_hobby():

    form = HobbyForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # Validate the form
    if form.validate_on_submit():
        user_profile = current_user.profile
        new_hobby = Hobby(
            # user_id = current_user.id,
            profile_id=user_profile.id,
            name = form.name.data,
            description = form.description.data,
            location = form.location.data,
            thoughts = form.thoughts.data
        )

        # Add the new profile created to our database and commit
        db.session.add(new_hobby)
        db.session.commit()
    else: 
        return jsonify(form.errors), 400

    return jsonify(new_hobby.to_dict()), 201

#! Read Route
# Read all of the provided Hobbies in a list
@hobby_routes.route("/hobbies")
def get_all_hobbies():
    # Query for the hobbies
    hobbies = Hobby.query.all()

    # Use to_dict and loop through each one to print out all of the hobbies
    all_hobbies = [hobby.to_dict() for hobby in hobbies]

    # Return Response
    return jsonify(all_hobbies), 200

# Read each of the provided Hobby in depth in it's own page
@hobby_routes.route("/hobbies/<int:hobbyId>")
def get_each_hobby(hobbyId):
    # Query for each hobby
    hobby = Hobby.query.get(hobbyId)

    # Edge case for errors
    if hobby is None:
        abort(404, {"message": "Hobby not found"})

    # Otherwise, if the hobby is found, then return it via to_dict()
    hobby_details = hobby.to_dict()

    return jsonify(hobby_details), 200

# Get each User's List of Hobbies that they've created
@hobby_routes.route("/hobbies/current")
@login_required
def get_user_hobbies():
    user_profile_id = current_user.profile.id
    hobbies = Hobby.query.filter_by(profile_id=user_profile_id).all()
    return jsonify([hobby.to_dict() for hobby in hobbies])

#! Update Route
# Logged in User can Update the hobby that they've created
@hobby_routes.route("/hobbies/<int:hobbyId>/edit", methods=["PUT"])
@login_required
def update_user_hobby(hobbyId):
    # Query for the Hobby
    hobby = Hobby.query.get(hobbyId)

    # Edge Cases for any Errors / Authentication
    if not hobby:
        abort(404, {"message": "Hobby could not be found"})

    if hobby.profile_id != current_user.profile.id:
        abort(403, {"message": "Hobby does not belong to the User"})

    data = request.get_json()

    form = HobbyForm(data=data)

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # Check to see if the form validates on Submit
    if form.validate_on_submit():
        hobby.name = form.name.data
        hobby.description = form.description.data
        hobby.location = form.location.data
        hobby.thoughts = form.thoughts.data

        # Commit changes to db
        db.session.commit()

        return jsonify(hobby.to_dict()), 200

    # If there are any form errors, then return the form.errors
    if form.errors:
        return jsonify(form.errors), 400


#! Delete Route
# Logged in User can Delete the hobby that they've created
@hobby_routes.route("/hobbies/<int:hobbyId>", methods=["DELETE"])
@login_required
def delete_user_hobby(hobbyId):
    # Query for the hobby
    hobby = Hobby.query.get(hobbyId)

    # Edge Cases for any Errors / Authentication
    if hobby.user_id != current_user.id:
        abort(403, {"message": "Hobby does not belong to the User"})

    if not hobby:
        abort(404, {"message": "Hobby could not be found"})

    db.session.delete(hobby)
    db.session.commit()

    # Return successful deletion message
    return jsonify({"message": "Hobby has been Deleted successfully" }), 200

