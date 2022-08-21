# EasyChats Project

This is the code for my EasyChats project. it is a real-time chat app that uses websockets.  

This project was made with **MongoDB**, **Express**, **Node** and **React**.   

## Data
There are two types of objects stored in our database:

* Users
* Room

## Install Project Dependencies

To install all dependencies, move into the server folder and the client folder and simply run `npm install` in each

## Start the Project

To start the project simply move into the server folder and run `npm run start`. Then open another terminal window, move into the client folder and again run `npm run start`.

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| _id                 | String           | The user’s unique identifier, set automatically by mongoDB |
| username          | String           | The user’s chosen username     |
| email  | String           | The user's email |
| password | String | The user's chosen password encrypted|

### Rooms

Rooms include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| _id                  | String | The room's unique identifier, set automatically by mongoDB |
| roomname        | String | The name of the created room |
| password | String | The password needed to enter the room and chat|
| users | Array[String] | A list of all the users's usernames that are currently in this room|


