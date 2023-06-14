from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.user_likes import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    song = db.relationship("Song", back_populates= 'user')

    playlist = db.relationship("Playlist", back_populates= 'user')

    ## Join table relationship
    liked_songs = db.relationship('Song', secondary=likes, back_populates='liked_by_users')

    albums = db.relationship('Album', back_populates='user')


   

    def to_dict(self):
        song_ids = []
        for song in self.liked_songs:
            song_ids.append(song.id) 
        album_ids = []
        for album in self.albums:
            album_ids.append(album.id)
        playlist_ids = []
        for playlist in self.playlist:
            playlist_ids.append(playlist.id)
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'likedSongsIds': song_ids,
            'albumIds': album_ids,
            'playlistIds': playlist_ids
        }
