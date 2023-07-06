# Chillify - a Spotify inspired project
<a href="https://chillify-dd7x.onrender.com">Chillify live link</a>
## Flask React Project

* This project is a soft-clone of Spotify featuring music I typically listen to while studying or working
## Index:
<a href="https://github.com/danishprasla/chillify/wiki/Basic-wireframes">Simple Wireframe</a> | <a href="https://github.com/danishprasla/chillify/wiki/Chillify-DB-Schema">Schema</a> | <a href="https://github.com/danishprasla/chillify/wiki/Features-List">Features List</a> | <a href="https://github.com/danishprasla/chillify/wiki/User-Stories">User Stories</a> 

## Technologies used:
<div>

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  
</div>

## Current Features:
   * Users can create new user credentials, use existing credentials, or login with a demo-user credentials
   * Users can view their own playlists, public playlists made by other users, and view genres.
   * Users can create a new playlist and add songs to the new playlist by clicking on the "three-menu-dots" on a song tile (present on a populated genre page or an existing playlist page).
   * Users can edit their playlist (name and cover picture) along with removing songs from their playlist.
   * Users can delete their playlist
   * Users can upload a song.
   * Users can edit the content of the song (song file and cover image)
   * Users can delete their published song(s)
   * Users can like/dislike a song which will appear on the liked list or be removed from their liked list
## Planned features:
   * Albums - a user can create an album and add THEIR published songs to an album. A user can view albums which will display songs associated with the album
   * Users can edit the album
   * Users can delete an album

## Landing Page
![image](https://cdn.discordapp.com/attachments/1118303754714886259/1121570328531972116/image.png)

## Home Page
![image](https://cdn.discordapp.com/attachments/1118303754714886259/1121571409471213639/image.png)

## Genre Page
![image](https://cdn.discordapp.com/attachments/1118303754714886259/1121571665655119984/image.png)

## Playlist Page
![image](https://cdn.discordapp.com/attachments/1118303754714886259/1121571575553073302/image.png)

## Liked Songs Page
![image](https://cdn.discordapp.com/attachments/1118303754714886259/1121572089799917658/image.png)



## To run this project locally
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Replace the value for `SCHEMA` with a unique name.

6. Get into your pipenv shell, migrate the database, seed the database, and run the Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Navigate into the react-app directory
8. Install npm packages
9. After the installation is complete run:
   ```bash
   npm start
   ```
