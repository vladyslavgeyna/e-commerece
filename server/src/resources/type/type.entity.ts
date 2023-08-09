import { Brand } from '@resources/brand/brand.entity'
import { Device } from '@resources/device/device.entity'
import {
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Type {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToMany(() => Device, device => device.type)
	devices: Device[]

	@ManyToMany(() => Brand, brand => brand.types)
	brands: Brand[]
}
