import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Type } from './type.entity'

class TypeController {
	private typeRepository

	constructor() {
		this.typeRepository = AppDataSource.getRepository(Type)
	}

	create = async (
		req: RequestWithBody<{ name: string }>,
		res: Response,
		next: NextFunction
	) => {
		const { name } = req.body
		const type = this.typeRepository.create({
			name
		})

		const createdType = await this.typeRepository.save(type)
		return res.json(createdType)
	}

	getAll = async (req: Request, res: Response) => {
		const types = await this.typeRepository.find()

		return res.json(types)
	}
}

export default new TypeController()
