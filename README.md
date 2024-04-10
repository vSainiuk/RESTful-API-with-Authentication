# Title: Task Management RESTful API with Authentication

# Description:
This project implements a simple task management system using the RESTful API. It allows users to register, log in and manage their tasks. All requests to the API are authenticated using JWT (JSON Web Tokens).

# API functionality:
1. User registration: Users can create an account by providing a username, email address, and password.

2. User Login: Registered users can log in with their email address and password to access their tasks.

3. CRUD operations with tasks: After logging in, users can perform the following operations with their tasks:
 - Creating a new task with a name and description.
 - Getting a list of their tasks.
 - Retrieving an individual task by its unique identifier.
 - Update an existing task by its identifier.
 - Deleting a task by its ID.

4. User authentication: Authentication middleware is implemented to ensure that only authenticated users have access to task-related endpoints.
5. Using JWT for authentication and authorization.
6. Secure password storage: User passwords are hashed and salted before being stored in the database.

# Using authentication:
1. Registering a new user:

Make a POST request to `/api/register` with a JSON object containing the username, email, and password fields.

2. Log in to the system:

Make a POST request to `/api/login` with a JSON object containing the email and password fields.
Upon successful login, you will receive an access token in the response. This token should be used for authentication in subsequent requests.

3. Using an access token:

Add the access token to the request header in the format `Authorization: <token>`.
It will be used to authenticate and authorize the user when accessing secure endpoints.

# Launch requirements:
 - Express.js is used for routing and intermediate handlers.
 - The database PostgreSQL is used to store data.
 - Appropriate HTTP methods (POST, GET, PUT, DELETE) and status codes are used.
 - Validation of the entered data is carried out (for example, checking the format of e-mail, mandatory fields for tasks).

# Bonus points:
 - Implemented pagination and sorting options for the task list.
 - Convenient error handling and return of meaningful error messages have been added.
 - Implemented role-based access control.

# Getting started guide:
 - Clone the repository to your local computer.
 - `git clone https://github.com/vSainiuk/RESTful-API-with-Authentication.git`
 - `cd RESTful-API-with-Authentication`
 - Install all dependencies using `npm install`.
 - Start the server using `npm start`.

# API documentation can be found at http://localhost:3000/api-docs. TODO: write docs

# Contact

Vadym Sainiuk - vadik.sajnuykk@gmail.com
