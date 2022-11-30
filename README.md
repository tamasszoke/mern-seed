# <img src="https://i.ibb.co/mtBQPFt/mern-seed.png"/>

![Node.js](https://img.shields.io/badge/Node.js-v18%20-informational)
![React](https://img.shields.io/badge/React-v18%20-informational)
![TypeScript](https://img.shields.io/badge/TypeScript-v4-informational)
![Docker](https://img.shields.io/badge/Docker-v20-informational)
![Cypress](https://img.shields.io/badge/Cypress-v10-informational)

Modern, complete boilerplate for MERN stack development with TypeScript and Docker.

## Introduction

A modern, clean, and consistent boilerplate using the best practices for Node.js and React, keeping scalability and performance in mind. The advanced structure allows building applications of any size.

## Support

You can support the project on [ko-fi](https://ko-fi.com/tamas0547).

# Contents

- [Highlights](#highlights)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Prerequisites](#prerequisites)
- [Preparation](#preparation)
  - [Clone the repository](#clone-the-repository)
  - [SSL setup](#ssl-setup)
  - [JWT setup](#jwt-setup)
  - [Database setup](#database-setup)
  - [Email setup](#email-setup)
- [Setup](#setup)
  - [Automated setup](#automated-setup)
  - [Manual setup](#manual-setup)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
  - [Without docker](#without-docker)
  - [Yarn/Npm Scripts](#yarn/npm-scripts)
  - [Bash Scripts](#bash-scripts)
- [Developing](#developing)
  - [Summary](#summary)
  - [Structure](#structure)
  - [Routing](#routing)
  - [Authentication](#authentication)
  - [Error handling](#error-handling)
  - [Responses](#responses)
  - [Websockets](#websockets)
  - [Emails](#emails)
  - [Testing](#testing)
  - [Formatting](#formatting)
  - [Conventions](#conventions)
  - [API design](#api-design)
  - [Dependency list](#dependency-list)
- [License](#license)

# Highlights

- JWT Authentication
- TypeScript on both ends
- Modern EcmaScript features
- Clean, consistent code
- Folder by Features structure
- Simplified production builds
- Docker containers
- Automated setup
- End-to-end tests

## Backend

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

## Frontend

- **React v18**
- **TypeScript**
- Using **Hooks**
- Jest, Cypress for testing
- Node-Sass for **SCSS** support
- Redux Toolkit for global state management
- Built-in routing (react-router)
- **Socket.IO** for real-time connection
- **Folder by Feature** structure
- **Clean, consistent code** using Prettier
- Using ES6 and ES8 features
- Light and Dark themes (SCSS)
- Toast notifications (react-toastify)
- Animations (animate.css)
- Fontawesome/material icons

# Prerequisites

- Docker (optional) - [Install](https://docs.docker.com/get-docker)
- Node.js v18 - [Install](https://nodejs.org/en/download) / [NVM](https://nodejs.org/en/download/package-manager/#nvm)

# Preparation

Preparing before the project setup.

## Clone the repository

`git clone git@github.com:tamasszoke/mern-seed.git`

> Or download it as a `.zip` file.

## SSL setup

You will need an SSL certificate for secure connection.

Generate a self-signed certificate using OpenSSL:

One-liner: `openssl req -x509 -sha256 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -days 365`

> To skip the questions, add `-subj '/CN=localhost'` to the end of the line above.

Or

1. Generate your private key: `openssl genrsa -out key.pem`
2. Generate your csr: `openssl req -new -key key.pem -out csr.pem`
3. Generate your certificate: `openssl x509 -sha256 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`

> Repeat these steps for the production certificate.
>
> Tip: use key.prod.pem and cert.prod.pem for filenames.

## JWT setup

You will need an RSA key and secret to use JWT tokens securely.

To generate it locally, use the following:

1. Generate secret key: `openssl genrsa -out jwt.secret.pem 2048`
2. Generate public key: `openssl rsa -in jwt.secret.pem -outform PEM -pubout -out jwt.public.pem`

You can also generate those using online tools such as the [jsencript demo](http://travistidwell.com/jsencrypt/demo):

1. Go to [jsencript demo](http://travistidwell.com/jsencrypt/demo)
2. Click on generate new keys button
3. Save the keys as `jwt.secret.pem` and `jwt.public.pem` files

> Repeat these steps for the production RSA keys.
>
> Tip: use jwt.secret.prod.pem and jwt.public.prod.pem for filenames.

## Database setup

This project prepared for MongoDB.

### Mongodb

Follow these steps to create a free Atlas shared database from the official [MongoDB Atlas tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial):

1. Create a MongoDB Cloud account
2. Create a MongoDB Atlas cluster
3. Configure network access and create a cluster user
4. Connect to the cluster

### Other

If you want to use a relational or any other database, follow these steps:

1. Install the appropriate package on backend
2. Configure the .env files in `./backend/.env/` folder
3. Set up the connection in `./backend/src/core/config/database.ts` file
4. Adjust the code in `./backend/src/features/auth/` folder

## Email setup

You will need a service to test emails without actually sending the messages. There are services like MailSlurp, MailHog, MailNest, Mailsnag, and Mailtrap. This project uses MailTrap.

### MailTrap

Create an account on [MailTrap](https://mailtrap.io) and follow these steps:

1. Add a new inbox and go to it's smtp settings
2. Choose the nodemailer integration example
3. Copy the data to the .env files on backend

### Local SMTP server

You can also create a local SMTP server to send and receive emails, but this requires more work to get it running, try the [smtp-tester](https://www.npmjs.com/package/smtp-tester) package.

# Setup

## Automated setup

Run `./scripts/setup.sh` from the root folder and follow the instructions.

Jump to the [usage section](#usage)!

## Manual setup

1.  Install dependencies
2.  Add SSL files
3.  Add JWT files
4.  Set env variables

### Install dependencies

Run `yarn install` inside the backend folder.

Run `yarn install` inside the frontend folder.

> Run `yarn install` inside the root folder.

### Add SSL files

Put your `cert.pem` and `key.pem` files inside the `./backend/.ssl/` folder.

If you don't have these files, you can generate a self-signed SSL certificate, check the [SSL setup](#ssl-setup) section.

### Add JWT files

Put your `jwt.secret.pem` and `jwt.public.pem` files inside the `./backend/.jwt/` folder.

If you don't have these files, check the [JWT setup](#jwt-setup) section to generate them.

### Set env variables

#### Backend

Create `.env.development` and `.env.production` files inside the `./backend/.env/` folder.

Use port 3001 in development and port 8080 in production.
On the frontend use ports 3000 and 8080.

Example for development (include all):

```
HOST=0.0.0.0
PORT=3001
FRONTEND_HOST=localhost
FRONTEND_PORT=3000
SSL_KEY=[SSL_KEY_FILE_NAME]
SSL_CRT=[SSL_CRT_FILE_NAME]
JWT_SECRET=[JWT_SECRET_KEY_FILE_NAME]
JWT_PUBLIC=[JWT_PUBLIC_KEY_FILE_NAME]
COOKIE_SECRET=[COOKIE_SECRET_KEY]
DATABASE_URL=[MONGOLAB_DB_URL]
EMAIL_USER=[EMAIL_USER]
EMAIL_PASS=[EMAIL_PASSWORD]
EMAIL_FROM=[EMAIL_FROM]
```

Located at `./backend/.env/.env.development`.

> If you change the ports, change them in the other env files too (root, frontend, cypress).

#### Frontend

Create `.env.development` and `.env.production` files inside the `./frontend/` folder.

Use port 3000 in development and port 8080 in production.
On the backend use ports 3001 and 8080.

Example (include all):

```
REACT_APP_HOST=0.0.0.0
REACT_APP_PORT=3000
REACT_APP_BACKEND_HOST=localhost
REACT_APP_BACKEND_PORT=3001
SKIP_PREFLIGHT_CHECK=true
CHOKIDAR_USEPOLLING=true
```

Located at `./frontend/.env.development`.

> If you change the ports, change them in the other env files too (root, backend, cypress).

##### E2E testing

Create `.cypress.env.json` file inside the `./frontend/` folder.

Example (include all):

```
{
  EMAIL_API_URL="https://mailtrap.io/api/accounts/[YOUR_ACCOUNT_ID]/inboxes/[YOUR_INBOX_ID]/messages",
  EMAIL_API_TOKEN="[YOUR_API_TOKEN]",
}
```

You will also need to set up the correct hostname and port number for Cypress in the config file located at `./frontend/cypress.config.ts`.

Example config file:

```
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:3000',
  },
})
```

> If you change the ports, change them in the other env files too (root, backend, frontend).

#### Docker

Create `.env` file inside the root folder.

Use ports 3000/3001 for development and port 8080 for production.

Example (include all):

```
DEVELOPMENT_BACKEND_PORT=3001
DEVELOPMENT_FRONTEND_PORT=3000
PRODUCTION_PORT=8080
```

Located at `./.env`.

> If you change the ports, change them in the other env files too (backend, frontend, cypress).

# Usage

> Use the following commands from the root folder.

## Development

1.  Start `yarn docker:dev` or `docker-compose -f docker-compose.development.yml up`
2.  Backend at [https://localhost:3001](https://localhost:3001)
3.  Frontend at [https://localhost:3000](https://localhost:3000)

Stop the container using `docker-compose -f docker-compose.development.yml down`

> Run `npm rebuild node-sass` inside the frontend container if asked.

> Type the famous 'thisisunsafe' message if you got browser security error.

## Production

1.  Run `yarn build`
2.  Start `yarn docker:prod` or `docker-compose -f docker-compose.production.yml up`
3.  Go to [https://localhost:8080](https://localhost:8080)

Stop the container using `docker-compose -f docker-compose.production.yml down`.

## Without docker

1. Install the necessary tools by running `yarn install` from the root folder
2. Set the environment you use in the `./backend/package.json` file

Add the NODE_ENV variables to the start of the scripts:

`"start": "NODE_ENV=development ..."`

`"prod": "NODE_ENV=production ..."`

> Note: on Windows you may need to use `set NODE_ENV=development && ...`.

### Development

1. Run `yarn start`
2. Backend at [https://localhost:3001](https://localhost:3001)
3. Frontend at [https://localhost:3000](https://localhost:3000)

### Production

1. Run `yarn build` from the root folder
2. Run `yarn install` inside the build folder
3. Start with `yarn prod` from the root folder
4. Go to [https://localhost:8080](https://localhost:8080)

**PM2 support**

Start the build with `yarn prod:pm2`.

Remove all instances using `yarn prod:pm2:kill`.

## Yarn/Npm scripts

You can use the following scripts from the root folder (`yarn/npm`):

| Name           | Description                                                       |
| :------------- | :---------------------------------------------------------------- |
| test:backend   | Run the backend tests                                             |
| test:frontend  | Run the frontend tests                                            |
| test:e2e       | Run the end-to-end tests                                          |
| start          | Don't forget to run `yarn install` first from the root folder     |
| start:backend  | Run the node server in development mode                           |
| start:frontend | Run the react client in development mode                          |
| build          | Build the complete application for production to the build folder |
| prod           | Run the built app in production mode with node (build only)       |
| prod:pm2       | Run the built app in production mode with PM2 (build only)        |
| prod:pm2:kill  | Stop the instances of PM2 (build only)                            |
| docker:dev     | Start with docker in development mode                             |
| docker:prod    | Start with docker in production mode                              |

> Check backend test coverage using `yarn test:coverage` from the backend folder.

## Bash scripts

As a bonus, I've made a some scripts in bash to help you get started faster.

Find them in the `./scripts/` folder:

| Name     | Description               |
| :------- | :------------------------ |
| setup.sh | Interactive project setup |
| build.sh | Create a clean build      |

The setup script will ask for the necessary keys and configurations and then create the appropriate files. The build script will remove the existing build directories and create the new build.

# Developing

## Summary

### Backend

The most important files of are in the `./src/core/` folder, the server won't work without them. There are optional files in the `./src/common/` and `./src/features/` folders, these are not necessary to run the server.

The `./src/index.ts` is the main file, where the server's listen function will load the configuration and start the database connection, the routes, the server, and the Socket.IO server.

### Frontend

Similarly to the backend, find the important files in the `./src/core/` folder, while the optional files are in the `./src/common/` and `./src/features/` folders.

Based on the create-react-app using the Redux Toolkit, TypeScript template. Loads the routing and other common components wrapped by Redux in the `./src/index.tsx` and `./src/app.tsx` files.

## Structure

| Content              | Path          |
| :------------------- | :------------ |
| Backend code         | `./backend/`  |
| Frontend code        | `./frontend/` |
| Production build     | `./build/`    |
| Bash scripts         | `./scripts/`  |
| Docker env file      | `./.env`      |
| Docker compose files | `./`          |
| Configuration files  | `./`          |

### Backend structure

| Content               | Path              |
| :-------------------- | :---------------- |
| Environment variables | `./.env/`         |
| SSL files             | `./.ssl/`         |
| JWT files             | `./.jwt/`         |
| Public files          | `./public/`       |
| Main logic            | `./src/`          |
| Core functions        | `./src/core/`     |
| Features              | `./src/features/` |
| Common components     | `./src/common/`   |
| Docker files          | `./`              |
| Configuration files   | `./`              |

#### Structure of a feature

| Content               | Example                                 |
| :-------------------- | :-------------------------------------- |
| Entry point           | `./src/features/feat/index.ts`          |
| Main functions        | `./src/features/feat/feat.ts`           |
| Routes                | `./src/features/feat/feat.routes.ts`    |
| Database model        | `./src/features/feat/feat.model.ts`     |
| Interface             | `./src/features/feat/feat.interface.ts` |
| Integration tests     | `./src/features/feat/feat.test.ts`      |
| Swagger documentation | `./src/features/feat/feat.docs.yaml`    |
| Components            | `./src/features/feat/components/`       |
| Email templates       | `./src/features/feat/templates/`        |

#### Details of the ./src/ folder

| Content            | Path                     |
| :----------------- | :----------------------- |
| Configuration      | `./src/core/config/`     |
| Server declaration | `./src/core/server/`     |
| Authentication     | `./src/features/auth/`   |
| Documentation      | `./src/features/docs/`   |
| Home functions     | `./src/features/home/`   |
| Socket functions   | `./src/features/socket/` |
| User functions     | `./src/features/user/`   |
| Common components  | `./src/common/`          |

### Frontend structure

| Content                       | Path               |
| :---------------------------- | :----------------- |
| Environment variables         | `./.env.*`         |
| Public files                  | `./public/`        |
| Main logic                    | `./src/`           |
| Core functions                | `./src/core/`      |
| Features                      | `./src/features/`  |
| Common components             | `./src/common/`    |
| Images to use in tsx files    | `./public/images/` |
| (Images to use in scss files) | `./src/images/`    |
| Docker files                  | `./`               |
| Configuration files           | `./`               |

#### Structure of a feature

| Content           | Example                                  |
| :---------------- | :--------------------------------------- |
| Entry point       | `./src/features/feat/index.ts`           |
| Main functions    | `./src/features/feat/feat.tsx`           |
| Interface         | `./src/features/feat/feat.interface.ts`  |
| Integration tests | `./src/features/feat/feat.test.tsx`      |
| Redux slice       | `./src/features/feat/feat.slice.ts`      |
| Redux slice tests | `./src/features/feat/feat.slice.test.ts` |
| Components        | `./src/features/feat/components/`        |

#### Details of the ./src/ folder

| Content                | Path                              |
| :--------------------- | :-------------------------------- |
| Routing component      | `./src/core/routing/`             |
| Main hooks             | `./src/core/hooks/`               |
| Redux store            | `./src/core/store/`               |
| Color themes           | `./src/core/themes/`              |
| Auth definitions       | `./src/features/auth/auth/`       |
| Activation page        | `./src/features/auth/activation/` |
| Join page              | `./src/features/auth/join/`       |
| Login page             | `./src/features/auth/login/`      |
| Recovery page          | `./src/features/auth/recovery/`   |
| Reset page             | `./src/features/auth/reset/`      |
| Error page             | `./src/features/error/`           |
| Home page              | `./src/features/home/`            |
| Profile page           | `./src/features/user/profile/`    |
| Background component   | `./src/common/background/`        |
| Kofi component         | `./src/common/kofi/`              |
| Navigation component   | `./src/common/navigation/`        |
| Notification component | `./src/common/notification/`      |

### Production build structure

| Content               | Path                |
| :-------------------- | :------------------ |
| Environment variables | `./build/.env/`     |
| SSL files             | `./build/.ssl/`     |
| JWT files             | `./build/.jwt/`     |
| Backend               | `./build/index.js`  |
| Frontend              | `./build/frontend/` |
| Build logs            | `./build/log/`      |
| Configuration files   | `./build/`          |

## Routing

### Backend

The main routing handler for the backend:

```
app.use('/', homeRoute)
app.use('/api/auth', authRoute)
app.use('/api/docs', docsRoute)
app.use('*', error.routing)
app.use(error.internal)
```

Source: `./src/core/server/server.routing.ts`

#### Routes

| Description   | Method | Route                      |
| :------------ | :----- | -------------------------- |
| Home          | GET    | `/`                        |
| Documentation | GET    | `/api/docs`                |
| Auth check    | GET    | `/api/auth/local/check`    |
| Join          | PUT    | `/api/auth/local/join`     |
| Resend        | POST   | `/api/auth/local/resend`   |
| Activate      | POST   | `/api/auth/local/activate` |
| Login         | POST   | `/api/auth/local/login`    |
| Logout        | GET    | `/api/auth/local/logout`   |
| Recover       | POST   | `/api/auth/local/recover`  |
| Reset         | POST   | `/api/auth/local/reset`    |
| User profile  | POST   | `/api/user/profile/check`  |
| User remove   | POST   | `/api/user/profile/remove` |

### Frontend

The main routing handler for the frontend:

```
<Route path="/" element={<Home />} />
<Route path="/auth/login" element={<Login />} />
<Route path="/auth/join" element={<Join />} />
<Route path="/auth/activation/:id" element={<Activation />} />
<Route path="/auth/activation/:id/:code" element={<Activation />} />
<Route path="/auth/recovery" element={<Recovery />} />
<Route path="/auth/reset/:id" element={<Reset />} />
<Route path="/auth/reset/:id/:code" element={<Reset />} />
<Route path="/user/profile" element={<Profile />} />
<Route
  path="/error/unauthorized"
  element={<Error status={401} message="Unauthorized request" />}
/>
<Route
  path="/error/notfound"
  element={<Error status={404} message="Page not found" />}
/>
<Route path="*" element={<Navigate to="/error/notfound" replace />} />
```

Source: `./src/core/routing/routing.tsx`

## Authentication

Using JWT for authentication and authorization.

JWTs are stored on the frontend in cookies.

> Always check the OWASP and make sure your application is as secure as possible.

### Expiration

- Token: 15 minutes (renewing while the refresh token is valid)
- Refresh token: 7 days (strict from login date and time)

Source: `./src/core/config/components/settings.ts`

### Authorization

The following image shows the authorization process.

![JWT Authorization](backend/public/images/docs/jwt-auth.png 'JWT Authorization')

## Error handling

### Global errors

Using global error handlers for routing, internal errors, uncaught exceptions and unhandled rejections.

Source: `./src/core/server/components/error.ts`

### Custom errors

Custom errors with type, internal error code, and custom message beside the error. The error type helps in sending responses. There are two types currently, 'client' (400 response) and 'server' (500 response).

#### ClientError codes

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

#### ServerError codes

| Type   | Code | Message                   |
| :----- | :--- | :------------------------ |
| server | 5000 | database connection error |
| server | 5001 | refresh token not saved   |

#### ClientError class

```
class ClientError extends Error {
  type: string
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.type = 'client'
    this.code = code
  }
}
```

Source: `./src/core/server/server.interface.ts`

Example:

`throw new ClientError(1000, 'route not found')`

#### ServerError class

```
class ServerError extends Error {
  type: string
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.type = 'server'
    this.code = code
  }
}
```

Source: `./src/core/server/server.interface.ts`

Example:

`throw new ServerError(5000, 'database connection error')`

## Responses

Sending responses with a custom function to preserve the standard format.

Source: `./src/core/server/components/response.ts`

### Status codes

| Status code | Description                                            |
| :---------- | :----------------------------------------------------- |
| 200         | Everything worked as expected                          |
| 400         | Bad request, often due to missing a required parameter |
| 401         | Unauthorized, no valid JWT token provided              |
| 404         | Not found, the resource was not found                  |
| 500         | Server error, something went wrong on the server       |

### Response interface

```
interface Response {
  success: boolean
  status: number
  result: boolean | object
  error: any
}
```

Source: `./src/core/server/server.interface.ts`

### Response.send function

Parameters:

```
res: express.Response,
status: number,
result: boolean | object,
error: any
```

Example:

`return response.send(res, 200, result, false)`

## Websockets

The API prepared for websocket connections with Socket.IO.

### Endpoint

`wss://localhost:3001`

To modify or remove it, you can use the files below.

### Socket files

| Type          | Path                              |
| :------------ | :-------------------------------- |
| Server        | \`./src/core/server/server.ts/\`  |
| Configuration | \`./src/core/config/socketio.ts\` |
| Feature       | \`./src/features/socket/\`        |

### Emit cheatsheet

A useful list of commands for sending messages using Socket.IO.

Find the latest version on the [official website](https://socket.io/docs/v4/emit-cheatsheet).

## Emails

Sending emails using a custom function.

Source: `./src/common/components/mail.ts`

### Mail interface

```
interface MailData {
  from?: string
  to: string
  subject: string
  content: string
}
```

Source: ./src/common/common.interface.ts

### Mail.send function

Parameters:

```
template: string,
subject: string,
to: string,
data: object
```

Example:

```
const templateDir = 'features/auth/auth/templates'

await mail.send(`${templateDir}/join.ejs`, 'Join', result.email, {
  user: result,
  code: activationCode,
})
```

> The root directory for templates is `src/`, use them relative to that.

## Testing

The backend uses Mocha for basic integration tests.

The frontend uses React Testing Library for unit/integration tests and Cypress for End-to-End tests.

### Focus

Focusing on the actual user experience.

Complete E2E testing using Cypress.

Basic unit/integration tests on both ends.

### Selectors

Selecting elements mainly by content both for unit/integration and E2E tests.

If your tests need to be more resilient to change, you can use `data-testid` as selector.

> Used data-testid to select the dark/light mode buttons and the background component.

### Default user

If you run all E2E tests, it will create a new user with the following credentials:

Email: johndoe@example.com
Password: 12345

At the end of the tests it will remove this user from the database.

## Formatting

Using prettier to keep the code format consistent.

### Prettier config

```
{
  "semi": false,
  "singleQuote": true
}
```

Root: `./.prettierrc.json`

> Add this config file to the backend or frontend folder if need.

## Conventions

### Function/route structure

Following the Feature/Type/Action scheme, `auth/local/login` for example.

### Database

#### Database naming

| Type      | Example    |
| :-------- | :--------- |
| Camelcase | `mernSeed` |

#### Collection naming

| Type          | Example     |
| :------------ | :---------- |
| Singular word | `user`      |
| camelCase     | `userOrder` |

#### Field naming

| Type            | Example               |
| :-------------- | :-------------------- |
| Singular word   | `name`                |
| camelCase       | `lastLogin`           |
| Array as \*List | `loginList: ['date']` |

## API design

It's a full stack project, so I've not included versioning on the backend, but you can also use it as a single API. Just choose between global versioning and evolution designs.

### Global versioning

I would suggest to create another instance of the whole backend. Then you could use a reverse proxy to direct the requests to the appropriate version, for example:

`v1.example.com/auth/local/check`

`v2.example.com/auth/local/check`

#### Keep as one instance

1. Create the `v1` and `v2` folders inside `src/`
2. Copy the content of `src/features/` and `src/common/` folders into them
3. Update the imports of the files you just copied
4. Create the new routes as `/api/v1/`, `/api/v2/`, and keep the default `/api/` route for the newest version of the API

### API evolution

Everything stays as it is now, but you have to pay attention to keep a standard scheme and backward compatibility for the responses.

> API evolution is the concept of striving to maintain the "I" in API, the request/response body, query parameters, general functionality, etc., only breaking them when you absolutely, absolutely, have to.

More information:

[apisyouwonthate.com](https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis)

[api-university.com](https://api-university.com/api-lifecycle/api-design/api-design-api-evolution-api-versioning)

## Dependency list

### Root

Find it inside the `./package.json` file.

### Backend

Find it inside the `./backend/package.json` file.

### Frontend

Find it inside the `./frontend/package.json` file.

# License

**The MIT License (MIT)**  
Copyright (c) 2022 Tamas Szoke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
