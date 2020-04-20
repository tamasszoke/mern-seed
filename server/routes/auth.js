'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../src/auth')

router.post('/check', auth.check)
router.post('/login/local', auth.login)
router.get('/login/google', auth.google.login)
router.get('/login/google/callback', auth.google.callback, auth.google.ready)
router.get('/login/github', auth.github.login)
router.get('/login/github/callback', auth.github.callback, auth.github.ready)
router.post('/logout', auth.logout)
router.put('/registration', auth.registration)
router.post('/registration/finish', auth.finish)
router.post('/activation', auth.activation)
router.post('/recovery', auth.recovery)

module.exports = router
