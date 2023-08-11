import { IDevice } from '../types/device.interface'
import { $authHost, $host } from './index'

export type GetDevicesResponse = [devices: IDevice[], allCount: number]

export const createDevice = async (device: FormData) => {
	const { data } = await $authHost.post<IDevice>('/api/device', device)
	return data
}

export const getDevices = async (
	typeId?: number | null,
	brandId?: number | null,
	page?: number | null,
	limit: number = 5
) => {
	const { data } = await $host.get<GetDevicesResponse>('/api/device', {
		params: {
			typeId,
			brandId,
			page,
			limit
		}
	})
	return data
}

export const getDevice = async (id: number) => {
	const { data } = await $host.get<IDevice>(`/api/device/${id}`)
	return data
}
