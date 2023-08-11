import jwtDecode from 'jwt-decode'
import { $authHost, $host } from './index'

interface AuthResponse {
	token: string
}

export interface UserAuthResponse {
	email: string
	role: string
	id: number
}

export const register = async (email: string, password: string) => {
	const { data } = await $host.post<AuthResponse>('/api/user/register', {
		email,
		password
	})
	localStorage.setItem('token', data.token)
	return jwtDecode<UserAuthResponse>(data.token)
}

export const login = async (email: string, password: string) => {
	const { data } = await $host.post<AuthResponse>('/api/user/login', {
		email,
		password
	})
	localStorage.setItem('token', data.token)
	return jwtDecode<UserAuthResponse>(data.token)
}

export const check = async () => {
	const { data } = await $authHost.get<AuthResponse>('/api/user/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode<UserAuthResponse>(data.token)
}
