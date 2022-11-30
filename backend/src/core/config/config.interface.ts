'use strict'

import { CookieOptions } from 'express'

interface SettingsData {
  env: string
  name: string
  host: string
  port: string
  url: {
    api: string
    index: string
  }
  ssl: {
    key: Buffer
    cert: Buffer
  }
  database: {
    url: string
  }
  jwt: {
    public: Buffer
    secret: Buffer
    tokenExpiresIn: string
    refreshTokenExpiresIn: number
  }
  cookie: {
    secret: string
    options: CookieOptions
  }
  email: {
    user: string
    password: string
    from: string
  }
  folder: {
    public: string
    frontend: string
  }
}

export { SettingsData }
