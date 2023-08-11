import axios from 'axios'
import { API_URL } from './../../config'

export const $host = axios.create({
	baseURL: API_URL
})

export const $authHost = axios.create({
	baseURL: API_URL
})

$authHost.interceptors.request.use(config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})
