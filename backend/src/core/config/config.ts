'use strict'

import settings from './components/settings'
import express from './components/express'
import database from './components/database'
import nodemailer from './components/nodemailer'
import socket from './components/socketio'
import stats from './components/stats'
import show from './components/logging'
import swagger from './components/swagger'

export default {
  settings,
  express,
  database,
  nodemailer,
  socket,
  stats,
  show,
  swagger,
}
export { settings, express, database, nodemailer, socket, stats, show, swagger }
