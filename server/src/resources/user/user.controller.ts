import { AppDataSource } from '@/data-source'
import { Request, Response } from 'express'
import { User } from './user.entity'

class UserController {
	private userRepository

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
	}

	async register(req: Request, res: Response) {}
}

export default new UserController()
