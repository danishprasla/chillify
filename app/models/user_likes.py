from app.models.db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)