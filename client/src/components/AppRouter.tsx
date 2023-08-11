import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserAuthResponse, check } from '../http/userAPI'
import { Context } from '../main'
import { adminRoutes, authRoutes, publicRoutes } from '../routes'
import { IContext } from '../types/context.interface'
import Layout from './layout/Layout'

const AppRouter = observer(() => {
	const { user } = useContext<IContext>(Context)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		check()
			.then(data => {
				user.setUser(data)
				user.setIsAuth(true)
			})
			.catch(() => {
				user.setUser({} as UserAuthResponse)
				user.setIsAuth(false)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <Spinner animation='grow' />
	}

	const routes = (
		<Routes>
			{user.isAuth &&
				authRoutes.map(route => (
					<Route
						key={route.path}
						element={<route.component />}
						path={route.path}
					/>
				))}
			{user.user.role === 'admin' &&
				adminRoutes.map(route => (
					<Route
						key={route.path}
						element={<route.component />}
						path={route.path}
					/>
				))}

			{publicRoutes.map(route => (
				<Route
					key={route.path}
					element={<route.component />}
					path={route.path}
				/>
			))}
			<Route element={<div>Not found</div>} path='*' />
		</Routes>
	)

	return (
		<BrowserRouter>
			<Layout>{routes}</Layout>
		</BrowserRouter>
	)
})

export default AppRouter
