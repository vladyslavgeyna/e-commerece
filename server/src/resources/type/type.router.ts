import { Router } from 'express'
import typeController from './type.controller'

const router = Router()

router.post('/', typeController.create)

export default router
