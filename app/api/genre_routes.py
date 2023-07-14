from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.genre import Genre
from app.models.song import Song

genre_routes = Blueprint("genre", __name__)

@genre_routes.route('')
def get_all_genre():
    """Route to get all the genre for the home page"""
    all_genres = Genre.query.all()
    res = [genre.to_dict() for genre in all_genres]
    return {"genres": res}

@genre_routes.route('/<int:genre_id>/music')
def get_genre_music(genre_id):
    """Route to get music for a genre"""
    genre_music = Song.query.filter(Song.genre_id == genre_id).all()

    # print('genre music ------>',genre_music)
    # print('to dict method --->',genre_music[0].to_dict())

    if len(genre_music):
        res = [song.to_dict() for song in genre_music]
        return {"songs": res}
    return {"songs": "no songs"}


