from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.genre import Genre
from app.models.album import Album
from app.models.db import db
from app.forms.album_form import AlbumForm

album_routes = Blueprint("album", __name__)

@album_routes.route('')
def get_all_albums():
    """Route to get all the albums"""
    all_albums = Album.query.all()
    res = [album.to_dict() for album in all_albums]
    return {"albums": res}

@album_routes.route('/new', methods=['POST'])
@login_required
def post_album():
    """Route to create an album"""
    user_id = current_user.id
    form = AlbumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        picture = form.data['album_cover_photo']
        picture.filename = get_unique_filename(picture.filename)
        uploaded_pic = upload_file_to_s3(picture)
        aws_pic_link = uploaded_pic['url']

        new_album = Album(
            author_id = int(user_id),
            # genre_id = int(form.data["genre_id"]),
            genre_id = 1,
            name = form.data["name"],
            album_cover_photo = aws_pic_link
        )

        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@album_routes.route('/<int:album_id>', methods = ['DELETE'])
def delete_album(album_id):
    """Route to delete an album"""

    user_id = current_user.id

    album_to_delete = Album.query.get(album_id)
    if album_to_delete is None:
        return {"message": "Album not found"}, 404
    elif user_id != album_to_delete.user.id:
        return {"message": 'Forbidden: You are not the owner'}, 403
    else:
        picture_to_delete = remove_file_from_s3(album_to_delete.album_cover_photo)
        if picture_to_delete:
            db.session.delete(album_to_delete)
            db.session.commit()
            return {"success": "Album deleted"}

