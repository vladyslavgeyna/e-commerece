import brandRouter from '@resources/brand/brand.router'
import deviceRouter from '@resources/device/device.router'
import typeRouter from '@resources/type/type.router'
import userRouter from '@resources/user/user.router'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { AppDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'

class App {
	private port: number
	private app: Application
	private URI_PREFIX = 'api'

	constructor(port: number) {
		this.app = express()
		this.port = port
		this.initializeMiddlewares()
		this.initializeRoutes()
		this.initializeErrorHandling()
	}

	private initializeRoutes() {
		this.app.use(this.getRouteUri('type'), typeRouter)
		this.app.use(this.getRouteUri('brand'), brandRouter)
		this.app.use(this.getRouteUri('device'), deviceRouter)
		this.app.use(this.getRouteUri('user'), userRouter)
	}

	private getRouteUri(resourceName: string) {
		return `/${this.URI_PREFIX}/${resourceName}`
	}

	private initializeMiddlewares() {
		this.app.use(express.static(path.join(__dirname, '../public')))
		this.app.use(cookieParser())
		this.app.use(express.json())
		this.app.use(fileUpload({}))
		this.app.use(cors())
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware)
	}

	public async start() {
		try {
			await AppDataSource.initialize()
			this.app.listen(this.port, () =>
				console.log(`SERVER STARTED ON PORT ${this.port}`)
			)
		} catch (error) {
			console.log(error)
		}
	}
}

export default App
