from app.models import db, environment, SCHEMA
from app.models.user import User
from app.models.song import Song
from sqlalchemy.sql import text


def seed_user_likes():
    
    user1 = User.query.get(1)
    user2 = User.query.get(11)
    user3 = User.query.get(12)
    user4 = User.query.get(13)
    
    
    song1 = Song.query.get(1) 
    song2 = Song.query.get(2)
    song3 = Song.query.get(3)
    song4 = Song.query.get(4)
    song5 = Song.query.get(5)
    song6 = Song.query.get(6)
    song7 = Song.query.get(7)
    song8 = Song.query.get(8)
    song9 = Song.query.get(9)
    song10 = Song.query.get(10)
    song11 = Song.query.get(11)
    song12 = Song.query.get(12)
    song13 = Song.query.get(13)
    song14 = Song.query.get(14)
    song15 = Song.query.get(15)
    song16 = Song.query.get(16)
    song17 = Song.query.get(17)
    song18 = Song.query.get(18)
    song19 = Song.query.get(19)
    song20 = Song.query.get(20)
    song21 = Song.query.get(21)
    song22 = Song.query.get(22)
    song23 = Song.query.get(23)


    user1.liked_songs.append(song1)
    user1.liked_songs.append(song2)
    user1.liked_songs.append(song3)
    user1.liked_songs.append(song4)
    user1.liked_songs.append(song11)
    user1.liked_songs.append(song17)
    user1.liked_songs.append(song18)
    user1.liked_songs.append(song23)
    user1.liked_songs.append(song5)
    user1.liked_songs.append(song6)
    user1.liked_songs.append(song7)
    user1.liked_songs.append(song8)
    user1.liked_songs.append(song10)
    user1.liked_songs.append(song9)

    user2.liked_songs.append(song23)
    user2.liked_songs.append(song21)
    user2.liked_songs.append(song22)
    user2.liked_songs.append(song1)
    user2.liked_songs.append(song3)
    user2.liked_songs.append(song6)
    user2.liked_songs.append(song8)

    user3.liked_songs.append(song16)
    user3.liked_songs.append(song17)
    user3.liked_songs.append(song18)
    user3.liked_songs.append(song23)
    user3.liked_songs.append(song22)
    user3.liked_songs.append(song20)
    user3.liked_songs.append(song19)

    user4.liked_songs.append(song12)
    user4.liked_songs.append(song13)
    user4.liked_songs.append(song15)
    user4.liked_songs.append(song17)
    user4.liked_songs.append(song23)
    user4.liked_songs.append(song21)
    

    
    db.session.commit()



# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()