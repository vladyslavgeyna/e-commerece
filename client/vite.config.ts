import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'process.env.REACT_APP_API_URL': `"${process.env.REACT_APP_API_URL}"`
	}
})
