from .db import db, environment, SCHEMA




class Genre(db.Model):
    """Model for genres"""
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    genre_name = db.Column(db.String(240))

    genre_songs = db.relationship("Song", back_populates='song_genre')
    genre_album = db.relationship("Album", back_populates='album_genre')


    

    def to_dict(self):
        album_ids = []
        for album in self.genre_album:
            album_ids.append(album.id)
        song_ids = []
        for song in self.genre_songs:
            song_ids.append(song.id)
        return {
            'id': self.id,
            'name': self.genre_name,
            'albumIds': album_ids,
            'songIds': song_ids
        }