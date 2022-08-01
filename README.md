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

* Landing page
![Screen Shot 2022-08-01 at 10 09 29](https://user-images.githubusercontent.com/93162290/182166813-99191279-4c7a-4595-9c53-043e52439322.png)

* New users can create a new account with their first name, last name, email, and password. If user submit empty or invalid data, error messages will be showed.
![Screen Shot 2022-08-01 at 10 31 36](https://user-images.githubusercontent.com/93162290/182174509-3135563d-6e8e-4ffc-9d82-633021201a49.png)

* After signing up, users can log in with their account. If user submit empty or invalid data, error messages will be showed.
* Users need to be logged in to use some functionalities, e.g. start a group. 
![Screen Shot 2022-08-01 at 10 30 56](https://user-images.githubusercontent.com/93162290/182174515-0958d642-2d42-4d19-a213-985e9793d860.png)

* Users can log out of their account.

## Groups

* Users can see all groups listed on groups page, and they can click on any group to see the group detail.
![Screen Shot 2022-08-01 at 10 31 51](https://user-images.githubusercontent.com/93162290/182173716-7c4f709e-8fd4-4049-b245-a5e08c76bf4d.png)
* Logged-in user can create a group by submitting a new group form. If user submit empty or invalid data, error messages will be showed.
![Screen Shot 2022-08-01 at 10 32 14](https://user-images.githubusercontent.com/93162290/182173774-a4c456e2-c1da-4437-85cd-8b58a2b550cc.png)
* The organizer of the group can edit the information of the group. If user submit empty or invalid data, error messages will be showed.
* The organizer of the group can delete the information of the group. 

## Events

* Users can see all events listed on events page, and they can click on any event to see the event detail.
* Organizer of a group can create events for that group. If user submit empty or invalid data, error messages will be showed.
* The organizer of the event can edit the information of the event. If user submit empty or invalid data, error messages will be showed.
* The organizer of the event can delete the information of the event. 
* If a group is deleted, all events belong to that group are deleted.
