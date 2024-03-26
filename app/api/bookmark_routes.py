from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.profile import Profile
from ..models.hobby import Hobby
from ..models.bookmark import Bookmark

bookmark_routes = Blueprint("/bookmarks", __name__)

#! Create Route
# Logged in User should be able to create a new bookmark
@bookmark_routes.route("/bookmarks", methods=['POST'])
@login_required
def create_bookmark():

    hobby_id = request.json.get('hobby_id')
    
    if not hobby_id:
        return jsonify({'error': 'Missing hobby ID'}), 400

    # Edge case for hobbies that end up getting deleted
    hobby = Hobby.query.get(hobby_id)
    if hobby is None:
        return jsonify({'error': 'Hobby not found'}), 404
    
    # Edge case to check to see if there is an existing bookmark in user profile
    existing_bookmark = Bookmark.query.filter_by(user_id=current_user.id, hobby_id=hobby_id).first()
    if existing_bookmark:
        return jsonify({'message': 'Bookmark already exists'}), 409

    # Create the bookmark
    new_bookmark = Bookmark(
        user_id=current_user.id, 
        hobby_id=hobby_id
        )
    
    # Add and commit the new_bookmark
    db.session.add(new_bookmark)
    db.session.commit()

    # Return response message
    return jsonify(new_bookmark.to_dict()), 201

#! Read Route
# Logged in User should be able to see all of their bookmarks in one list
@bookmark_routes.route('/bookmarks')
def all_bookmarks():
    # Query to look for user's bookmarks
    bookmarks = Bookmark.query.filter_by(user_id=current_user.id).all()

    # Get each bookmark info and iterate to list them out
    bookmarks_info = [bookmark.to_dict(include_hobby=True) for bookmark in bookmarks]

    # Return the entire bookmark list
    return jsonify(bookmarks_info)

# Logged in User should be able to see each individual bookmark with the details
# I want them to be able to click and modal appears that shows the bookmark in details
@bookmark_routes.route('/bookmarks/<int:bookmarkId>')
def each_bookmark(bookmarkId):
    # Query the database for the bookmark with the given id
    bookmark = Bookmark.query.filter_by(id=bookmarkId, user_id=current_user.id).first()

    # Edge cases for bookmark errors
    if not bookmark:
        abort(404, description="Bookmark not found or access denied")

    # get each bookmark details with to_dict()
    bookmark_details = bookmark.to_dict(include_hobby=True)

    # Return response jsonified
    return jsonify(bookmark_details)

# #! Update Route
# # Logged in User should be able to update the bookmark that they've created
# @bookmark_routes.route('/bookmarks/<int:bookmarkId>', methods = ['PUT'])
# @login_required
# def update_bookmark(bookmarkId):
#     # Query for bookmark and check if it belongs to user
#     bookmark = Bookmark.query.filter_by(id=bookmarkId, user_id=current_user.id).first()

#     # Edge case for if bookmark cannot be found
#     if not bookmark:
#         abort(404, description="Bookmark not found or access denied")

#     # Toggling bookmark: If it's already bookmarked, unbookmark it by deleting
#     if bookmark:
#         db.session.delete(bookmark)
#         db.session.commit()
#         return jsonify({'message': 'Bookmark removed successfully'}), 200
#     else:
#         new_bookmark = Bookmark(user_id=current_user.id, hobby_id=bookmarkId)
#         db.session.add(new_bookmark)
#         db.session.commit()
#         return jsonify({'message': 'Bookmark added successfully'}), 200

# Don't really need an update route since Creating and Deleting bookmarks is technically 
# toggling on and off.

#! Delete Route
@bookmark_routes.route('/bookmarks/<int:bookmarkId>', methods=["DELETE"])
@login_required
def delete_bookmark(bookmarkId):
    # Query to get the bookmark
    user_bookmark = Bookmark.query.filter_by(id=bookmarkId, user_id=current_user.id).first()

    if user_bookmark:
        db.session.delete(user_bookmark)
        db.session.commit()

        return jsonify({"message": "Bookmark Deleted"}), 200
    
    abort(404, description="Bookmark not found")
