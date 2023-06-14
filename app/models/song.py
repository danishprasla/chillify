from app.models.db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.user_likes import likes
from datetime import date
from app.models.playlist_songs import playlist_songs



class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), default=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), nullable=False)
    song_name = db.Column(db.String(200), nullable = False)
    song_url = db.Column(db.String(1000), nullable = False)
    song_cover_photo = db.Column(db.String(1000), nullable = False)
    release_date = db.Column(db.Date,nullable=False, default=date.today)
    upload_date = db.Column(db.Date, nullable=False, default=date.today)

    ## Need to define relationships here
    user = db.relationship("User", back_populates= 'song') ##table made

    album = db.relationship("Album", back_populates='songs')

    song_genre = db.relationship("Genre", back_populates='genre_songs')

    ##join tables:
    liked_by_users = db.relationship('User', secondary=likes, back_populates='liked_songs')

    added_to_playlists = db.relationship('Playlist', secondary=playlist_songs, back_populates='playlist_songs')

    def to_dict(self):
        liked_count = len(self.liked_by_users)
        return {
            'id': self.id,
            'authorId': self.user,
            'likes': liked_count,
            'genre': self.genre_id,
            'albumId': self.album_id,
            'songName': self.song_name,
            'songUrl': self.song_url,
            'coverPicture': self.song_cover_photo,
            'releaseDate': self.release_date,
            'uploadDate': self.upload_date
        }
