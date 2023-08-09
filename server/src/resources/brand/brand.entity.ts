import { Device } from '@resources/device/device.entity'
import { Type } from '@resources/type/type.entity'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Brand {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToMany(() => Device, device => device.brand)
	devices: Device[]

	@ManyToMany(() => Type, type => type.brands)
	@JoinColumn()
	types: Type[]
}
