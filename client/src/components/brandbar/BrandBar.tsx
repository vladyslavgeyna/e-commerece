import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { Context } from '../../main'
import styles from './BrandBar.module.scss'

const BrandBar = observer(() => {
	const { device } = useContext(Context)

	return (
		<div className='d-flex gap-3'>
			{device.brands.map(brand => (
				<Card
					style={{
						backgroundColor:
							brand.id === device.selectedBrand.id
								? 'rgb(73, 80, 87)'
								: 'rgb(23, 25, 27)'
					}}
					className={styles.item}
					key={brand.id}
					onClick={() => device.setSelectedBrand(brand)}>
					{brand.name}
				</Card>
			))}
		</div>
	)
})

export default BrandBar
