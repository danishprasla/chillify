from flask_wtf import FlaskForm
from wtforms import StringField,DateField,FileField,IntegerField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired


class PlaylistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    playlist_cover_url = FileField('playlist_cover_url', validators=[FileRequired(), FileAllowed(['png', 'jpeg', 'jpg', 'gif'])])
    public = BooleanField('public')
    