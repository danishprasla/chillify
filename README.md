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

## Home Page

## Genre Page

## Liked Songs Page


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