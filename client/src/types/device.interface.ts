import { IInfo } from './info.interface'

export interface IDevice {
	id: number
	name: string
	price: number
	rating: number
	img: string
	deviceInfos: IInfo[]
}
