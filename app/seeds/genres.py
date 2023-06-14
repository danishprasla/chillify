from app.models import db, environment, SCHEMA
from app.models.genre import Genre
from sqlalchemy.sql import text


def seed_genres():
    genre1 = Genre(genre_name='Classical',genre_photo='https://cdn.discordapp.com/attachments/1117955975144538132/1118278918705778850/History-of-CF-feature-image.png')
    genre2 = Genre(genre_name='Video Game Soundtrack',genre_photo='https://cdn.discordapp.com/attachments/1117955975144538132/1118279124306366505/06d8a7c076df3b090cf777525e61e9a65174f410-scaled.png')
    genre3 = Genre(genre_name='Lo-fi',genre_photo='https://cdn.discordapp.com/attachments/1117955975144538132/1118280366713733251/tumblr_p7b18oVqP01ravz9xo1_1280.png')
    genre4 = Genre(genre_name='Anime Lo-fi',genre_photo='https://cdn.discordapp.com/attachments/1117955975144538132/1118280542694166609/artworks-5IxtRzZy1ikZZb02-oSHt6A-t500x500.png')
    genre5 = Genre(genre_name='DOOM?!',genre_photo='https://cdn.discordapp.com/attachments/1117955975144538132/1118278529344348200/DE_The_DOOM_Slayer_MOBILE_633x424.png')

    db.session.add(genre1)
    db.session.add(genre2)
    db.session.add(genre3)
    db.session.add(genre4)
    db.session.add(genre5)
    db.session.commit()



# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM genres"))
        
    db.session.commit()