import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { useContext } from 'react'
import { CartContext } from '../CartProvider'

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const Review = ({ activeState, products, items }) => {
    const classes = useStyles()

    const findProduct = (id) => products.find((p) => p.id === id)

    let totalPrice = 0

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {_.map(items, ({ id, amount }) => {
                    const product = findProduct(id)
                    let finalPrice = amount * product.product_price
                    totalPrice += parseInt(finalPrice)

                    return (
                        <ListItem className={classes.listItem} key={id}>
                            <ListItemText primary={`${product.product_name} x ${amount}`} secondary={`Price per unit: ${product.product_price} RON`} />
                            <Typography variant="body2">Total per unit: {finalPrice} RON</Typography>
                        </ListItem>
                    )
                })}

                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {totalPrice} RON
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{activeState.name}</Typography>
                    <Typography gutterBottom>{activeState.email}</Typography>
                    <Typography gutterBottom>
                        {activeState.address1}
                        {activeState.address2 ? `, ${activeState.address2}` : null}
                        {activeState.zip ? `, ${activeState.zip}` : null}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment Method
                    </Typography>

                    <Typography gutterBottom>{activeState.payment}</Typography>
                    <Typography gutterBottom>
                        {activeState.payment === 'Online Payment' ? 'You will be redirected to the payment page. When payinh, DO NOT refresh or close the page.' : 'You will pay cash on delivery.'}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default Review