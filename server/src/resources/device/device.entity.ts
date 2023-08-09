import { BasketDevice } from '@resources/basket-device/basket-device.entity'
import { Brand } from '@resources/brand/brand.entity'
import { DeviceInfo } from '@resources/device-info/device-info.entity'
import { Rating } from '@resources/rating/rating.entity'
import { Type } from '@resources/type/type.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Device {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => BasketDevice, basketDevice => basketDevice.device)
	basketDevice: BasketDevice

	@Column({ unique: true })
	name: string

	@Column()
	price: number

	@Column()
	img: string

	@Column({ default: 0 })
	rating: number

	@ManyToOne(() => Brand, brand => brand.devices)
	brand: Brand

	@ManyToOne(() => Type, type => type.devices)
	type: Type

	@OneToMany(() => Rating, rating => rating.device)
	ratings: Rating[]

	@OneToMany(() => DeviceInfo, deviceInfo => deviceInfo.device)
	deviceInfos: DeviceInfo[]
}
