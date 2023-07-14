from app.models import db, environment, SCHEMA
from app.models.song import Song
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(author_id= 2, genre_id= 2, album_id= 1, song_name ='Tsushima Suite: I. Seion',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+I.+Seion.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')
    
    song2 = Song(author_id= 2, genre_id= 2, album_id= 1, song_name ='Tsushima Suite: II. Shurai',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+II.+Shurai.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song3 = Song(author_id= 2, genre_id= 2, album_id= 1, song_name ='Tsushima Suite: III. Bushido',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+III.+Bushido.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song4 = Song(author_id= 2, genre_id= 2, album_id= 1, song_name ='Tsushima Suite: IV. Kodoku',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+IV.+Kodoku.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song5 = Song(author_id= 2, genre_id= 2, album_id= 1, song_name ='Tsushima Suite: V. Seiiki',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Tsushima+Suite_+V.+Seiiki.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song6 = Song(author_id= 3, genre_id= 2, album_id= 1, song_name ='Jin Sakai',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Jin+Sakai.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118303964887265420/Ghost_of_Tsushima.png')

    song6 = Song(author_id= 4, genre_id= 2, album_id= 2,song_name ='From Past to Present',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/TES+V+Skyrim+Soundtrack+-+From+Past+to+Present.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118305986151718963/ab67616d0000b273ccc3b356646cd2d89d880a0a.png')

    song7 = Song(author_id= 4, genre_id= 2, album_id= 2,song_name ='Secunda',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Secunda.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118305986151718963/ab67616d0000b273ccc3b356646cd2d89d880a0a.png')

    song8 = Song(author_id= 5, genre_id= 2, album_id= 3, song_name ='Majula',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Dark+Souls+2+OST+-+Majula+%5BHQ%5D+(Remastered).mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118307540825026620/oSOVmvoekCf9ASaAItqfKvpP.png')

    song9 = Song(author_id= 5, genre_id= 2, album_id= 4, song_name ='Sorrow',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Sorrow.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118308061069717554/ab67616d0000b273a9b9a9b870c117c9cfbb0f65.png')

    song10 = Song(author_id= 5, genre_id= 2, album_id= 3, song_name ='Fire Keepers',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Dark+Souls+2+OST+-+Fire+Keepers+%5BHQ%5D.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118307540825026620/oSOVmvoekCf9ASaAItqfKvpP.png')

    song11 = Song(author_id= 5, genre_id= 2, album_id= 4, song_name ='Gwyn, Lord of Cinder',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/video-game-soundtracks/Gwyn%2C+Lord+of+Cinder+-+Dark+Souls+Soundtrack.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118308738374311956/latest.png')

    #-------------------Video Game ST ^^--------
    song12 = Song(author_id= 6, genre_id= 5, album_id= 5, song_name ='Gladiator',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/DOOM+Eternal+OST+++Gladiator.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song13 = Song(author_id= 6, genre_id= 5, album_id= 5, song_name ='Rip & Tear',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+02.+Rip+%26+Tear.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song14 = Song(author_id= 6, genre_id= 5, album_id= 5, song_name ='Flesh & Metal',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+08.+Flesh+%26+Metal.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')

    song15 = Song(author_id= 6, genre_id= 5, album_id= 5, song_name ='BFG Division',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/doom/Mick+Gordon+-+11.+BFG+Division.mp3',song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118311329061675090/ab67616d0000b273aad36b64a1a78951b504bc4e.png')


    #-----------^^DOOM^^-----------------------------
    song16 = Song(author_id= 7, genre_id= 4, song_name ='Ashes on the Fire Lo-fi',song_url='https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Ashes+on+The+Fire+lofi+(attack+on+titan+season+4).mp3',song_cover_photo='https://media.discordapp.net/attachments/1118303754714886259/1118313433218154636/1200x1200bf-60.png?width=1146&height=1146')

    song17 = Song(author_id= 8, genre_id= 4, album_id= 6, song_name ='Dear Katara',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Dear+Katara+(Avatar's+Love+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318294571687987/artworks-SL47hFs8T2QwQLNw-xzpX4w-t500x500.png')

    song18 = Song(author_id= 8, genre_id= 4, album_id= 6, song_name ='For Lu Ten',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/for+lu+ten+(Leaves+from+the+vine+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318038257782866/artworks-ZyuBAxt2BewFZiR7-Qt1Wuw-t500x500.png')

    song19 = Song(author_id= 8, genre_id= 4,album_id= 6, song_name ='Korra',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Korra+(The+Legend+of+Korra+ending+theme+but+it's+lofi+hip+hop).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318574302412840/artworks-O39Setsds9yiqjAw-6UtMHw-t500x500.png')

    song20 = Song(author_id= 9, genre_id= 4, song_name ='My War Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/my+war+(Attack+on+Titan+but+is+it+okay+if+it's+lofi_).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118318965047951400/ab67616d0000b273c8f580e990ebfd45594ed696.png')

    song21 = Song(author_id= 9, genre_id= 4, song_name ='Samidare Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/samidare+(Naruto+but+is+it+okay+if+it's+lofi+hiphop_).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118320143139868702/maxresdefault.png')

    song22 = Song(author_id= 10, genre_id= 4, song_name ='Sadness and Sorrow Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/sadness+%26+sorrow%2C+but+its+lofi+(Naruto).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118320506265935882/500x500.png')

    song23 = Song(author_id= 10, genre_id= 4, song_name ='Avatar State Lo-fi',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/The+Avatar+State+Theme++Lofi+Remix++Avatar+the+Last+Airbender++ft.+Sea+Flap+Flap.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118321143754006648/artworks-pwJyAsOfJwPeE2Wy-izGzug-t500x500.png')

    song23 = Song(author_id= 10, genre_id= 4, song_name ="Guren's Theme Lo-fi",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/Guren's+Theme++Naruto_+Shippuden+sad+lofi+ver..mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1118321403675037746/artworks-PvzrkHS2iiQJz8s0-pll3iQ-t500x500.png')

    #-----^ anime lo-fi--- need to add classical and lo-fi next
    ## ---- down is lDre folder
    song24 = Song(author_id= 8, genre_id= 3, album_id= 6, song_name ='Gravity Falls',song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/ldre/Gravity+Falls.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129205203468566628/1200x1200bf-60.png')
    
    song25 = Song(author_id= 8, genre_id= 3, album_id= 6, song_name ="Gymnopedies but it's lofi",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/ldre/Gymnopedies+but+it's+lofi+(visualizer).mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129205613222690937/ab67616d0000b273a8ce44e1d712a80005e68040.png')

    song26 = Song(author_id= 8, genre_id= 3, album_id= 6, song_name ="Steven Universe",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/ldre/Steven+Universe.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129205948163047484/a2504890485_10.png')

    song27 = Song(author_id= 8, genre_id= 4, album_id= 6, song_name ="Totoro",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/ldre/totoro.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129206257719443466/ab67616d0000b27323fddaa6f83cd7b38585af3d.png')

    song28 = Song(author_id= 8, genre_id= 4, album_id= 6, song_name ="Levi's Choice",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/ldre/levi's+choice+-+'ThanksAT'+from+Attack+On+Titan+but+it's+lofi+hip+hop.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129206854627631195/maxresdefault.png')

    #-----

    song29 = Song(author_id= 11, genre_id= 3, song_name ="One Day in Japan",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/aekasora+-+one+day+in+japan.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129523487283888168/artworks-000211644143-6j9cw7-t500x500.png')

    song30 = Song(author_id= 12, genre_id= 3, album_id= 7, song_name ="BVG x møndberg x Spencer Hunt – Sunday Morning",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/BVG+x+m%C3%B8ndberg+x+Spencer+Hunt++Sunday+Morning.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129524747076653097/artworks-keScuGKOFyb3egT0-MmnEWw-t500x500.png')

    song31 = Song(author_id= 12, genre_id= 3, album_id= 7, song_name ="Dontcry x Nokiaa - Mind Pool",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Dontcry+x+Nokiaa++Mind+Pool.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129525133632090275/a0363976365_10.png')

    song32 = Song(author_id= 13, genre_id= 3, song_name ="F1 Lofi to Study/Get Pole Position",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/F1+-+Lofi+Beats+to+study-get+pole+position+to.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129525812337573918/ab67616d0000b273c9e2e14cb10d0335c120ad21.png')

    song43 = Song(author_id= 14, genre_id= 3, song_name ="Lilac",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Kainbeats++Lilac.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129526569048739850/a3682428746_10.png')

    song33 = Song(author_id= 15, genre_id= 3, song_name ="Teahouse Spirits",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/kalaido+-+teahouse+spirits.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129527856309993552/a3079493809_10.png')

    song34 = Song(author_id= 14, genre_id= 3, song_name ="A Walk Through the Sky",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Kainbeats+-+A+Walk+Through+the+Sky.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129527175062749346/a0206655689_10.png')

    song35 = Song(author_id= 12, genre_id= 3, album_id= 7, song_name ="Kanisan x Wishes and Dreams - morning moon",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Kanisan+x+Wishes+and+Dreams+-+morning+moon.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129528234707533865/ab67616d0000b27399e2e3caa437f55884b67a12.png')

    song36 = Song(author_id= 16, genre_id= 3, song_name ="First Snow",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Kerusu+-+First+Snow.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129528768592089108/ab67616d0000b2736490d2ab481addde21bad69c.png')

    song37 = Song(author_id= 12, genre_id= 3, album_id= 8, song_name ="Kupla – Lavender",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Lavender.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129529215314825286/a1484820853_10.png')

    song38 = Song(author_id= 12, genre_id= 3, album_id= 8, song_name ="Phlocalyst x Living Room x Akīn – Old Friend",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Phlocalyst+x+Living+Room+x+Aki%CC%84n++Old+Friend.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129529666051518484/a2496345864_5.png')

    song39 = Song(author_id= 17, genre_id= 3, song_name ="Eternal Youth",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/RUDE+-+Eternal+Youth.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129530192713494588/ab67616d0000b273097f3d06dd8726a91f526e21.png')

    song40 = Song(author_id= 12, genre_id= 3, album_id= 8, song_name ="Rudy Raw x Sátyr x Phlocalyst Liquid Spots",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Rudy+Raw+x+Sa%CC%81tyr+x+Phlocalyst++Liquid+Spots.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129530374750482613/a2480970107_5.png')

    song41 = Song(author_id= 18, genre_id= 3, song_name ="Shangri-La",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/Shangri-La.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129531581455929495/ab67616d0000b273a6e743f1d2d6289666403701.png')

    song42 = Song(author_id= 19, genre_id= 3, song_name ="Sunday Vibes",song_url="https://chillify-capstone.s3.us-east-2.amazonaws.com/lo-fi/wu%CC%88nsche+-+sunday+vibes.mp3",song_cover_photo='https://cdn.discordapp.com/attachments/1118303754714886259/1129532136169406564/ab67616d0000b273c9849b4b776162478040ddf7.png')

    



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
    db.session.add(song24)
    db.session.add(song25)
    db.session.add(song26)
    db.session.add(song27)
    db.session.add(song28)
    db.session.add(song29)
    db.session.add(song30)
    db.session.add(song31)
    db.session.add(song32)
    db.session.add(song33)
    db.session.add(song34)
    db.session.add(song35)
    db.session.add(song36)
    db.session.add(song37)
    db.session.add(song38)
    db.session.add(song39)
    db.session.add(song40)
    db.session.add(song41)
    db.session.add(song42)
    db.session.add(song43)
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