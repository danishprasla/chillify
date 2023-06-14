from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    user2 = User(
        username='Shigeru Umbeyashi', email='got@aa.io', password='password')
    user3 = User(
        username='Ilan Eshkeri', email='got2@aa.io', password='password')
    user4 = User(
        username='Bethesda', email='skyrim@aa.io', password='password')
    user5 = User(
        username='Motoi Sakuraba', email='darksouls@aa.io', password='password')
    user6 = User(
        username='Mick Gordon', email='doom@aa.io', password='password')
    
    user7 = User(
        username='Cadred', email='aot@aa.io', password='password')
    
    user8 = User(
        username='L.Dre', email='avatar@aa.io', password='password')
    
    user9 = User(
        username='Kijugo', email='kijugo@aa.io', password='password')
    
    user10 = User(
        username='Kurochuu', email='kurochuu@aa.io', password='password')
    demo2 = User(
        username='Levi Ackerman', email='demo2@aa.io', password='password')
    demo3 = User(
        username='Danish', email='demo3@aa.io', password='password')
    demo4 = User(
        username='Demo-lition', email='demo4@aa.io', password='password')

    
    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()