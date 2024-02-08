from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.hobby import Hobby

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
        new_hobby = Hobby(
            name = form.name.data,
            description = form.description.data,
            location = form.location.data
        )

        # Add the new profile created to our database and commit
        db.session.add(new_hobby)
        db.session.commit()

    return jsonify(new_hobby.to_dict()), 201

#! Read Route
# Read all of the provided Hobbies 
@hobby_routes.route("/hobbies")
def get_all_hobbies():
    pass



#! Update Route


#! Delete Route


