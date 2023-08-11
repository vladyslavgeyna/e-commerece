import { Router } from 'express'
import deviceController from './device.controller'

const router = Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getById)

export default router
