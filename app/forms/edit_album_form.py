from flask_wtf import FlaskForm
from wtforms import StringField,DateField,FileField,IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired


class EditAlbumForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    album_cover_photo = FileField('album_cover_photo', validators=[FileAllowed(['png', 'jpeg', 'jpg', 'gif'])])
    