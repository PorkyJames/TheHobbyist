from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.review import Review

from ..forms.review_form import ReviewForm

review_routes = Blueprint("/reviews", __name__)

#! Create Route
# Logged in User should be able to create a new review on a hobby
@review_routes.route("/reviews", methods=["POST"])
@login_required
def create_review():

    # New instance of form
    form = ReviewForm()

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            hobby_id=form.hobby_id.data,
            review_text=form.review_text.data,
            star_rating=form.star_rating.data
        )

        # Add the new review to the DB
        db.session.add(new_review)
        db.session.commit()

        # Successful response message
        return jsonify({"message": "Review created Successfully"}), 201
    
    # Otherwise, return any form errors
    return jsonify(form.errors), 400

#! Read Route
# Logged in User should be able to see all of their own reviews in one spot.
@review_routes.route("/reviews")
def view_all_reviews():

    # Query the database for all reviews made by current user
    all_user_reviews = Review.query.filter_by(user_id=current_user.id).all()

    # Convert into to_dict and list them in one area
    reviews_list = [review.to_dict() for review in all_user_reviews]

    # Return jsonified reviews list
    return jsonify(reviews_list)

# Logged in user can view each review for a hobby
@review_routes.route("/reviews/<int:reviewId>")
def view_each_review(reviewId):

    # Find the review by ID
    review = Review.query.filter_by(id=reviewId, user_id=current_user.id).first()

    # If the review doesn't exist or doesn't belong to the current user, return a 404 error
    if not review:
        abort(404, description="Review not found or access denied")

    # Return the review's details via to_dict
    return jsonify(review.to_dict())

#! Update Route
# Logged in User can update their reviews via a modal
@review_routes.route("/reviews/<int:reviewId>", methods = ["PUT"])
@login_required
def update_review(reviewId):
    # Query for review based on user Id
    review = Review.query.filter_by(id=reviewId, user_id=current_user.id).first()
    
    # If review doesn't belong to owner / not found
    if not review:
        abort(404, description="Review not found or access denied")

    # New form instance based on the request form
    form = ReviewForm(request.form)

    # CSRF Token authentication
    form['csrf_token'].data = request.cookies['csrf_token']

    # Update the review with data from the form
    if form.validate_on_submit():
        review.review_text = form.review_text.data
        review.star_rating = form.star_rating.data

        # Commit the changes to the database
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'Review updated successfully'}), 200
    
    # Otherwise, return form errors
    return jsonify(form.errors), 400

#! Delete Route
# Logged in User can delete their own reviews via a Modal
@review_routes.route("/reviews/<int:reviewId>", methods = ["DELETE"])
@login_required
def delete_review(reviewId):
    # Query for the review based on id
    review = Review.query.filter_by(id=reviewId, user_id=current_user.id).first()

    # If review doesn't belong to owner / not found
    if not review:
        abort(404, description="Review not found or access denied")

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review Delete Successfully"}), 200
