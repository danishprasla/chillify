from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.models.db import db
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.playlist import Playlist
from app.models.song import Song
from app.forms.playlist_form import PlaylistForm

playlist_routes = Blueprint("playlist", __name__)

@playlist_routes.route('')
def get_all_playlist():
    """Route to get all the playlist for the home page"""
    all_playlists = Playlist.query.all()
    # print('all playlists ---->', all_playlists[0].to_dict())
    res = [playlist.to_dict() for playlist in all_playlists]
    return {"playlists": res}
    # return {'test':'test'}

@playlist_routes.route('/new', methods = ['POST'])
@login_required
def post_playlist():
    """Route to post a playlist"""
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        picture = form.data['playlist_cover_url']
        picture.filename = get_unique_filename(picture.filename)
        uploaded_picture = upload_file_to_s3(picture)
        aws_link = uploaded_picture['url']

        user_id = current_user.id

        new_playlist = Playlist(
            user_id = int(user_id),
            name = form.data["name"],
            playlist_cover_url = aws_link,
            public = form.data["public"]
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    