'use strict'

const description = `
Modern, complete boilerplate for MERN stack development with TypeScript and Docker.

The backend uses Node, Express, MongoDB, and Mocha.

# Highlights

- **Node v18**
- **TypeScript**
- Express framework
- MongoDB (Mongoose)
- Mocha for testing
- EJS for rendering
- Nodemailer for emails
- Winston for logging
- **JWT** authentication
- **Socket.IO** for real-time connection
- **Folder by Feature** structure
- **Clean, consistent code** using Prettier
- Using ES6 and ES8 features
- Webpack build for production
- Docker or PM2 for production

# Authentication

Using JWT for authentication and authorization.

JWTs are stored on the frontend in cookies.

Always check the OWASP and make sure your application is as secure as possible.

### Expiration

- Token: 15 minutes (renewing while the refresh token is valid)
- Refresh token: 7 days (strict from login date and time)

### Authorization

The following image shows the authorization process.

![JWT Authorization](https://localhost:3001/public/images/docs/jwt-auth.png "JWT Authorization")

# Error handling

## Global errors

Using global error handlers for routing, internal errors, uncaught exceptions and unhandled rejections.

## Custom errors

Custom errors with type, internal error code, and custom message beside the error.

The error type helps in sending responses. There are two types currently, 'client' (400 response) and 'server' (500 response).

### ClientError codes

| Type   | Code | Message                   |
| :----- | :--- | :------------------------ |
| client | 1000 | route not found           |
| client | 1001 | parameters not found      |
| client | 1002 | account not found         |
| client | 1003 | account not activated     |
| client | 1004 | invalid email or password |
| client | 1005 | token not found           |
| client | 1006 | token error               |
| client | 1007 | refresh token expired     |
| client | 1008 | refresh token not found   |

### ServerError codes

| Type   | Code | Message                   |
| :----- | :--- | :------------------------ |
| server | 5000 | database connection error |
| server | 5001 | refresh token not saved   |

# Responses

Sending responses using a custom function to keep a standard format.

#### Sent HTTP status codes

| Status code    | Description                                               |
| :------------- | :-------------------------------------------------------- |
| 200            | Everything worked as expected.                            |
| 400            | Bad request, often due to missing a required parameter.   |
| 401            | Unauthorized, no valid JWT token provided.                |
| 404            | Not found, the resource was not found                     |
| 500            | Server error, something went wrong on the server.         |

# Websockets

The API prepared for websocket connections with Socket.IO.

#### Default socket endpoint

\`https://localhost:3001\`

# Links

See the readme for the complete documentation.

It also includes development practices, guidelines, and conventions.

[https://github.com/tamasszoke/mern-seed-dev#readme](https://github.com/tamasszoke/mern-seed-dev#readme)

`

export default { description }
