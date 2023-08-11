import { makeAutoObservable } from 'mobx'
import { UserAuthResponse } from '../http/userAPI'

export default class UserStore {
	private _isAuth: boolean
	private _user: UserAuthResponse

	constructor() {
		this._isAuth = false
		this._user = {} as UserAuthResponse
		makeAutoObservable(this)
	}

	setIsAuth(bool: boolean) {
		this._isAuth = bool
	}

	setUser(user: UserAuthResponse) {
		this._user = user
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}
}
