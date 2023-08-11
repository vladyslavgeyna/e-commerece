import { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { createType } from '../../http/typeAPI'

const CreateType: FC<{ show: boolean; onHide: () => void }> = ({
	show,
	onHide
}) => {
	const [value, setValue] = useState('')

	const create = () => {
		createType({ name: value }).then(() => setValue(''))
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
					Add type
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ border: 'none' }} className='bg-dark'>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Enter type name'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer style={{ border: 'none' }} className='bg-dark'>
				<Button variant='outline-danger' onClick={onHide}>
					Close
				</Button>
				<Button variant='outline-light' onClick={create}>
					Create type
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateType
