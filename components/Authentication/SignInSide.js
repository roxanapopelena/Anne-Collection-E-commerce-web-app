import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useUser from '../../lib/useUser';
import fetchJson from "../../lib/fetchJson";

/*
* SignIn Component that implements the sign in functionality of the system through the use of a sign in form
* If user is authenticated, this page will automatically redirect them to the /profile page.
* If a user wants to create an account instead, a link to the /sign-up component is present under the sign in button.
* Implements the log in functionality though the POST /api/auth/login endpoint that accepts a body that contains a username and a password.
* Both fields are required.
* Implements error handling for incorrect username/password and displays approapriate message.
*/

const useStyles = makeStyles((theme) => ({
  root: {
    height: '84vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error:{
    color: 'red',
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const { mutateUser } = useUser({
		redirectTo: "/profile",
		redirectIfFound: true,
	});

	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value
		};

		
			const response = await mutateUser(
				fetchJson("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				}),
			);
      //console.log(response)
      if (response.isLoggedIn) {
        setLoading(true)
        }
        else {
          setErrorMsg("Invalid username or password");
        }
		
	}

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{ marginTop: '8.15em' }} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMsg.length>0 && <div className={classes.error}><b>{errorMsg}</b></div>  }
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="overline" color="textPrimary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            { loading ? <h1>Logging you in. Please hold.</h1> : null }
          </form>
        </div>
      </Grid>
    </Grid>
  );
}