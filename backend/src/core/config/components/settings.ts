'use strict'

import fs from 'fs'
import path from 'path'
import { SettingsData } from '../config.interface'

const env = process.env.NODE_ENV || 'development'

// Helper for the env path
let basePath = path.join(__dirname, '../../../../')
if (env === 'production') {
  basePath = './'
}

// Load the env file
const envPath = path.join(basePath, `.env/.env.${env}`)
const envConfig = require('dotenv').config({
  path: envPath,
})
if (envConfig.error) {
  throw envConfig.error
}

/**
 * Development config
 */
const development: SettingsData = {
  env,
  name: 'MERN-SEED',
  host: process.env.HOST!,
  port: process.env.PORT!,
  url: {
    api: `https://${process.env.HOST}:${process.env.PORT}`,
    index: `https://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
  },
  ssl: {
    key: fs.readFileSync(path.join(basePath, `${process.env.SSL_KEY}`)),
    cert: fs.readFileSync(path.join(basePath, `${process.env.SSL_CERT}`)),
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    public: fs.readFileSync(path.join(basePath, `${process.env.JWT_PUBLIC}`)),
    secret: fs.readFileSync(path.join(basePath, `${process.env.JWT_SECRET}`)),
    tokenExpiresIn: '15m',
    refreshTokenExpiresIn: 7,
  },
  cookie: {
    secret: process.env.COOKIE_SECRET!,
    options: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  email: {
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASS!,
    from: process.env.EMAIL_FROM!,
  },
  folder: {
    public: path.join(basePath, 'public'),
    frontend: path.join(basePath, 'frontend/public'),
  },
}

/**
 * Production config
 */
const production: SettingsData = {
  env,
  name: 'MERN-SEED',
  host: process.env.HOST!,
  port: process.env.PORT!,
  url: {
    api: `https://${process.env.HOST}:${process.env.PORT}`,
    index: `https://${process.env.HOST}:${process.env.PORT}`,
  },
  ssl: {
    key: fs.readFileSync(path.join(basePath, `${process.env.SSL_KEY}`)),
    cert: fs.readFileSync(path.join(basePath, `${process.env.SSL_CERT}`)),
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    public: fs.readFileSync(path.join(basePath, `${process.env.JWT_PUBLIC}`)),
    secret: fs.readFileSync(path.join(basePath, `${process.env.JWT_SECRET}`)),
    tokenExpiresIn: '15m',
    refreshTokenExpiresIn: 7,
  },
  cookie: {
    secret: process.env.COOKIE_SECRET!,
    options: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  email: {
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASS!,
    from: process.env.EMAIL_FROM!,
  },
  folder: {
    public: path.join(basePath, 'frontend'),
    frontend: path.join(basePath, 'frontend'),
  },
}

let settings = development

if (env === 'production') {
  settings = production
}

export default settings
