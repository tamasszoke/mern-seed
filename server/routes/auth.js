'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../src/auth')

router.post('/check', auth.check)
router.post('/login', auth.login)
router.get('/google', auth.googleLogin)
router.get('/google/callback', auth.googleCallback, auth.googleReady)
router.post('/logout', auth.logout)
router.put('/registration', auth.registration)
router.post('/activation', auth.activation)
router.post('/recovery', auth.recovery)

module.exports = router
