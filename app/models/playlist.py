from app.models.db import db, environment, SCHEMA, add_prefix_for_prod

from app.models.playlist_songs import playlist_songs



class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    playlist_cover_url = db.Column(db.String(1000), nullable=False)
    public = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates= 'playlist')

    playlist_songs = db.relationship('Song', secondary=playlist_songs, back_populates='added_to_playlists')

    def to_dict(self):
        song_ids = []
        for song in playlist_songs:
            song_ids.append(song.id)
        return {
            'id': self.id,
            'user': self.user,
            'name': self.name,
            'coverImage': self.playlist_cover_url,
            'songs': song_ids
        }
