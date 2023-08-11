import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../main'

const Pages = observer(() => {
	const { device } = useContext(Context)
	const pageCount = Math.ceil(device.totalCount / device.limit)
	const pages: number[] = []

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}

	return (
		<Pagination className='mt-5'>
			{pages.map(page => (
				<Pagination.Item
					onClick={() => device.setPage(page)}
					key={page}
					active={device.page === page}>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	)
})

export default Pages
