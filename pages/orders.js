import * as React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Typography, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Loader from '../components/Loader'
import useUser from '../lib/useUser'
import _ from 'lodash'
import Error from 'next/error'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10)
    },
    tableRoot: {
        minWidth: 666
    },
}))

const Orders = () => {
    const classes = useStyles()
    const { user } = useUser({ redirectTo: '/account' })

    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get(`/api/orders/fetch-all-orders`)

                if (response.status === 200 && response.data.status === 200) {
                    setOrders(response.data.payload)
                    setLoaded(true)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchOrders()
    }, [])

    if (!loaded && !user) {
        return <Loader />
    }

    if (user && !user.isAdmin) {
        return <Error statusCode={403} />
    }

    const displayEntries = () => {
        return _.map(orders, (it) => {
            return (
                <TableRow key={it.id}>
                    <TableCell>{it.client_name}</TableCell>
                    <TableCell>{it.email}</TableCell>
                    <TableCell>{[it.address1, it.address2, it.city, it.county].join(', ')}</TableCell>
                    <TableCell>{it.phone}</TableCell>
                    <TableCell>{it.payment_method}</TableCell>
                    <TableCell>{it.order_status === 1 ? 'Fulfilled' : 'Pending'}</TableCell>
                    <TableCell>{it.date_time}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <React.Fragment className={classes.root}>
            <CssBaseline />

            <Container className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.tableRoot} aria-label="Orders Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Client Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Order Status</TableCell>
                                <TableCell>Date and Time</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {displayEntries()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    )
}

export default Orders