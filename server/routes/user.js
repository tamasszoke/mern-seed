'use strict'

const express = require('express')
const router = express.Router()
const user = require('../src/user')
const protect = require('./protect')

router.post('/passchange', protect, user.passChange)
router.post('/profileupdate', protect, user.profileUpdate)
router.delete('/profileremove', protect, user.profileRemove)

module.exports = router
