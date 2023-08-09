import { Basket } from '@resources/basket/basket.entity'
import { Rating } from '@resources/rating/rating.entity'
import UserRole from '@utils/enums/user-role'
import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@OneToOne(() => Basket, basket => basket.user)
	basket: Basket

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER
	})
	role: UserRole

	@OneToMany(() => Rating, rating => rating.user)
	ratings: Rating[]
}
