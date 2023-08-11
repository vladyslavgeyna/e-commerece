import { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { createBrand } from '../../http/brandAPI'

const CreateBrand: FC<{ show: boolean; onHide: () => void }> = ({
	show,
	onHide
}) => {
	const [value, setValue] = useState('')

	const create = () => {
		createBrand({ name: value }).then(() => setValue(''))
		onHide()
	}

	return (
		<Modal show={show} size='lg' centered>
			<Modal.Header
				style={{ border: 'none' }}
				className='bg-dark'
				onClick={onHide}
				closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Add brand
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ border: 'none' }} className='bg-dark'>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter brand name'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer style={{ border: 'none' }} className='bg-dark'>
				<Button variant='outline-danger' onClick={onHide}>
					Close
				</Button>
				<Button variant='outline-light' onClick={create}>
					Create brand
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateBrand
