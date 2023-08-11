import roleMiddleware from '@/middlewares/role.middleware'
import UserRole from '@utils/enums/user-role'
import { Router } from 'express'
import typeController from './type.controller'

const router = Router()

router.post('/', roleMiddleware(UserRole.ADMIN), typeController.create)
router.get('/', typeController.getAll)

export default router
