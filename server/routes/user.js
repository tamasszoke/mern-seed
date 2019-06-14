'use strict'

const express = require('express')
const router = express.Router()
const user = require('../src/user')
const protect = require('./protect')

router.post('/check', user.checkLogin)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.put('/registration', user.registration)
router.post('/activation', user.activation)
router.post('/recovery', user.recovery)
router.post('/passchange', protect, user.passChange)
router.post('/profileupdate', protect, user.profileUpdate)
router.delete('/profileremove', protect, user.profileRemove)

module.exports = router
