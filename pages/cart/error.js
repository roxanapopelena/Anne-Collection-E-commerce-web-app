import * as React from 'react'
import { Typography, CssBaseline, Paper, Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
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
    confirmation: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(4)
    },
    buttonsContainer: {
        marginTop: theme.spacing(6)
    }
}))

const SuccessPage = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline />

            <Container component="main" className={classes.main} maxWidth="sm">
                <Paper className={classes.paper} variant="outlined">
                    <Typography component="h1" variant="h2" align="center">
                        Error!
                    </Typography>

                    <Container component={Paper} elevation={15} className={classes.confirmation}>
                        <Typography component="h4" variant="h4">Something went wrong with the payment. Please try again later or call us regarding your order.</Typography>
                    </Container>

                    <Container className={classes.buttonsContainer}>
                        <Link href="/">
                            <Button
                                variant="contained"
                                className={classes.button}
                            >
                                Return Home
                            </Button>
                        </Link>
                    </Container>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default SuccessPage