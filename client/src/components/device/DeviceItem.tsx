import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config'
import { IDevice } from '../../types/device.interface'
import { DEVICE_ROUTE } from '../../utils/consts'
import styles from './DeviceItem.module.scss'

const DeviceItem: FC<{ device: IDevice }> = ({ device }) => {
	const navigate = useNavigate()

	return (
		<Col
			className={styles.col}
			md={3}
			onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
			<Card border='light' className={styles.card}>
				<Image
					className={styles.image}
					src={`${API_URL}/images/${device.img}`}
				/>
				<div className='d-flex align-items-center justify-content-between'>
					<h5 className={styles.text}>APPLE</h5>
					<div className='d-flex align-items-center gap-1'>
						<div className={styles.text}>{device.rating}</div>
						<FontAwesomeIcon icon={faStar as IconProp} />
					</div>
				</div>
				<div className={styles.text}>{device.name}</div>
			</Card>
		</Col>
	)
}

export default DeviceItem
