'use strict'

const express = require('express')
const router = express.Router()
const paypal = require('../src/paypal')

router.post('/create', paypal.create)
router.post('/complete', paypal.complete)

module.exports = router
