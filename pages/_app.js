import '../styles/globals.css'
//import '../styles/product.css'
//import '../components/FloatingActionButtons/FloatingActionButton.css'
import '../components/Footer/Footer.css'
import Layout from '../components/Layout'
import { Theme } from '../components/Theme'
import { ThemeProvider } from '@material-ui/styles'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import CartProvider from '../components/cart/CartProvider'

function MyApp({ Component, pageProps }) {
	return (
		<CartProvider>
			<ThemeProvider theme={Theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</CartProvider>
	)
}

Router.events.on('routeChangeStart', () => {
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => {
	NProgress.done()
})

export default MyApp
