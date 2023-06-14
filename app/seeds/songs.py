from app.models import db, environment, SCHEMA
from app.models.song import Song
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(author_id= 2,album_id = False, genre_id= 2, song_name ='Tsushima Suite: I. Seion',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+I.+Seion.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')
    
    song2 = Song(author_id= 2,album_id = False, genre_id= 2, song_name ='Tsushima Suite: II. Shurai',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+II.+Shurai.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song3 = Song(author_id= 2,album_id = False, genre_id= 2, song_name ='Tsushima Suite: III. Bushido',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+III.+Bushido.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song4 = Song(author_id= 2,album_id = False, genre_id= 2, song_name ='Tsushima Suite: IV. Kodoku',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+IV.+Kodoku.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song5 = Song(author_id= 2,album_id = False, genre_id= 2, song_name ='Tsushima Suite: V. Seiiki',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+V.+Seiiki.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song6 = Song(author_id= 3,album_id = False, genre_id= 2, song_name ='Jin Sakai',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Jin+Sakai.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song6 = Song(author_id= 4,album_id = False, genre_id= 2, song_name ='From Past to Present',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/TES+V+Skyrim+Soundtrack+-+From+Past+to+Present.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118305986151718963/ab67616d0000b273ccc3b356646cd2d89d880a0a.png')

    song7 = Song(author_id= 4,album_id = False, genre_id= 2, song_name ='Secunda',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Secunda.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118305986151718963/ab67616d0000b273ccc3b356646cd2d89d880a0a.png')
    song8 = Song(author_id= 5,album_id = False, genre_id= 2, song_name ='Majula',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Dark+Souls+2+OST+-+Majula+%5BHQ%5D+(Remastered).mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118307540825026620/oSOVmvoekCf9ASaAItqfKvpP.png')

    song9 = Song(author_id= 5,album_id = False, genre_id= 2, song_name ='Sorrow',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Sorrow.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118308061069717554/ab67616d0000b273a9b9a9b870c117c9cfbb0f65.png')

    song10 = Song(author_id= 5,album_id = False, genre_id= 2, song_name ='Fire Keepers',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Dark+Souls+2+OST+-+Fire+Keepers+%5BHQ%5D.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118307540825026620/oSOVmvoekCf9ASaAItqfKvpP.png')

    song11 = Song(author_id= 5,album_id = False, genre_id= 2, song_name ='Gwyn, Lord of Cinder',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Gwyn%2C+Lord+of+Cinder+-+Dark+Souls+Soundtrack.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118308738374311956/latest.png')

    #-------------------Video Game ST ^^--------
    song12 = Song(author_id= 6,album_id = False, genre_id= 5, song_name ='Gladiator',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/DOOM+Eternal+OST+++Gladiator.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song13 = Song(author_id= 6,album_id = False, genre_id= 5, song_name ='Rip & Tear',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+02.+Rip+%26+Tear.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song14 = Song(author_id= 6,album_id = False, genre_id= 5, song_name ='Flesh & Metal',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+08.+Flesh+%26+Metal.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song15 = Song(author_id= 6,album_id = False, genre_id= 5, song_name ='BFG Division',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+11.+BFG+Division.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')


    #-----------^^DOOM^^-----------------------------
    song16 = Song(author_id= 7,album_id = False, genre_id= 4, song_name ='Ashes on the Fire Lo-fi',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Ashes+on+The+Fire+lofi+(attack+on+titan+season+4).mp3',song_cover_photo='https://media.discordapp.net/attachments/1118303754714886259/1118313433218154636/1200x1200bf-60.png?width=1146&height=1146')

    song17 = Song(author_id= 8,album_id = False, genre_id= 4, song_name ='Dear Katara',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Dear+Katara+(Avatar's+Love+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318294571687987/artworks-SL47hFs8T2QwQLNw-xzpX4w-t500x500.png')

    song18 = Song(author_id= 8,album_id = False, genre_id= 4, song_name ='For Lu Ten',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/for+lu+ten+(Leaves+from+the+vine+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318038257782866/artworks-ZyuBAxt2BewFZiR7-Qt1Wuw-t500x500.png')

    song19 = Song(author_id= 8,album_id = False, genre_id= 4, song_name ='Korra',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Korra+(The+Legend+of+Korra+ending+theme+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318574302412840/artworks-O39Setsds9yiqjAw-6UtMHw-t500x500.png')

    song20 = Song(author_id= 9,album_id = False, genre_id= 4, song_name ='My War Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/my+war+(Attack+on+Titan+but+is+it+okay+if+it's+lofi_).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318965047951400/ab67616d0000b273c8f580e990ebfd45594ed696.png')

    song21 = Song(author_id= 9,album_id = False, genre_id= 4, song_name ='Samidare Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/samidare+(Naruto+but+is+it+okay+if+it's+lofi+hiphop_).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118320143139868702/maxresdefault.png')

    song22 = Song(author_id= 10,album_id = False, genre_id= 4, song_name ='Sadness and Sorrow Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/sadness+%26+sorrow%2C+but+its+lofi+(Naruto).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118320506265935882/500x500.png')

    song23 = Song(author_id= 10,album_id = False, genre_id= 4, song_name ='Avatar State Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/The+Avatar+State+Theme++Lofi+Remix++Avatar+the+Last+Airbender++ft.+Sea+Flap+Flap.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118321143754006648/artworks-pwJyAsOfJwPeE2Wy-izGzug-t500x500.png')

    song23 = Song(author_id= 10,album_id = False, genre_id= 4, song_name ="Guren's Theme Lo-fi",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Guren's+Theme++Naruto_+Shippuden+sad+lofi+ver..mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118321403675037746/artworks-PvzrkHS2iiQJz8s0-pll3iQ-t500x500.png')

    #-----^ anime lo-fi--- need to add classical and lo-fi next


    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)
    db.session.add(song22)
    db.session.add(song23)
    db.session.commit()


# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()