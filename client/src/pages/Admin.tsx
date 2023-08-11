import { useState } from 'react'
import { Button } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
	const [isBrandVisible, setIsBrandVisible] = useState(false)
	const [isTypeVisible, setIsTypeVisible] = useState(false)
	const [isDeviceVisible, setIsDeviceVisible] = useState(false)

	return (
		<div className='d-flex flex-column gap-3'>
			<Button
				onClick={() => setIsTypeVisible(true)}
				className='p-2'
				variant='outline-light'>
				Add type
			</Button>
			<Button
				onClick={() => setIsBrandVisible(true)}
				className='p-2'
				variant='outline-light'>
				Add brand
			</Button>
			<Button
				onClick={() => setIsDeviceVisible(true)}
				className='p-2'
				variant='outline-light'>
				Add device
			</Button>
			<CreateBrand
				show={isBrandVisible}
				onHide={() => setIsBrandVisible(false)}
			/>
			<CreateDevice
				show={isDeviceVisible}
				onHide={() => setIsDeviceVisible(false)}
			/>
			<CreateType
				show={isTypeVisible}
				onHide={() => setIsTypeVisible(false)}
			/>
		</div>
	)
}

export default Admin
