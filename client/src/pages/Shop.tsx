import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Pages from '../components/Pages'
import BrandBar from '../components/brandbar/BrandBar'
import DeviceList from '../components/device/DeviceList'
import TypeBar from '../components/typebar/TypeBar'
import { getBrands } from '../http/brandAPI'
import { getDevices } from '../http/deviceAPI'
import { getTypes } from '../http/typeAPI'
import { Context } from '../main'

const Shop = observer(() => {
	const { device } = useContext(Context)

	useEffect(() => {
		getTypes().then(data => device.setTypes(data))
		getBrands().then(data => device.setBrands(data))
		getDevices(null, null, 1, 2).then(data => {
			device.setDevices(data[0])
			device.setTotalCount(data[1])
		})
	}, [])

	useEffect(() => {
		getDevices(
			device.selectedType.id,
			device.selectedBrand.id,
			device.page,
			2
		).then(data => {
			device.setDevices(data[0])
			device.setTotalCount(data[1])
		})
	}, [device.page, device.selectedType, device.selectedBrand])

	return (
		<div>
			<Row>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</div>
	)
})

export default Shop
