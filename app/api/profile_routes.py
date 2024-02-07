from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

profile_routes = Blueprint("profiles", __name__)

#! Create Route
@profile_routes.route("/profiles", methods = ["POST"])
@login_required
def create_profile():
    # Create a new instance of the Profile Form
    #! Create the form in the forms folder
    form = ProfileForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

#! Read Routes


#! Update Routes


#! Delete Routes

