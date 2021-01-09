# GUIDE

### Versioning
* Parse Server 2.7.4
* Parse Dashboard 2.1.0
* Angular 10
* Bootstrap 4

### MongoDB
* Either install MongoDB locally or use MongoDB Atlas.
* For the purpose of this test, a cluster on MongoDB Atlas is being used.
* Create a database named `dubai` and a collection named `landmarks`.

### Files
* Folder `/uploads` is used as temporary storage location for image uploading used by Parse Server.

### Backend Setup
* Inside repo install node packages by running `npm install`.
* Edit the .env file by adding the MongoDB Atlas database URI as well as the Parser Server keys.

### Frontend Setup
* Inside `/client` folder install node packages by running `npm install`.

### Run Parse Server
* Run the server with: `npm start`

### Parser Dashboard
* Parser Dashboard is initiated together with Parser Server (http://localhost:1337/dashboard/).
* Create 2 roles:
    1. admin: read + write
    2. anonymous: read
* For the admin role create a user with the credentials below:
    1. username: admin
    2. password: admin 
* For the anonymous role create a dummy user with random credentials.
* Populate `landmarks` class by importing JSON file data:

  ```
  curl -X POST \
      -H "X-Parse-Application-Id: {{APP_ID}}" \ 
      -H "X-Parse-REST-API-Key: {{API_KEY}}" \
      -H "Content-Type: application/json" \
      -d @DubaiLandmarks.json http://localhost:1337/parse/functions/import
  ```
* Add 2 new File type columns (`photo` and `photo_thumb`)

### Run Angular Client
* Run the client with: `ng serve --poll=2000 --open`

# Alternatives/Extras
* Docker usage
* For home page, instead of a card list, a grid view (eg. 2 columns) could be used or even a carousel.
* For editing, preview capability before uploading an image as well as rotation.
* Add registration for new blog users.
* A user icon could be added at navbar after a successful user login.
* For edit button in landmark page, an edit icon could be used instead of a text label.
