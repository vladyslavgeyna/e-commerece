import authMiddleware from '@/middlewares/auth.middleware'
import { Router } from 'express'
import userController from './user.controller'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router
