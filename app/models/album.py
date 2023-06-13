from .db import db, environment, SCHEMA, add_prefix_for_prod




class Album(db.Model):
    """Model for albums"""
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    album_cover_photo = db.Column(db.String(1000), nullable = False)

    # Relationships
    album_genre = db.relationship("Genre", back_populates='genre_albums')
    user = db.relationship("User", back_populates= 'albums')
    songs = db.relationship("Song", back_populates='album')


