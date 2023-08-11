import { makeAutoObservable } from 'mobx'
import { IBrand } from '../types/brand.interface'
import { IDevice } from '../types/device.interface'
import { IType } from '../types/type.interface'

export default class DeviceStore {
	private _types: IType[]
	private _brands: IBrand[]
	private _devices: IDevice[]
	private _selectedType: IType
	private _selectedBrand: IType
	private _page: number = 1
	private _totalCount: number = 0
	private _limit: number = 3

	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		makeAutoObservable(this)
		this._selectedType = {} as IType
		this._selectedBrand = {} as IBrand
	}

	setTypes(types: IType[]) {
		this._types = types
	}

	setBrands(brands: IBrand[]) {
		this._brands = brands
	}

	setDevices(devices: IDevice[]) {
		this._devices = devices
	}

	setSelectedType(type: IType) {
		this.setPage(1)
		this._selectedType = type
	}

	setSelectedBrand(brand: IBrand) {
		this.setPage(1)
		this._page = 1
		this._selectedBrand = brand
	}

	setPage(page: number) {
		this._page = page
	}

	setTotalCount(totalCount: number) {
		this._totalCount = totalCount
	}

	setLimit(limit: number) {
		this._limit = limit
	}

	get types() {
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get totalCount() {
		return this._totalCount
	}

	get page() {
		return this._page
	}

	get limit() {
		return this._limit
	}
}
