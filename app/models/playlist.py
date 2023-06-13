from .db import db, environment, SCHEMA, add_prefix_for_prod

from .playlist_songs import playlist_songs



class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    playlist_cover_url = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User", back_populates= 'playlist')

    playlist_songs = db.relationship('Song', secondary=playlist_songs, back_populates='added_to_playlists')
