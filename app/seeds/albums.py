from app.models import db, environment, SCHEMA
from app.models.album import Album
from sqlalchemy.sql import text


def seed_albums():
    album1 = Album(author_id = 2, genre_id = 2, name= 'Ghost of Tsushima: Soundtrack', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')
    album2 = Album(author_id = 4, genre_id = 2, name= 'The Elder Scrolls V: Skyrim: Soundtrack', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118305986151718963/ab67616d0000b273ccc3b356646cd2d89d880a0a.png')
    album3 = Album(author_id = 5, genre_id =2 , name= 'Dark Souls 2: Soundtrack', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129129561603444897/ab67616d0000b2738bb3df2a818f15c7b1309127.png')
    album4 = Album(author_id = 5, genre_id = 2, name= 'Dark Souls: Soundtrack', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129129455521112265/ab67616d0000b273a9b9a9b870c117c9cfbb0f65.png')
    album5 = Album(author_id = 6, genre_id = 5, name= 'Doom: Soundtrack', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129129856072958123/ab67616d0000b273aad36b64a1a78951b504bc4e.png')
    album6 = Album(author_id = 8, genre_id = 4, name= 'Lo-Fi Toons', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129196638494269511/Lofitoonsart_320x.png')
    album7 = Album(author_id = 12, genre_id = 4, name= 'Lo-Fi Girl Vol 1', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129532637602648194/lofi-girl-lofi.gif')
    album8 = Album(author_id = 12, genre_id = 4, name= 'Lo-Fi Girl Vol 2', album_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129532909674565753/ab67616d0000b273ce6b0ef740f787932572ee5f.png')
    
    # album6 = Album(author_id = , genre_id = , name= '', album_cover_photo='')

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    db.session.commit()



# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()