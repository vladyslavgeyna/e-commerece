import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { getBrands } from '../../http/brandAPI'
import { createDevice } from '../../http/deviceAPI'
import { getTypes } from '../../http/typeAPI'
import { Context } from '../../main'
import { IInfo } from '../../types/info.interface'

const CreateDevice: FC<{ show: boolean; onHide: () => void }> = observer(
	({ show, onHide }) => {
		const { device } = useContext(Context)
		const [info, setInfo] = useState<IInfo[]>([] as IInfo[])
		const [name, setName] = useState('')
		const [price, setPrice] = useState(0)
		const [file, setFile] = useState<File | null>(null)

		useEffect(() => {
			getTypes().then(data => device.setTypes(data))
			getBrands().then(data => device.setBrands(data))
		}, [])

		const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				setFile(e.target.files[0])
			}
		}

		const addInfo = () => {
			setInfo([...info, { id: Date.now(), title: '', description: '' }])
		}

		const removeInfo = (id: number) => {
			setInfo(info.filter(i => i.id !== id))
		}

		const changeInfo = (id: number, key: string, value: string) => {
			setInfo(info.map(i => (i.id === id ? { ...i, [key]: value } : i)))
		}

		const addDevice = () => {
			const formData = new FormData()
			formData.append('name', name)
			formData.append('price', price.toString())
			formData.append('info', JSON.stringify(info))
			formData.append('img', file as File)
			formData.append('brandId', device.selectedBrand.id.toString())
			formData.append('typeId', device.selectedType.id.toString())
			createDevice(formData).then(() => onHide())
		}

		return (
			<Modal show={show} size='lg' centered>
				<Modal.Header
					style={{ border: 'none' }}
					className='bg-dark'
					onClick={onHide}
					closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Add device
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ border: 'none' }} className='bg-dark'>
					<Form>
						<Dropdown>
							<Dropdown.Toggle variant='outline-light'>
								{device.selectedType.name || 'Choose type'}
							</Dropdown.Toggle>
							<Dropdown.Menu variant='outline-light'>
								{device.types.map(type => (
									<Dropdown.Item
										onClick={() =>
											device.setSelectedType(type)
										}
										key={type.id}>
										{type.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown className='mt-3'>
							<Dropdown.Toggle variant='outline-light'>
								{device.selectedBrand.name || 'Choose brand'}
							</Dropdown.Toggle>
							<Dropdown.Menu variant='outline-light'>
								{device.brands.map(brand => (
									<Dropdown.Item
										onClick={() =>
											device.setSelectedBrand(brand)
										}
										key={brand.id}>
										{brand.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Form.Control
							value={name}
							onChange={e => setName(e.target.value)}
							className='mt-3'
							placeholder='Enter name of device'
						/>
						<Form.Control
							value={price}
							onChange={e => setPrice(Number(e.target.value))}
							type='number'
							className='mt-3'
							placeholder='Enter price of device'
						/>
						<Form.Control
							onChange={selectFile}
							type='file'
							className='mt-3'
						/>
						<Button
							className='mt-3'
							variant='outline-light'
							onClick={addInfo}>
							Add new property
						</Button>
						{info.map(i => (
							<Row className='mt-2' key={i.id}>
								<Col md={4}>
									<Form.Control
										value={i.title}
										onChange={e =>
											changeInfo(
												i.id,
												'title',
												e.target.value
											)
										}
										placeholder='Enter name of property'
									/>
								</Col>
								<Col md={4}>
									<Form.Control
										value={i.description}
										onChange={e =>
											changeInfo(
												i.id,
												'description',
												e.target.value
											)
										}
										placeholder='Enter description of property'
									/>
								</Col>
								<Col md={4}>
									<Button
										onClick={() => removeInfo(i.id)}
										variant='outline-danger'>
										Delete
									</Button>
								</Col>
							</Row>
						))}
					</Form>
				</Modal.Body>
				<Modal.Footer style={{ border: 'none' }} className='bg-dark'>
					<Button variant='outline-danger' onClick={onHide}>
						Close
					</Button>
					<Button variant='outline-light' onClick={addDevice}>
						Create device
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
)

export default CreateDevice
