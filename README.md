# Meetup

This is a Meetup clone fullstack project. Meetup is a social media platform for hosting and organizing in-person and virtual activities, gatherings, and events for people and communities of similar interests, hobbies, and professions. In this project, users can create an user account and explore groups and events available. They can also create their own groups and events. * [Click here to view Project Live Site](https://meetup22.herokuapp.com/)

### This project is built with:
* Javascript
* Express
* NodeJS
* SQLite & sequelize
* HTML & CSS
* React & Redux

### Please see below links to project Wiki:
* [API Routes](https://github.com/YueHuang22/API-project/wiki/API-Documentation)
* [Database Schema](https://github.com/YueHuang22/API-project/wiki/Database-Schema)
* [Feature List](https://github.com/YueHuang22/API-project/wiki/Feature-List)
* [Redux State Shape](https://github.com/YueHuang22/API-project/wiki/Redux-State-Shape)

## Users

* New users can create a new account with their first name, last name, email, and password. If user submit empty or invalid data, error messages will be showed.
* After signing up, users can log in with their account. If user submit empty or invalid data, error messages will be showed.
* Users need to be logged in to use some functionalities, e.g. start a group. 
* Users can log out of their account.

## Groups

* Users can see all groups listed on groups page, and they can click on any group to see the group detail.
* Logged-in user can create a group by submitting a new group form. If user submit empty or invalid data, error messages will be showed.
* The organizer of the group can edit the information of the group. If user submit empty or invalid data, error messages will be showed.
* The organizer of the group can delete the information of the group. 

## Events

* Users can see all events listed on events page, and they can click on any event to see the event detail.
* Organizer of a group can create events for that group. If user submit empty or invalid data, error messages will be showed.
* The organizer of the event can edit the information of the event. If user submit empty or invalid data, error messages will be showed.
* The organizer of the event can delete the information of the event. 
* If a group is deleted, all events belong to that group are deleted.
