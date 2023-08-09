import { RequestWithBody } from '@utils/types/request.type'
import { Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Type } from './type.entity'

class TypeController {
	typeRepository = AppDataSource.getRepository(Type)

	async create(req: RequestWithBody<{ name: string }>, res: Response) {
		console.log(AppDataSource)

		const { name } = req.body
		const type = this.typeRepository.create({
			name
		})

		const createdType = await this.typeRepository.save(type)
		return res.json(createdType)
	}
}

export default new TypeController()
