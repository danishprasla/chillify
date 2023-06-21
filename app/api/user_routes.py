from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.models.song import Song
from app.models.db import db


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/liked-songs/<int:song_id>/add', methods = ['POST'])
@login_required
def add_liked_song (song_id):
    """Route to add a liked song for a user"""
    user_id = current_user.id
    curr_user = User.query.get(user_id)
    song = Song.query.get(song_id)
    curr_user.liked_songs.append(song)
    db.session.commit()
    return curr_user.to_dict()


@user_routes.route('/liked-songs/<int:song_id>/delete', methods = ['DELETE'])
@login_required
def remove_liked_song (song_id):
    """Route to remove a liked song for a user"""
    user_id = current_user.id
    curr_user = User.query.get(user_id)
    # print('CURR USER ~~~~~~~>', curr_user)
    song = Song.query.get(song_id)
    # print('CURR SONG ~~~~~~~~~~>', song)
    # print('TEST!!!!')
    curr_user.liked_songs.remove(song)
    db.session.commit()
    return curr_user.to_dict()

    
    
