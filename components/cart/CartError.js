import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Grid, CssBaseline, Paper, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    main: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(10),
        minHeight: '60vh'
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    errorGrid: {
        color: 'red',
        marginTop: theme.spacing(4)
    },
    errorContainer: {
        marginTop: theme.spacing(5)
    },
    errorButton: {
        marginTop: theme.spacing(6)
    },
    imageContainer: {
        marginTop: theme.spacing(5)
    }
}))

const CartError = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline />

            <Container component="main" className={classes.main} maxWidth="sm">
                <Paper className={classes.paper} variant="outlined">
                    <Typography component="h1" variant="h3" align="center">
                        Checkout
                    </Typography>

                    <Container className={classes.errorContainer}>
                        <Typography component="h2" variant="h5">Your cart is empty. Please return to the store and fill it in before attempting to checkout.</Typography>

                        <Link href="/" >
                            <Button className={classes.errorButton} fullWidth variant="outlined">Return to Shop</Button>
                        </Link>

                        <Grid container className={classes.imageContainer}>
                            <Grid item xs={12}>
                                <img style={{ width: '100%' }} src="https://static.vecteezy.com/system/resources/previews/001/195/311/original/bubbles-speech-oops-png.png" />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default CartError