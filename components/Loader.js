import { CircularProgress, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh'
    },
}))

const Loader = () => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Grid container style={{ marginTop: '10em' }}>
                <Grid item xs={12} style={{ display: 'flex', justify: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={100} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Loader