import { FC, PropsWithChildren } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import styles from './layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<NavBar />
			<main
				style={{
					flex: '1 1 auto'
				}}
				className='py-3 container'>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default Layout
