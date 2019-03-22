'use strict'

const express = require('express')
const router = express.Router()
const user = require('../src/user')

router.post('/check', user.checkLogin)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.put('/registration', user.registration)
router.post('/activation', user.activation)
router.post('/recovery', user.recovery)
router.post('/passchange', user.passChange)
router.post('/profileupdate', user.profileUpdate)
router.delete('/profileremove', user.profileRemove)

module.exports = router
