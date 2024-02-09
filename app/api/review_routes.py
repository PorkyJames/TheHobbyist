from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.review import Review

review_routes = Blueprint("/reviews", __name__)

#! Create Route
# Logged in User should be able to create a new review on a hobby
@review_routes.routes("/reviews", methods=["POST"])
@login_required
def create_review():
    pass

#! Read Route
# Logged in User should be able to see their own reviews in different hobbies
@review_routes.routes("/reviews")
def view_all_reviews():
    pass

# Logged in user can view each review for a hobby
@review_routes.routes("/reviews/<int:reviewId>")
def view_each_review():
    pass

#! Update Route
# Logged in User can update their reviews via a modal
@review_routes.routes("/reviews/<int:reviewId>", methods = ["PUT"])
@login_required
def update_review():
    pass

#! Delete Route
# Logged in User can delete their own reviews via a Modal
@review_routes.routes("/reviews/<int:reviewId>", methods = ["DELETE"])
@login_required
def delete_review():
    pass
