import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.scss'
import AppRouter from './components/AppRouter'
import DeviceStore from './store/DeviceStore'
import UserStore from './store/UserStore'
import { IContext } from './types/context.interface'

export const Context = createContext<IContext>({} as IContext)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Context.Provider
			value={{
				user: new UserStore(),
				device: new DeviceStore()
			}}>
			<AppRouter />
		</Context.Provider>
	</React.StrictMode>
)
