import express from 'express'
import allRouter from './user.controller'
const router = express.Router()

router.post('/create-user', allRouter.createUser)

export default router
