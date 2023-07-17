from flask_wtf import FlaskForm
from wtforms import StringField,DateField,FileField,IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired


class SongEditForm(FlaskForm):
    song_name = StringField('song_name', validators=[DataRequired()])
    song_cover_photo = FileField('song_cover_photo', validators=[FileAllowed(['png', 'jpeg', 'jpg', 'gif'])])
    release_date = StringField('release_date')
    album_id = IntegerField('album_id')
    song_url = FileField('song_url', validators=[ FileAllowed(['mp3', 'wav'])])
    genre_id = IntegerField('genre_id', validators=[DataRequired()])
    