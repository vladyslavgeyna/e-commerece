import { Basket } from '@resources/basket/basket.entity'
import { Device } from '@resources/device/device.entity'
import {
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class BasketDevice {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Basket, basket => basket.basketDevices)
	basket: Basket

	@OneToOne(() => Device, device => device.basketDevice)
	@JoinColumn()
	device: Device
}
