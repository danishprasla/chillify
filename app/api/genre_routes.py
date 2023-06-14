from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.genre import Genre

genre_routes = Blueprint("genre", __name__)

@genre_routes.route('')
def get_all_genre():
    """Route to get all the genre for the home page"""
    all_genres = Genre.query.all()
    res = [genre.to_dict() for genre in all_genres]
    return {"genres": res}

@genre_routes.route('/')
