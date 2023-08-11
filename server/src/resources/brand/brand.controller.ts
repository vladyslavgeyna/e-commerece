import { RequestWithBody } from '@utils/types/request.type'
import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Brand } from './brand.entity'

class TypeController {
	private brandRepository

	constructor() {
		this.brandRepository = AppDataSource.getRepository(Brand)
	}

	create = async (req: RequestWithBody<{ name: string }>, res: Response) => {
		const { name } = req.body
		const brand = this.brandRepository.create({
			name
		})

		const createdBrand = await this.brandRepository.save(brand)
		return res.json(createdBrand)
	}

	getAll = async (req: Request, res: Response) => {
		const brands = await this.brandRepository.find()

		return res.json(brands)
	}
}

export default new TypeController()
