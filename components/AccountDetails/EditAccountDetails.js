import React, {useState} from "react"
import Expire from "./Expire";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import axios from 'axios'

/*
* EditAccountDetails Component that enables the user to edit name and email.
* Accepts props from the edit_account Component within pages.
* Implements form vlidation on all fields.
* Updates database through the PUT /api/user/edit endpoint that accepts a body with user details.
* Implements 'edit' and 'save' buttons accordingly.
*/

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        padding: '10px',
    },
    container: {
        //background:'blue',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
        padding: '5px',
    },
    button: {
		marginTop:'10px',
    },
    form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
  }));

export default function EditAccountDetails({details}) {
    const classes = useStyles();

    const [name,setName] = useState(details.name);
    const [email,setEmail] = useState(details.email);
    const [nameHelper, setNameHelper] = useState(' ');
    const [emailHelper, setEmailHelper] = useState(' ');
    const [errorMsg, setErrorMsg] = useState("");
    const [edit,setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    }
    const actionEditAccount = async (e) => {
		e.preventDefault()

		const body = {
            id: details.id,
			user_name: name,
			user_email: email,
		}

		// if (no errors) =>
		const response = await axios.put('/api/user/edit', body)
		if(response.data.status == 200) {
            toggleEdit(),
			setErrorMsg(response.data.payload)
		} else {
			setErrorMsg('Something went wrong, try again.')
		}
	}
    
	const valueChangeHandler = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'name': {
                setName(value);
                if (name.length < 5) {
                    setNameHelper('First name must be at least 5 characters long');
                } else {
                    setNameHelper(' ');
                }
                break;
            }
            case 'email': {
                setEmail(value);
                const valid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value);
                if (!valid) {
                    setEmailHelper('Invalid Email. Format must be like :abcd@hotmail.com');
                } else {
                    setEmailHelper(' ');
                }
                break;
            }
            default:
                break;
        }
    }

    
	const getEditButton =() => {
		return (
			<Button 
                    className={classes.button}
                    variant="contained" 
                    color="secondary" 
                    onClick={toggleEdit}
                    startIcon={<EditIcon/>}>Edit</Button>
		)
	}

    const getSaveButton =() => {
		return (
			<Button 
                    className={classes.button}
                    variant="contained" 
                    color="secondary" 
                    onClick={actionEditAccount}
                    disabled={nameHelper.length > 1 || emailHelper.length > 1 || name.length == 0}
                    startIcon={<SaveIcon/>}>Save</Button>
		)
	}


  return (
    <Container  className={classes.root}>
        <CssBaseline />
           <form className={classes.root} noValidate autoComplete="off" >
           <Grid container spacing={2} className={classes.container} >
           <Grid item xs={12} sm={6}>
            <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined" 
                    type="name"
                    name="name"
                    defaultValue={details.name}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={nameHelper}
					error={nameHelper.trim().length !== 0 || name.length == 0}
                    ></TextField>
                    </Grid>
            <Grid item xs={12} sm={6}>
            <TextField  
                    fullWidth
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    type="email"
                    name="email"
                    defaultValue={details.email}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={emailHelper}
					error={emailHelper.trim().length !== 0}
                    ></TextField>
                    </Grid>
                    </Grid>
                    {errorMsg.length>0 && <Expire delay="5000">{errorMsg}</Expire>  }
                    {edit? getSaveButton() : getEditButton()}
                    </form>  
    </Container>
  );
};



