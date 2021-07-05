import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext, getProductsTotalCount } from '../../components/cart/CartProvider'
import _ from 'lodash'
import Loader from '../../components/Loader'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    TableContainer: {
        marginBottom: '4rem',
        marginTop: theme.spacing(4)
    },
    amountButton: {
        padding: 0,
        maxWidth: 40,
        minWidth: 30,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}))

function ccyFormat(num) {
    return `${num.toFixed(2)}`
}

const CartPage = () => {
    const { state: items } = useContext(CartContext)
    const { dispatch } = useContext(CartContext)

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    let totalPrice = 0
    let totalCount = getProductsTotalCount(items)
    const findProduct = (id) => products.find((p) => p.id === id)

    const classes = useStyles();

    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get(`/api/cart/get-all-products`)

            if (response.status === 200) {
                setProducts(response.data.payload)
                setLoaded(true)
            }
        }

        fetchProducts()
    }, [])

    const handleIncrementClick = (e, productId) => {
        e.preventDefault()

        return dispatch({ type: 'ADJUST_AMOUNT', payload: { productId, amount: 1 } })
    }

    const handleDecrementClick = (e, productId) => {
        e.preventDefault()

        return dispatch({ type: 'ADJUST_AMOUNT', payload: { productId, amount: -1 } })
    }

    const handleRemove = (e, productId) => {
        e.preventDefault()

        return dispatch({ type: 'REMOVE_PRODUCT', payload: { productId } })
    }

    return loaded ? (
        <div style={{ padding: '5rem' }}>
            <Typography component="h2" variant="h2">Shopping Cart</Typography>

            <TableContainer component={Paper} elevation={20} className={classes.TableContainer}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">RON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {_.map(items, ({ id, amount }) => {
                            if (id && amount) {
                                const product = findProduct(id)
                                let finalPrice = amount * product.product_price
                                totalPrice += parseInt(finalPrice)

                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            {product.product_name}
                                            <Button onClick={(e) => handleRemove(e, id)} className={classes.amountButton} variant="outlined">x</Button>
                                        </TableCell>

                                        <TableCell align="right">
                                            <Button onClick={(e) => handleDecrementClick(e, id)} className={classes.amountButton} variant="outlined">-</Button>
                                            {amount}
                                            <Button onClick={(e) => handleIncrementClick(e, id)} className={classes.amountButton} variant="outlined">+</Button>
                                        </TableCell>

                                        <TableCell align="right">{product.product_price}</TableCell>
                                        <TableCell align="right">{finalPrice}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}

                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(totalPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {totalCount !== 0 ?
                <Link href="/cart/checkout">
                    <Button variant="contained">Checkout</Button>
                </Link> : <Typography component="h4" variant="h4">Looks like your cart is empty. To proceed, select products from the store!</Typography>
            }
        </div>
    ) : <Loader />
}

export default CartPage