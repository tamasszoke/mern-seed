'use strict'

import express from 'express'
import home from './index'
let router = express.Router()

router.get('/', home.main)

export default router
