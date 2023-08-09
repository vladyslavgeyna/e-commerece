import { Device } from '@resources/device/device.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DeviceInfo {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@ManyToOne(() => Device, device => device.deviceInfos)
	device: Device
}
