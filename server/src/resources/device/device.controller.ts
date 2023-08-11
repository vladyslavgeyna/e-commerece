import { DeviceInfo } from '@resources/device-info/device-info.entity'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithQuery
} from '@utils/types/request.type'
import { NextFunction, Response } from 'express'
import path from 'path'
import * as uuid from 'uuid'
import { AppDataSource } from '../../data-source'
import { Device } from './device.entity'

class DeviceController {
	private deviceRepository
	private deviceInfoRepository

	constructor() {
		this.deviceRepository = AppDataSource.getRepository(Device)
		this.deviceInfoRepository = AppDataSource.getRepository(DeviceInfo)
	}

	create = async (
		req: RequestWithBody<{
			name: string
			price: number
			brandId: number
			typeId: number
			info: string
		}>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { name, price, brandId, typeId, info } = req.body

			//@ts-ignore
			const { img } = req.files
			const fileName = uuid.v4() + '.jpg'

			img.mv(
				path.resolve(
					__dirname,
					'..',
					'..',
					'..',
					'public',
					'images',
					fileName
				)
			)

			const device = this.deviceRepository.create({
				name,
				price,
				img: fileName,
				brand: { id: brandId },
				type: { id: typeId }
			})

			const newDevice = await this.deviceRepository.save(device)

			if (info) {
				const infoArray: DeviceInfo[] = JSON.parse(info)
				console.log('infoArray', infoArray)

				infoArray.forEach(async element => {
					const deviceInfo = this.deviceInfoRepository.create({
						title: element.title,
						description: element.description,
						device: { id: newDevice.id }
					})
					await this.deviceInfoRepository.save(deviceInfo)
				})
			}

			return res.json(newDevice)
		} catch (error) {
			next(error)
		}
	}

	getAll = async (
		req: RequestWithQuery<{
			brandId: string
			typeId: string
			limit: string
			page: string
		}>,
		res: Response,
		next: NextFunction
	) => {
		let { brandId, typeId, limit, page } = req.query
		page = page || '1'
		limit = limit || '9'
		let offset = Number(page) * Number(limit) - Number(limit)

		let devices
		const findOptions = {
			relations: {
				brand: true,
				type: true,
				deviceInfos: true
			},
			select: {
				brand: {
					id: true
				},
				type: {
					id: true
				}
			},
			skip: offset,
			take: Number(limit)
		}
		if (!brandId && !typeId) {
			devices = await this.deviceRepository.findAndCount(findOptions)
		}

		if (brandId && !typeId) {
			devices = await this.deviceRepository.findAndCount({
				...findOptions,
				where: { brand: { id: Number(brandId) } }
			})
		}

		if (!brandId && typeId) {
			devices = await this.deviceRepository.findAndCount({
				...findOptions,
				where: { type: { id: Number(typeId) } }
			})
		}

		if (brandId && typeId) {
			devices = await this.deviceRepository.findAndCount({
				...findOptions,
				where: {
					type: { id: Number(typeId) },
					brand: { id: Number(brandId) }
				}
			})
		}

		res.json(devices)
	}

	getById = async (
		req: RequestWithParams<{ id: string }>,
		res: Response,
		next: NextFunction
	) => {
		const { id } = req.params
		const device = await this.deviceRepository.findOne({
			where: { id: Number(id) },
			relations: {
				deviceInfos: true
			}
		})

		return res.json(device)
	}
}

export default new DeviceController()
