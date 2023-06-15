from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.models.db import db
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.playlist import Playlist
from app.models.song import Song
from app.forms.playlist_form import PlaylistForm
from app.forms.playlist_edit_form import PlaylistEditForm

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
    
@playlist_routes.route('/<int:playlist_id>', methods =['DELETE'])
@login_required
def delete_playlist(playlist_id):
    playlist_to_delete = Playlist.query.get(playlist_id)
    playlist_dict = playlist_to_delete.to_dict()
    user_id = current_user.id
    if playlist_dict["user"] != user_id:
        return {"message": 'Forbidden: You are not the owner'}, 403
    elif playlist_to_delete is None:
        return {"message": "Playlist not found"}
    else:
        file_to_delete = remove_file_from_s3(playlist_to_delete.playlist_cover_url)
        if file_to_delete:
            db.session.delete(playlist_to_delete)
            db.session.commit()
            return {"success": "Playlist deleted"}
        
@playlist_routes.route('/<int:playlist_id>/edit', methods =['PUT'])
@login_required
def edit_playlist(playlist_id):
    """Route to edit a playlist"""
    playlist_to_edit = Playlist.query.get(playlist_id)
    form = PlaylistEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.id
    if playlist_to_edit.user_id != user_id:
        return {"message": 'Forbidden: You are not the owner'}, 403
    elif playlist_to_edit is None:
        return {"message": "Playlist not found"}
    elif form.validate_on_submit():
        aws_link = ''
        if form.data['playlist_cover_url']:
            old_aws_link_remove = remove_file_from_s3(playlist_to_edit.playlist_cover_url)

            picture = form.data['playlist_cover_url']
            picture.filename = get_unique_filename(picture.filename)
            uploaded_picture = upload_file_to_s3(picture)
            aws_link = uploaded_picture['url']

        playlist_to_edit.name = form.data['name']
        #Only overwritting the aws link if a new link has been populated
        if len(aws_link) > 0:
            playlist_to_edit.playlist_cover_url = aws_link

        playlist_to_edit.public = form.data["public"]
        db.session.commit()
        return playlist_to_edit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}





    