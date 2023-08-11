import { IDevice } from '../types/device.interface'
import { IType } from '../types/type.interface'
import { $authHost, $host } from './index'

export const createType = async (type: Omit<IType, 'id'>) => {
	const { data } = await $authHost.post<IDevice>('/api/type', type)
	return data
}

export const getTypes = async () => {
	const { data } = await $host.get<IType[]>('/api/type')
	return data
}
