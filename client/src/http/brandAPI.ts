import { IBrand } from '../types/brand.interface'
import { IType } from '../types/type.interface'
import { $authHost, $host } from './index'

export const createBrand = async (brand: Omit<IBrand, 'id'>) => {
	const { data } = await $authHost.post<IType>('/api/brand', brand)
	return data
}

export const getBrands = async () => {
	const { data } = await $host.get<IBrand[]>('/api/brand')
	return data
}
