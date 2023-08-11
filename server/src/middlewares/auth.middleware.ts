import UserRole from '@utils/enums/user-role'
import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return next(HttpError.unauthorized())
		}

		const decodedData = jwt.verify(
			token,
			String(process.env.JWT_ACCESS_SECRET)
		) as { role: UserRole; email: string; id: number }

		req.user = decodedData

		next()
	} catch (error) {
		next(HttpError.unauthorized())
	}
}

export default authMiddleware
