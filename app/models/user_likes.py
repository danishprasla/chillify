from .db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

# class Like(db.Model):
#     __tablename__ = 'likes'
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key = True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)

#     user_id_likes = db.relationship("User", back_populates = 'user_likes')
#     song_id_likes = db.relationship("Song", back_populates = 'song_likes')


#     def to_dict(self):
#         """What will be sent to the react call"""
#         return {
#             'id': self.id,
#             'userId': self.user_id,
#             'songId': self.song_id            
#         }

