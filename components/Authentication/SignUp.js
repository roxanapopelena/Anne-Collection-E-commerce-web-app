import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

/*
* SignUp Component that implements the sign up functionality of the system through the use of a sign up form
* If a user wants to sign in instead, a link to the SignIn component is present under the sign up button.
* Implements the sign up functionality though the POST /api/auth/signup endpoint that accepts a body that contains a firstName, lastName, username, email, password.
* Form validation present for all fields.
* Implements error handling if the username or email are taken by another user and displays approapriate message.
* Sign up button is disabled if any of the fields are not valid or if they are empty.
*/

const useStyles = makeStyles((theme) => ({
	paper: {
		height: 700,
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error:{
	  color: 'red',
	},
}));



export default function SignUp() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [firstNameHelper, setFirstNameHelper] = useState('');
	const [lastNameHelper, setLastNameHelper] = useState('');
	const [usernameHelper, setUsernameHelper] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
	const [passwordHelper, setPasswordHelper] = useState('');
	const [errorMsg, setErrorMsg] = useState("");

	const actionSignup = async (e) => {
		e.preventDefault()

		const body = {
			firstName: e.currentTarget.firstName.value,
			lastName: e.currentTarget.lastName.value,
			username: e.currentTarget.username.value,
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value
		}

		// if (no errors) =>
		const response = await axios.post('/api/auth/signup', body)
		if(response.data.status == 200) {
			setErrorMsg('Successful! Please go to the login page!')
		} else {
			setErrorMsg(response.data.payload)
		}
	}

	const valueChangeHandler = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'firstName': {
                setFirstName(value);
                if (firstName.length < 3) {
                    setFirstNameHelper('First name must be at least 3 characters long');
                } else {
                    setFirstNameHelper('');
                }
                break;
            }
			case 'lastName': {
                setLastName(value);
                if (lastName.length < 3) {
                    setLastNameHelper('Last name must be at least 3 characters long');
                } else {
                    setLastNameHelper('');
                }
                break;
            }
			case 'username': {
                setUsername(value);
                if (username.length < 8) {
                    setUsernameHelper('Username must be at least 8 characters long');
                } else {
                    setUsernameHelper('');
                }
                break;
            }
            case 'email': {
                setEmail(value);
                const valid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value);
                if (!valid) {
                    setEmailHelper('Invalid Email. Format must be like :abcd@hotmail.com');
                } else {
                    setEmailHelper('');
                }
                break;
            }
            case 'password': {
                setPassword(event.target.value);
                if (password.length < 8) {
                    setPasswordHelper('Password must be at least 8 characters long');
                } else {
                    setPasswordHelper('');
                }
                break;
            }
            default:
                break;
        }
    }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper} style={{ marginTop: '8.15em' }}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{errorMsg.length>0 && <div className={classes.error}><b>{errorMsg}</b></div>  }
				<form className={classes.form} onSubmit={actionSignup} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								inputProps={{
									autoComplete: 'none',
								}}
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={valueChangeHandler}
								helperText={firstNameHelper}
								error={firstNameHelper.trim().length !== 0}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								inputProps={{
									autoComplete: 'none',
								}}
								onChange={valueChangeHandler}
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								helperText={lastNameHelper}
								error={lastNameHelper.trim().length !== 0}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								inputProps={{
									autoComplete: 'none',
								}}
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								onChange={valueChangeHandler}
								helperText={usernameHelper}
								error={usernameHelper.trim().length !== 0}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete= "off" 
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								onChange={valueChangeHandler}
								helperText={emailHelper}
								error={emailHelper.trim().length !== 0}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete= "off" 
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								id="password"
								onChange={valueChangeHandler}
								helperText={passwordHelper}
								error={passwordHelper.trim().length !== 0}
							/>
							<small>Password must be 8 characters long.</small>
						</Grid>
						<Grid item xs={12}>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={
							firstNameHelper.length !== 0 || firstName.length == 0 ||
							lastNameHelper.length !== 0 || lastName.length == 0 ||
							usernameHelper.length !== 0 || firstName.length == 0 ||
							emailHelper.length !== 0 ||  username.length == 0 ||
							passwordHelper.length !== 0 ||  password.length == 0
						}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/account" variant="overline" color="textPrimary">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}