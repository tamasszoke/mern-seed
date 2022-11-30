'use strict'

import express from 'express'
import auth from '../auth/auth'
const router = express.Router()
import user from './index'

router.post('/profile/check', auth.protect, user.check)
router.post('/profile/remove', auth.protect, user.remove)

export default router
