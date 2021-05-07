# Contacts app

## General information

This project is a simple API for saving contacts via web app. It allows the user to create, see, edit and delete their contacts.

Its skeleton is based in the fullstack boilerplate by BurakDmb that you can check out [here](https://github.com/BurakDmb/MERN-EasyBoilerplate).

It uses MERN stack:
- MongoDB
- Express
- React
- NodeJS

## For running in development environment:
 - Install mongoDB and create a simple database or create a cloud based one (I recommend [this](https://www.mongodb.com/cloud))
 - For running the server:
  ```
   npm run start
   ```
  - For running the client:
  ```
   npm run start
   ```  
  - Notice that dev branch is currently inestable. All working changes are in master branch, be sure to be using that one. 

## For deploying into production environment: Heroku + GitHub:
- Fork this repo or clone it and upload it to your account.
- For Heroku deployment follow this [easy tutorial](https://www.youtube.com/watch?v=QUvxrzINj5Q).

## Resources
This are the API's urls where you can find where the data is being processed.
### Endpoint 
- GET: "/contacts"
To see all contacts retrieved from the database as JSON format: {"_id":"609354fc11d5625c3a170556","name":"Pedro","lastname":"Picapiedra","company":"Encora","phone":1342654565,"email":"aa@g.com","__v":0}
- POST: "/"
To create a new contact on the database.
- PUT/DELETE: "/:id"
To update or delete a contact based on its id.

## Fair Use Policy

Finally, this app is public and was made for educational purposes. Feel free to use it or modify it. 
