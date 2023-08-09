import { BasketDevice } from '@resources/basket-device/basket-device.entity'
import { User } from '@resources/user/user.entity'
import {
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Basket {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => User, user => user.basket)
	@JoinColumn()
	user: User

	@OneToMany(() => BasketDevice, basketDevice => basketDevice.basket)
	basketDevices: BasketDevice[]
}
