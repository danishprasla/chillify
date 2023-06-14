from app.models import db, environment, SCHEMA
from app.models.playlist_songs import playlist_songs
from app.models.playlist import Playlist
from app.models.song import Song
from sqlalchemy.sql import text


def seed_playlist_songs():
    playlist1 = Playlist.query.get(1)  
    playlist2 = Playlist.query.get(2)
    playlist3 = Playlist.query.get(3)
    playlist4 = Playlist.query.get(4)
    playlist5 = Playlist.query.get(5)     
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


    playlist1.playlist_songs.append(song1)
    playlist1.playlist_songs.append(song2)
    playlist1.playlist_songs.append(song3)
    playlist1.playlist_songs.append(song4)
    playlist1.playlist_songs.append(song11)
    playlist1.playlist_songs.append(song17)
    playlist1.playlist_songs.append(song18)
    playlist1.playlist_songs.append(song23)

    
    playlist2.playlist_songs.append(song4)
    playlist2.playlist_songs.append(song2)
    playlist2.playlist_songs.append(song1)
    playlist2.playlist_songs.append(song3)
    playlist2.playlist_songs.append(song5)
    playlist2.playlist_songs.append(song6)
    playlist2.playlist_songs.append(song7)
    playlist2.playlist_songs.append(song8)
    playlist2.playlist_songs.append(song11)
    playlist2.playlist_songs.append(song17)
    playlist2.playlist_songs.append(song18)
    playlist2.playlist_songs.append(song23)
    playlist2.playlist_songs.append(song10)
    playlist2.playlist_songs.append(song9)

    playlist4.playlist_songs.append(song23)
    playlist4.playlist_songs.append(song21)
    playlist4.playlist_songs.append(song22)
    playlist4.playlist_songs.append(song1)
    playlist4.playlist_songs.append(song3)
    playlist4.playlist_songs.append(song6)
    playlist4.playlist_songs.append(song8)

    playlist3.playlist_songs.append(song16)
    playlist3.playlist_songs.append(song17)
    playlist3.playlist_songs.append(song18)
    playlist3.playlist_songs.append(song23)
    playlist3.playlist_songs.append(song22)
    playlist3.playlist_songs.append(song20)
    playlist3.playlist_songs.append(song19)

    playlist5.playlist_songs.append(song12)
    playlist5.playlist_songs.append(song13)
    playlist5.playlist_songs.append(song15)
    playlist5.playlist_songs.append(song17)
    playlist5.playlist_songs.append(song23)
    playlist5.playlist_songs.append(song21)


    
    db.session.commit()



# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))
        
    db.session.commit()