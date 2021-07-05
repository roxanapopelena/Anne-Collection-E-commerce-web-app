import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AddressForm from './AddressForm'
import Review from './Review'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { getProductsTotalCount } from '../CartProvider'
import { CartContext } from '../CartProvider'
import CartError from '../CartError'
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from 'next/router'
import axios from 'axios'
import Loader from '../../Loader'
import _ from 'lodash'

// public test key as per Andrei Moldovan's Stripe Dashboard account.
const stripePromise = loadStripe('PUBLIC_KEY')

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
}))

const steps = ['Shipping address', 'Review your order']

const Final = () => {
    const classes = useStyles()
    const router = useRouter()

    const [activeStep, setActiveStep] = useState(0)
    const [error, setError] = useState('')
    const [paymentError, setPaymentError] = useState('')

    const { state: items } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    if (!getProductsTotalCount(items)) {
        return <CartError />
    }

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

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        county: '',
        zip: '',
        payment: 'Online Payment'
    })

    const handleNameChange = (e) => {
        setState((prevState) => ({ ...prevState, name: e.target.value }))
    }

    const handlePhoneChange = (e) => {
        setState((prevState) => ({ ...prevState, phone: e.target.value }))
    }

    const handleAddress1Change = (e) => {
        setState((prevState) => ({ ...prevState, address1: e.target.value }))
    }

    const handleAddress2Change = (e) => {
        setState((prevState) => ({ ...prevState, address2: e.target.value }))
    }

    const handleCityChange = (e) => {
        setState((prevState) => ({ ...prevState, city: e.target.value }))
    }

    const handleCountyChange = (e) => {
        setState((prevState) => ({ ...prevState, county: e.target.value }))
    }

    const handleZipChange = (e) => {
        setState((prevState) => ({ ...prevState, zip: e.target.value }))
    }

    const handlePaymentChange = (e) => {
        setState((prevState) => ({ ...prevState, payment: e.target.value }))
    }

    const handleEmailChange = (e) => {
        setState((prevState) => ({ ...prevState, email: e.target.value }))
    }

    const handleNext = () => {
        const { name, phone, address1, city, county, payment } = state

        if (name.length > 4 && phone.length > 8 && address1.length > 5 && city.length > 2 && county.length > 2) {
            if (payment === 'Online Payment' || payment === 'Cash on Delivery') {
                setError('')
                setActiveStep(activeStep + 1)
                return
            }
        }

        setError('Please check your form.')
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm
                    handleNameChange={handleNameChange}
                    handlePaymentChange={handlePaymentChange}
                    handlePhoneChange={handlePhoneChange}
                    handleAddress1Change={handleAddress1Change}
                    handleAddress2Change={handleAddress2Change}
                    handleCityChange={handleCityChange}
                    handleCountyChange={handleCountyChange}
                    handleZipChange={handleZipChange}
                    handleEmailChange={handleEmailChange}
                    activeState={state}
                />;
            case 1:
                return <Review activeState={state} setPaymentError={setPaymentError} products={products} items={items} />;
            default:
                throw new Error('Unknown step');
        }
    }

    if (paymentError) {
        return (
            <Typography style={{ color: 'red', marginTop: '4em' }} variant="h2" component="h2">Something went wrong with your payment. Please try again later.</Typography>
        )
    }

    const handleProximusPaymentClick = async (e) => {
        e.preventDefault()

        const findProduct = (id) => products.find((p) => p.id === id)
        const final_products = []

        _.map(items, ({ id, amount }) => {
            const product = findProduct(id)
            product.amount = amount

            final_products.push(product)
        })

        if (state.payment === 'Cash on Delivery') {
            try {
                const response = await axios.post(`/api/checkout/register-cash`, { state, final_products })

                if (response.status === 200 && response.data.status === 200) {
                    router.replace('/cart/success')
                } else {
                    router.replace('/cart/error')
                }
            } catch (error) {
                console.error(error)
            }
        } else if (state.payment === 'Online Payment') {
            const stripe = await stripePromise

            try {
                const response = await axios.post(`/api/checkout/create-session`, { state, final_products })

                if (response.status === 200) {
                    const session = response.data.payload

                    const result = await stripe.redirectToCheckout({ sessionId: session.id })

                    if (result.error) {
                        // `result.error.message` to show message
                        alert('Something went wrong, possibly because of a network error. Please try again later.')
                    }
                }
            } catch (error) {
                console.error(error)
                setPaymentError('Something went wrong. Please try again later.')
            }
        }
    }

    return loaded ? (
        <React.Fragment>
            <CssBaseline />

            <Container component="main" className={classes.main} maxWidth="sm">
                <Paper className={classes.paper} variant="outlined">
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        <React.Fragment>
                            {getStepContent(activeStep)}

                            <div className={classes.buttons}>
                                <Link href="/cart">
                                    <Button className={classes.button} variant="contained">Return to Cart</Button>
                                </Link>

                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}

                                {activeStep === steps.length - 1 ?
                                    <Button
                                        variant="contained"
                                        onClick={handleProximusPaymentClick}
                                        className={classes.button}
                                    >
                                        Place Order
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>}
                            </div>
                        </React.Fragment>
                    </React.Fragment>

                    <Grid container className={classes.errorGrid}>
                        <Grid item xs={12}>
                            {error ? <Typography component="p">{error}</Typography> : null}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </React.Fragment>
    ) : <Loader />
}

export default Final
