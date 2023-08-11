import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Context } from '../../main'
import './TypeBar.module.scss'
import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
	const { device } = useContext(Context)

	return (
		<ListGroup style={{ border: 'none' }}>
			{device.types.map(type => (
				<ListGroup.Item
					variant='light'
					active={type.id === device.selectedType.id}
					className={styles.item}
					key={type.id}
					style={{ border: 'none' }}
					onClick={() => device.setSelectedType(type)}>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})

export default TypeBar
