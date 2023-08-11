import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../config'
import { getDevice } from '../http/deviceAPI'
import { IDevice } from '../types/device.interface'
import { IInfo } from '../types/info.interface'

const DevicePage = () => {
	const [device, setDevice] = useState<IDevice>({
		deviceInfos: [] as IInfo[]
	} as IDevice)
	const { id } = useParams()

	useEffect(() => {
		getDevice(Number(id)).then(data => setDevice(data))
	}, [])

	return (
		<div>
			<Row>
				<Col md={4}>
					<Image
						className='w-100 rounded'
						src={`${API_URL}/images/${device.img}`}
					/>
				</Col>
				<Col md={4}>
					<div className='d-flex flex-column align-items-center'>
						<h2>{device.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center fw-bold gap-2'
							style={{ fontSize: '75px', color: 'yellow' }}>
							{device.rating}
							<FontAwesomeIcon icon={faStar as IconProp} />
						</div>
					</div>
				</Col>
				<Col md={4}>
					<Card
						style={{ border: 'none' }}
						className='bg-dark d-flex flex-column align-items-center justify-content-around'>
						<h3 className='fw-bold h2' style={{ color: '#eee' }}>
							{device.price}
						</h3>
						<Button
							className='fw-bold mt-3'
							style={{ fontSize: '20px' }}
							variant='light'>
							Add to basket
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column p-4'>
				<h2 className='fw-bold mb-4'>Specifications</h2>
				{device.deviceInfos.map((info, index) => (
					<Row
						className='p-3 rounded'
						key={info.id}
						style={{
							backgroundColor:
								index % 2 === 0
									? 'rgb(23, 25, 27)'
									: 'transparent'
						}}>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</div>
	)
}

export default DevicePage
