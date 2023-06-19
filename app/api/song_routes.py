from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename,upload_file_to_s3,remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.song import Song
from datetime import date
from app.forms.song_form import SongForm
from app.forms.song_edit_form import SongEditForm
from app.models.db import db
from app.api.auth_routes import validation_errors_to_error_messages

song_routes = Blueprint("songs", __name__)


@song_routes.route('')
def get_all_songs():
    """Route to get all songs"""
    all_songs = Song.query.all()
    res = [song.to_dict() for song in all_songs]
    return {"songs": res}

@song_routes.route('/new', methods = ['POST'])
@login_required
def post_song():
    """Route to post a song"""
    user_id = current_user.id
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        picture = form.data['song_cover_photo']
        picture.filename = get_unique_filename(picture.filename)
        uploaded_pic = upload_file_to_s3(picture)
        aws_pic_link = uploaded_pic['url']

        audio = form.data['song_url']
        audio.filename = get_unique_filename(audio.filename)
        uploaded_audio = upload_file_to_s3(audio)
        aws_audio_link = uploaded_audio['url']
        # print('GENRE ID ~~~~~~~~~~~~>', form.data["genre_id"])

        release_date_val = date.today

        if form.data["release_date"]:
          release_date_string = form.data["release_date"]
          [year, month, day] = release_date_string.split("-")
          release_date_val = date(int(year), int(month), int(day))

        new_song = Song(
            author_id=int(user_id),
            genre_id = int(form.data["genre_id"]),
            song_name = form.data["song_name"],
            release_date = release_date_val,
            song_url = aws_audio_link,
            song_cover_photo = aws_pic_link 
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    else:
        # print('FORM ERRORS ON CLASSICAL POST BUT WHY?!', form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@song_routes.route('/<int:song_id>', methods = ['DELETE'])
@login_required
def delete_song(song_id):
    """Route to delete a song - authorization req"""
    user_id = current_user.id

    song_to_delete = Song.query.get(song_id)
    if song_to_delete is None:
        return {"message": "Song not found"}, 404
    elif user_id != song_to_delete.user.id:
        return {"message": 'Forbidden: You are not the owner'}, 403
    else:
        audio_to_delete = remove_file_from_s3(song_to_delete.song_url)
        picture_to_delete = remove_file_from_s3(song_to_delete.song_cover_photo)
        if audio_to_delete and picture_to_delete:
            db.session.delete(song_to_delete)
            db.session.commit()
            return {"success": "Song deleted"}

@song_routes.route('/<int:song_id>/edit', methods = ['PUT'])
@login_required
def update_song(song_id):
    """Route to update a song based off song ID"""
    user_id = current_user.id
    form = SongEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    song_to_update = Song.query.get(song_id)
    if song_to_update is None:
        return {"message": "Song not found"}, 404
    elif user_id != song_to_update.user.id:
        return {"message": 'Forbidden: You are not the owner'}, 403
    elif form.validate_on_submit():
        ## do form stuff here
        aws_song_link = ''
        aws_song_photo = ''
        if form.data['song_url']:
            old_aws_link_song = remove_file_from_s3(song_to_update.song_url)
            song = form.data['song_url']
            song.filename = get_unique_filename(song.filename)
            uploaded_song = upload_file_to_s3(song)
            aws_song_link = uploaded_song['url']

        if form.data['song_cover_photo']:
            old_aws_link_photo = remove_file_from_s3(song_to_update.song_cover_photo)
            picture = form.data['song_cover_photo']
            picture.filename = get_unique_filename(picture.filename)
            uploaded_picture = upload_file_to_s3(picture)
            aws_song_photo = uploaded_picture['url']

        release_date_string = form.data["release_date"]
        [year, month, day] = release_date_string.split("-")
        release_date_val = date(int(year), int(month), int(day))

        song_to_update.song_name = form.data["song_name"]
        song_to_update.genre_id = form.data["genre_id"]
        song_to_update.release_date = release_date_val
        
        if len(aws_song_link) > 0:
            song_to_update.song_url = aws_song_link
        if len(aws_song_photo) > 0:
            song_to_update.song_cover_photo = aws_song_photo
        db.session.commit()
        return song_to_update.to_dict()
    else:
        return {
            'errors': validation_errors_to_error_messages(form.errors)
        }
        

            