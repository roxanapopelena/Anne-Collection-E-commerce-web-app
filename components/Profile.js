import React from "react";
import useUser from "../lib/useUser"
import { makeStyles } from '@material-ui/core/styles'
import fetchJson from "../lib/fetchJson"
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'


/*
* Profile component with buttons to all sub-pages/actions that a user can access.
* If user is not authenticated, they will be redirected to the sign in form.
*/
const useStyles = makeStyles((theme) => ({
    root: {
		height: 700,
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
    buttons: {
    width: '15em',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    padding:'5px',
    },
    button: {
    marginTop: '1em',
    },
  }));

export default function Profile() {
    const classes = useStyles();
    const { user, mutateUser } = useUser({ redirectTo: "/account" });
    const router = useRouter()

  const actionLogout = async (e) => {
    e.preventDefault()
    await mutateUser(fetchJson('/api/auth/logout'))
    router.replace('/account')
  }

  return (
    <React.Fragment>
    <div className={classes.root} style={{ height: '750px' }}>
  
    <h1 style={{ marginTop: '3em' }}> Hello, this is your profile page</h1>
    <p>You can choose to perform any of the actions from below.</p>
    <div className={classes.buttons}>

    <Button fullWidth href='/review_history' variant="contained" color="primary" className={classes.button}><b>Review History</b></Button> 
    <Button fullWidth href='/edit_account' variant="contained" color="primary" className={classes.button}><b>Edit Account Details</b></Button>
    <Button fullWidth href='/order_history' variant="contained" color="primary" className={classes.button}><b>Order History</b></Button>
    <Button fullWidth href='/payment_history' variant="contained" color="primary" className={classes.button}><b>Payment History</b></Button>
    <br></br>
    <Button fullWidth onClick={actionLogout} variant="contained" color="primary" className={classes.button}><b>Logout</b></Button>
    </div>
    </div>
    </React.Fragment>
  );
};



