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
# Logged in User should be able to see all of their reviews in one place
@review_routes.routes("/reviews")
@login_required
def all_reviews():
    pass

# Logged in user can view each review via a modal and edit it
@review_routes.routes("/reviews/<int:reviewId>")
@login_required
def update_reviews():
    pass

#! Update Route


#! Delete Route
