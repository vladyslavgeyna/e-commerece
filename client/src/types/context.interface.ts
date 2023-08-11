import DeviceStore from '../store/DeviceStore'
import UserStore from '../store/UserStore'

export interface IContext {
	user: UserStore
	device: DeviceStore
}
