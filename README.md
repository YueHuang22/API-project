# Meetup

## You can see all groups on Meetup

Returns all the groups.

- you don't need authentication on this
- Request

  - Method: GET
  - URL: /api/groups
  - Body: none


## Get all Groups joined or organized by the Current User

Returns all the groups.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/groups/my
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

s

## Get details of a Group from an id

Returns the details of a group specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/groups/:groupId
  - Body: none

## Create a Group

Creates and returns a new group.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/groups




## Edit a Group

Updates and returns an existing group.

- Require Authentication: true
- Require proper authorization: Group must belong to the current user
- Request



## Delete a Group

Deletes an existing group.

- Require Authentication: true
- Require proper authorization: Group must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/groups/:groupId
  - Body: none
