import React, { useContext, useState, useEffect } from 'react'
import Fab from '@material-ui/core/Fab'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import { makeStyles } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Link from 'next/link'
import { CartContext, validateProductsInState } from '../cart/CartProvider'
import { getProductsTotalCount } from '../cart/CartProvider'
import CloseIcon from '@material-ui/icons/Close'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import _ from 'lodash'
import { ListItem, ListItemText, List } from '@material-ui/core'
import Loader from '../../components/Loader'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		zIndex: 1,
		position: 'fixed',
		top: '60%',
		padding: 10,
		right: 1,
	},
	fa_icon: {
		padding: 3
	},
	icon_container: {
		fontSize: '2rem',
		color: '#fff',
		marginTop: 8
	},
	fabColor2: {
		position: 'flex',
		backgroundColor: '#f1d4ff',
		'&:hover': {
			backgroundColor: '#ecc4ff',
			filter: 'luminosity(115%)'
		}
	},
	fabColor1: {
		position: 'flex',
		'&:hover': {
			backgroundColor: '#fde8ff'
		}
	},
	shoppingCartButton: {
		position: 'flex',
		backgroundColor: 'gold',
		'&:hover': {
			backgroundColor: 'black',
			color: 'white'
		},
		zIndex: 10
	},
	cartCount: {
		position: 'absolute',
		top: 0,
		right: 10,
		backgroundColor: '#000',
		color: '#fff',
		padding: '4px 10px',
		zIndex: 12,
		fontSize: 17,
		borderRadius: 60
	},
	drawerContainer: {
		padding: theme.spacing(5)
	},
	closeIcon: {
		cursor: 'pointer'
	},
	amountButton: {
		padding: 0,
		maxWidth: 40,
		minWidth: 30,
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2)
	}
}))

export default function FloatingActionButtons() {
	const classes = useStyles()
	const router = useRouter()

	const { state: items } = useContext(CartContext)
	const { dispatch } = useContext(CartContext)

	const [products, setProducts] = useState([])
	const [loaded, setLoaded] = useState(false)
	const [open, setOpen] = useState(false)

	let totalCount = getProductsTotalCount(items)

	useEffect(() => {
		async function fetchProducts() {
			if (!router.isReady) {
				return
			}

			const response = await axios.get(`/api/cart/get-all-products`)

			if (response.status === 200) {
				setProducts(response.data.payload)
				setLoaded(true)
			}
		}

		fetchProducts()
	}, [router.isReady])

	const findProduct = (id) => products.find((p) => p.id === id)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleRemove = (e, id) => {
		e.preventDefault()

		return dispatch({ type: 'REMOVE_PRODUCT', payload: { productId: id } })
	}

	const handleDecrement = (e, productId) => {
		e.preventDefault()

		return dispatch({ type: 'ADJUST_AMOUNT', payload: { productId, amount: -1 } })
	}

	const handleIncrement = (e, productId) => {
		e.preventDefault()

		return dispatch({ type: 'ADJUST_AMOUNT', payload: { productId, amount: 1 } })
	}

	const showProducts = () => {
		try {
			if (totalCount) {
				return _.map(items, ({ id, amount }) => {
					if (id && amount) {
						const product = findProduct(id)

						return (
							<ListItem key={id}>
								<Button onClick={(e) => handleDecrement(e, id)} className={classes.amountButton} variant="contained">-</Button>
								<ListItemText primary={`${product.product_name} x ${amount}`} secondary={`${product.product_price} Lei`} />
								<Button onClick={(e) => handleIncrement(e, id)} className={classes.amountButton} variant="contained">+</Button>

								<Button onClick={(e) => handleRemove(e, id)} variant="contained">Remove</Button>
							</ListItem>
						)
					}
				})
			}
		} catch (error) {
			dispatch({ type: 'RESET_CART' })
			router.reload()

			return null
		}
	}

	if (!totalCount) {
		totalCount = 0
	}

	return (
		<div className={classes.root}>
			{/*(router.pathname !== '/cart' && router.pathname !== '/cart/checkout') &&*/
				<div className={classes.icon_container}>
					<span className={classes.cartCount}>{totalCount}</span>

					<Button onClick={handleDrawerOpen} className={classes.shoppingCartButton}>
						<ShoppingCartIcon />
					</Button>
				</div>
			}
			<div className={classes.icon_container}>
				<Fab className={classes.fabColor2} aria-label="facebook" href="#" target="_blank" rel='noopener noreferrer'>
					<FacebookIcon />
				</Fab>
			</div>
			<div className={classes.icon_container}>
				<Fab className={classes.fabColor2} aria-label="instagram" href="https://www.instagram.com/ane.collections/" target="_blank" rel='noopener noreferrer'>
					<InstagramIcon />
				</Fab>
			</div>

			<Drawer
				{...{
					anchor: 'right',
					open: open,
					onClose: handleDrawerClose,
				}}
			>
				<div className={classes.drawerContainer}>
					<CloseIcon className={classes.closeIcon} onClick={handleDrawerClose} />

					<Typography variant="h5" component="h5">Shopping Cart</Typography>

					<List>
						{loaded ? showProducts() : <Loader />}
						{!totalCount ? <Typography component="h6" variant="h6">No products added.</Typography> : null}
					</List>

					<Link href="/cart">
						<Button onClick={handleDrawerClose} variant="contained" color="primary">View Cart</Button>
					</Link>

				</div>
			</Drawer>
		</div>
	)
}