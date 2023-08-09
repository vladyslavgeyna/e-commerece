import HttpStatusCode from '@utils/enums/http-status-code'

class HttpError extends Error {
	public readonly status: number

	constructor(status: number, message: string) {
		super(message)
		this.status = status
	}

	static unauthorizedError() {
		return new HttpError(
			HttpStatusCode.UNAUTHORIZED_401,
			'User is not authorized'
		)
	}

	static badRequest(message: string) {
		return new HttpError(HttpStatusCode.BAD_REQUEST_400, message)
	}

	static notFound(message: string) {
		return new HttpError(HttpStatusCode.NOT_FOUND_404, message)
	}
}

export default HttpError
