# Node API Challenge

## Topics

- Building a RESTful API.
- Performing CRUD operations.
- Writing API endpoints.

## Assignment

Use Node.js and Express to build an API that performs CRUD operations on users.

### Download Project Files and Install Dependencies

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.
- Type `npm install` to download all dependencies listed inside `package.json`.

### Database access

Database access will be done using the `db.js` file included inside the `data` folder. This file publishes the following methods:

XX `find()`: calling find returns a promise that resolves to an array of all the users contained in the database.
XX `findById()`: this method expects an `id` as it's only parameter and returns the user corresponding to the `id` provided or an empty array if no user with that `id` is found.
XXX `insert()`: calling insert passing it a user object will add it to the database and return an object with the `id` of the inserted user. The object looks like this: `{ id: 123 }`.
XXX `update()`: accepts two arguments, the first is the `id` of the user to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
XX `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Start the API and Implement Requirements

X To start the server, type `npm run server` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.
X Add the code necessary to implement the API requirements.
X **Test the API using _Postman_ as you work through the exercises.**

### User Schema

Users in the database conform to the following object structure:

```js
{
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

### Write endpoints to perform the following queries

Inside `index.js` add the code necessary to implement the following _endpoints_:

| Method | URL            | Description                                                                                                                       |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
XX POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                                              |
XXX GET    | /api/users     | Returns an array of all the user objects contained in the database.                                                               |
XXX GET    | /api/users/:id | Returns the user object with the specified `id`.                                                                                  |
XX DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                                            |
XX PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/users`:

xIf the request body is missing the `name` or `bio` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

x If the information about the _user_ is valid:

  - save the new _user_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _user document_.

x If there's an error while saving the _user_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the user to the database" }`.

When the client makes a `GET` request to `/api/users`:

XX If there's an error in retrieving the _users_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The users information could not be retrieved." }`.

When the client makes a `GET` request to `/api/users/:id`:

X If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

X If there's an error in retrieving the _user_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/users/:id`:

XX If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

XX If there's an error in removing the _user_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user could not be removed" }`.

When the client makes a `PUT` request to `/api/users/:id`:

XX If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

xIf the request body is missing the `name` or `bio` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

X If there's an error when updating the _user_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user information could not be modified." }`.

X If the user is found and the new information is valid:

  - update the user document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _user document_.

## Stretch Problems

To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

- add the `cors` npm module: `npm i cors`.
- add `server.use(cors())` after `server.use(express.json())`.

Create a new React application and connect it to your server:

- the React application can be anywhere, but, for this project create it inside the folder for the solution.
- connect to the `/api/users` endpoint in the API and show the list of users.
- add a delete button to each displayed user that will remove it from the server.
- add forms to add and update data.
- Style the list of users however you see fit.
