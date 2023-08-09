import { Device } from '@resources/device/device.entity'
import { User } from '@resources/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rate: number

	@ManyToOne(() => User, user => user.ratings)
	user: User

	@ManyToOne(() => Device, device => device.ratings)
	device: Device
}
