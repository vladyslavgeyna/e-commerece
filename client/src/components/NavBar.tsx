import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuthResponse } from '../http/userAPI'
import { Context } from '../main'
import { IContext } from '../types/context.interface'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const NavBar = observer(() => {
	const { user } = useContext<IContext>(Context)
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser({} as UserAuthResponse)
		user.setIsAuth(false)
		localStorage.removeItem('token')
	}

	return (
		<Navbar bg='dark' data-bs-theme='dark'>
			<Container>
				<NavLink className='h4' to={SHOP_ROUTE}>
					e-commerce
				</NavLink>
				<Nav className='ml-auto gap-3'>
					{user.isAuth ? (
						<>
							{user.user.role === 'admin' && (
								<Button
									onClick={() => navigate(ADMIN_ROUTE)}
									variant={'outline-light'}>
									Dashboard
								</Button>
							)}
							<Button
								onClick={() => logOut()}
								variant={'outline-light'}>
								Sign out
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={() => navigate(LOGIN_ROUTE)}
								variant={'outline-light'}>
								Sign in
							</Button>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	)
})

export default NavBar
