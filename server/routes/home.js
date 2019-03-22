'use strict'

const express = require('express')
const home = require('../src/home')
let router = express.Router()

router.get('*', home.index)

module.exports = router
