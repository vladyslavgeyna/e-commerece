import { AppDataSource } from '@/data-source'
import { Basket } from '@resources/basket/basket.entity'
import UserRole from '@utils/enums/user-role'
import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody } from '@utils/types/request.type'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from './user.entity'

class UserController {
	private userRepository
	private basketRepository

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
		this.basketRepository = AppDataSource.getRepository(Basket)
	}

	private generateJwt(id: number, email: string, role: UserRole) {
		return jwt.sign(
			{ id, email, role },
			String(process.env.JWT_ACCESS_SECRET),
			{ expiresIn: '24h' }
		)
	}

	register = async (
		req: RequestWithBody<{ email: string; password: string }>,
		res: Response,
		next: NextFunction
	) => {
		const { email, password } = req.body

		if (!email || !password) {
			return next(HttpError.badRequest('Invalid data'))
		}

		const candidate = await this.userRepository.findOneBy({ email })

		if (candidate) {
			return next(HttpError.badRequest('User already exists'))
		}

		const hashedPassword = await bcrypt.hash(password, 5)

		let role = UserRole.USER

		if (email.includes('admin')) {
			role = UserRole.ADMIN
		}

		const user = this.userRepository.create({
			email,
			password: hashedPassword,
			role
		})

		const newUser = await this.userRepository.save(user)

		const basket = this.basketRepository.create({
			user: { id: newUser.id }
		})

		const newBasket = await this.basketRepository.save(basket)

		const token = this.generateJwt(newUser.id, newUser.email, newUser.role)

		return res.json({ token })
	}

	login = async (
		req: RequestWithBody<{ email: string; password: string }>,
		res: Response,
		next: NextFunction
	) => {
		const user = await this.userRepository.findOneBy({
			email: req.body.email
		})

		if (!user) {
			return next(HttpError.badRequest('User not found'))
		}

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		)

		if (!isPasswordCorrect) {
			return next(HttpError.badRequest('Invalid password'))
		}

		const token = this.generateJwt(user.id, user.email, user.role)

		return res.json({ token })
	}

	check = async (req: Request, res: Response, next: NextFunction) => {
		const token = this.generateJwt(
			req.user.id,
			req.user.email,
			req.user.role
		)

		return res.json({ token })
	}
}

export default new UserController()
