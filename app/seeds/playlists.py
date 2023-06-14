from app.models import db, environment, SCHEMA
from app.models.playlist import Playlist
from sqlalchemy.sql import text


def seed_playlists():
    playlist1 = Playlist(user_id=1,name='private playlist',playlist_cover_url='https://cdn.discordapp.com/attachments/1118303754714886259/1118560382240423967/ab67616d0000b2736c9ee4b7493d21581653ef88.png', public=False)
    playlist2 = Playlist(user_id=1,name='Study/work playlist',playlist_cover_url='https://cdn.discordapp.com/attachments/1118303754714886259/1118559199094386718/animated-studying-lo-fi-background-late-night-homework-2d-cartoon-character-animation-with-nighttime-cozy-bedroom-interior-on-background-4k-footage-with-alpha-channel-for-lofi-music-aesthetic-video.png', public=True)
    playlist3 = Playlist(user_id=11,name='Anime Lo-fi',playlist_cover_url='https://cdn.discordapp.com/attachments/1118303754714886259/1118560064198942720/21BmXsqKBeL.png', public=True)
    playlist4 = Playlist(user_id=12,name='Its a playlist',playlist_cover_url='https://cdn.discordapp.com/attachments/1118303754714886259/1118559596429185064/a2104542160_65.png', public=True)
    playlist5 = Playlist(user_id=13,name='Driving playlist - mix',playlist_cover_url='https://cdn.discordapp.com/attachments/1118303754714886259/1118558981254819980/a2138188889_65.png', public=True)

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.commit()



# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()