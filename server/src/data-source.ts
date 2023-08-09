import { BasketDevice } from '@resources/basket-device/basket-device.entity'
import { Basket } from '@resources/basket/basket.entity'
import { Brand } from '@resources/brand/brand.entity'
import { DeviceInfo } from '@resources/device-info/device-info.entity'
import { Device } from '@resources/device/device.entity'
import { Rating } from '@resources/rating/rating.entity'
import { Type } from '@resources/type/type.entity'
import { User } from '@resources/user/user.entity'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'root',
	database: 'e-commerce',
	synchronize: true,
	logging: false,
	entities: [
		Type,
		User,
		Basket,
		BasketDevice,
		Brand,
		Device,
		DeviceInfo,
		Rating
	],
	migrations: [],
	subscribers: []
})
