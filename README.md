# MERN Boilerplate

[![GitHub license](https://img.shields.io/github/license/tamasszoke/mern-boilerplate.svg)](https://github.com/tamasszoke/mern-boilerplate/blob/master/LICENSE)

Boilerplate for MERN stack development, ready for production.

**Highlights**

+ [Docker](https://www.docker.com/) containers
+ Using [HTTP/2](https://http2.github.io/)
+ [Redis](https://www.npmjs.com/package/connect-redis) for sessions
+ Folder by Feature structure
+ Minimal [Material UI](https://material-ui.com/) design
+ Built-in React routing, [Redux](https://redux.js.org/)
+ Built-in local authentication with [Passport](http://www.passportjs.org/)
+ Built-in [Socket.IO](https://socket.io/) connection
+ [EJS](https://ejs.co/) for rendering
+ Handling database with [Mongoose](https://mongoosejs.com/)
+ Email sending by [NodeMailer](https://nodemailer.com/about/)
+ [Winston](https://github.com/winstonjs/winston) for logging
+ Testing with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
+ Clean code with [ESLint](https://eslint.org/), [JavaScript Standard Style](https://standardjs.com/)
+ [Webpack](https://webpack.js.org/) built production server
+ Using [PM2](http://pm2.keymetrics.io/) (cluster mode) for production

## Roadmap

These are the planned updates of the project.

- Nginx server
- PayPal API
- Google logn

## Support

If you like this project, please consider supporting the development.

[![ko-fi](https://i.ibb.co/pvbX9W7/kofi21.png)](https://ko-fi.com/Z8Z7XSML)

Thank you!

## Installation

1. Install dependencies
2. Set env variables
3. Add SSL files
4. Create database

**Install dependencies**

Run <code>npm install</code> at server folder

Run <code>npm install</code> at client folder

**Set env variables - Client**

Create <code>.env.development</code> and <code>.env.production</code> files inside <code>client/</code> folder.

Use port `3002` for development and port `80` for production.

Example (include all of these):

    HOST=0.0.0.0
    PORT=3002
    REACT_APP_HOST=localhost
    REACT_APP_PORT=3001
    SKIP_PREFLIGHT_CHECK=true
    CHOKIDAR_USEPOLLING=true

Located at `client/.env.development`.

Note: if you change the ports change them in the dockerfiles too (root, server).

**Set env variables - Server**

Create <code>test.config.env</code>, <code>development.config.env</code> and <code>production.config.env</code> files inside <code>server/.env/</code> folder.

Use port `3001` for test, development and port `80` for production.

Example (include all of these):

    IP=0.0.0.0
    HOST=localhost
    PORT=3001
    CLIENT_HOST=localhost
    CLIENT_PORT=3002
    REDIS_URL=redis://redis:6379
    SSL_KEY=[SSL_KEY_FILE_NAME]
    SSL_CRT=[SSL_CRT_FILE_NAME]
    DB_HOST=[MONGOLAB_DB_URL]
    DB_USER=[MONGOLAB_DB_USERNAME]
    DB_PASS=[MONGOLAB_DB_PASSWORD]
    EMAIL_ADDRESS=[GMAIL_ADDRESS]
    EMAIL_PASS=[GMAIL_PASSWORD]

Located at `server/.env/development.config.env`.

Note: if you change the ports change them in the dockerfiles too (root, server).

**Add SSL files**

Put your (for example) <code>crt.txt</code> and <code>key.txt</code> files inside <code>server/ssl/</code> folder.

Tip: create them online for free at [ZeroSSL](https://zerossl.com/)

**Create database**

Create MongoDB with a collection called `users`.

I've used the free service provided by [mLab](https://mlab.com/).

## Usage

Note: use the following commands at the root folder.

Development

1. Start <code>docker-compose -f docker-compose.development.yml up</code>
2. Go to <code>https://localhost:3001</code> in browser for server
3. Go to <code>http://localhost:3002</code> in browser for client

Production

1. Run <code>npm run build</code>
1. Start <code>docker-compose -f docker-compose.production.yml up -d</code>
2. Go to <code>https://localhost:80</code> in browser

Note: run `npm rebuild node-sass` inside the client container if asked.

## Docker commands

Using separated docker-compose files for development and production.

**Development**

Start: `docker-compose -f docker-compose.development.yml up`<br>
Stop: `docker-compose -f docker-compose.development.yml down`

**Production**

Start: `docker-compose -f docker-compose.production.yml up`<br>
Stop: `docker-compose -f docker-compose.production.yml down`

## Without docker

You have to set the environment you use in your scripts at `server/package.json`:

    "test": "set NODE_ENV=test&& mocha --exit --reporter spec \"src/*/*.test.js\"",
    "dev": "set NODE_ENV=development&& nodemon app.js -L --exec \"npm run test && npm run lint && node\"",
    "build": "set NODE_ENV=production&& webpack --config webpack.config.js",

Just overwrite the test, dev, build lines with the above.

Development

1. Start <code>npm run dev</code> (or `dev:client` and `dev:server`)
2. Go to <code>https://localhost:3001</code> (server)
3. Go to <code>http://localhost:3002</code> (client)

Production

1. Run <code>npm run build</code>
1. Start <code>npm start</code>
2. Go to <code>https://localhost:80</code>

Note: you may need to install nodemon: <code>npm install nodemon -g</code>

## NPM Scripts

If you prefer not to use docker, you can use the following scripts from the root folder:

**npm run dev**

To use this command, you should install concurrently.<br>
It's prepared, just run `npm install` under the root folder.

**npm run dev:client**

Runs the react client in development mode.<br>
The browser will lint, reload if you make edits.

**npm run dev:server**

Runs the node server in development mode.<br>
The server will test, lint and reload if you make edits.

**npm run build**

Builds the complete application for production to the `build` folder.<br>

**npm start**

Runs the app in production mode with PM2 (cluster mode).

**npm stop**

Stops the application instances in PM2.

**npm run delete**

Removes the application instances from PM2.

## License

**The MIT License (MIT)**<br/>
Copyright (c) 2019 Tamas Szoke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
