import 'express-serve-static-core'

// declare module 'express-serve-static-core' {
// 	export interface Request {
// 		user: any
// 	}
// }

declare module 'express-serve-static-core' {
	interface Request {
		user: {
			role: UserRole
			email: string
			id: number
		}
	}
}
