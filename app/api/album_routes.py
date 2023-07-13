from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.genre import Genre
from app.models.album import Album
from app.models.song import Song

album_routes = Blueprint("album", __name__)

@album_routes.route('')
def get_all_albums():
    """Route to get all the albums"""
    all_albums = Album.query.all()
    res = [album.to_dict() for album in all_albums]
    return {"albums": res}