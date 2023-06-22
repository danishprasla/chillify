# Chillify - a Spotify inspired project
## Flask React Project

* This project is a soft-clone of Spotify featuring music I typically listen to while studying or working

## Technologies used:
   * Python
   * JavaScript
   * React
   * Redux
   * Flask
   * PostgreSQL
   * HTML
   * CSS
   * AWS

## Landing Page
![image](https://github.com/danishprasla/chillify/assets/116976633/761dd7c0-733b-45e5-b600-cb88a7d10d0b)

## Home Page
![image](https://github.com/danishprasla/chillify/assets/116976633/9aee97b3-4155-40a9-a38e-fff817590fca)

## Genre Page
![image](https://github.com/danishprasla/chillify/assets/116976633/d3390353-1dfa-4223-a6c2-41161429e87d)

## Playlist Page
![image](https://github.com/danishprasla/chillify/assets/116976633/b1f3fa3a-97f2-4bce-88e9-19a97d674eba)

## Liked Songs Page
![image](https://github.com/danishprasla/chillify/assets/116976633/14e514c8-ead0-4eec-95e2-b8a4e2e84ce5)



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
