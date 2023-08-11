import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { UserAuthResponse, login, register } from '../http/userAPI'
import { Context } from '../main'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

const Auth = observer(() => {
	const location = useLocation()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { user } = useContext(Context)
	const navigate = useNavigate()

	const auth = async () => {
		try {
			let userResponse: UserAuthResponse
			if (isLogin) {
				userResponse = await login(email, password)
			} else {
				userResponse = await register(email, password)
			}
			user.setUser(userResponse)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (error: any) {
			alert(error.response.data.message)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: window.innerHeight - 54 - 176
			}}>
			<Card style={{ width: 600 }} className='bg-dark p-3'>
				<h2 className='m-auto'>
					{isLogin ? 'Authorization' : 'Registration'}
				</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Enter your email...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						type='password'
						className='mt-3'
						placeholder='Enter your password...'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div className='d-flex justify-content-between align-items-center  mt-3 '>
						{isLogin ? (
							<div>
								Don't have an account?
								<NavLink to={REGISTRATION_ROUTE}>
									{' '}
									Register
								</NavLink>
							</div>
						) : (
							<div>
								Already have account?
								<NavLink to={LOGIN_ROUTE}> Sign in</NavLink>
							</div>
						)}
						<div>
							<Button onClick={auth} variant={'outline-light'}>
								{isLogin ? 'Sign in' : 'Sign up'}
							</Button>
						</div>
					</div>
				</Form>
			</Card>
		</div>
	)
})

export default Auth
