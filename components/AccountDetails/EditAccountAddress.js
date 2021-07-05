import React, {useState} from "react"
import Expire from "./Expire";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios'

/*
* EditAccountAddress Component that enables the user to edit their already existing addresses.
* Accepts props from the AccountAddress Component.
* Implements form vlidation on all fields.
* Updates database through the PUT /api/address/edit endpoint that accepts a body with address details.
* Implements 'edit' and 'save' buttons accordingly.
*/

const useStyles = makeStyles((theme) => ({
    root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        padding: '10px',
    },
    container: { 
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
        padding: '5px',
    },
    button: {
		marginTop:'10px',
    },
  }));

export default function EditAccountDetails({details}) {
    const classes = useStyles();

    const [address1,setAddress1] = useState(details.address1);
    const [address2,setAddress2] = useState(details.address2);
    const [county,setCounty] = useState(details.county);
    const [city,setCity] = useState(details.city);
    const [postcode,setPostcode] = useState(details.postcode);

    const [address1Helper, setAddress1Helper] = useState(' ');
    const [address2Helper, setAddress2Helper] = useState(' ');
    const [countyHelper, setCountyHelper] = useState(' ');
    const [cityHelper, setCityHelper] = useState(' ');
    const [postcodeHelper, setPostcodeHelper] = useState(' ');

    const [errorMsg, setErrorMsg] = useState("");
    const [edit,setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    }
    
	const valueChangeHandler = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'address1': {
                setAddress1(value);
                if (address1.length < 3) {
                    setAddress1Helper('Address name must be at least 3 characters long');
                } else {
                    setAddress1Helper(' ');
                }
                break;
            }
            case 'address2': {
                setAddress2(value);
                if (address2.length < 3) {
                    setAddress2Helper('Address name must be at least 3 characters long');
                } else {
                    setAddress2Helper(' ');
                }
                break;
            }
            case 'city': {
                setCity(value);
                if (city.length < 3) {
                    setCityHelper('City name must be at least 3 characters long');
                } else {
                    setCityHelper(' ');
                }
                break;
            }
            case 'county': {
                setCounty(value);
                if (county.length < 3) {
                    setCountyHelper('County name must be at least 3 characters long');
                } else {
                    setCountyHelper(' ');
                }
                break;
            }
            case 'postcode': {
                setPostcode(value);
                if (postcode.length < 3) {
                    setPostcodeHelper('Postcode name must be at least 3 characters long');
                } else {
                    setPostcodeHelper(' ');
                }
                break;
            }
            default:
                break;
        }
    }

    
    const actionEditAccountAddress = async (e) => {
		e.preventDefault()

		const body = {
            id: details.user_id,
			user_address1: address1,
            user_address2: address2,
            user_city: city,
            user_county: county,
            user_postcode: postcode,
            address_id: details.id
		}

		// if (no errors) =>
		const response = await axios.put('/api/address/edit', body)
		if(response.data.status == 200) {
            toggleEdit(),
			setErrorMsg(response.data.payload)
		} else {
			setErrorMsg('Something went wrong, try again.')
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
                    onClick={actionEditAccountAddress}
                    disabled={
                        address1Helper.length > 1 || address1.length == 0 ||
                        address2Helper.length > 1 || address2.length == 0 ||
                        cityHelper.length > 1 || city.length == 0  ||
                        countyHelper.length > 1 || county.length == 0 ||
                        postcodeHelper > 1 || postcode.length == 0
                    }
                    startIcon={<SaveIcon/>}>Save</Button>
		)
	}


  return (
    <div>
        <div>
           <form className={classes.root} noValidate autoComplete="off">
           <Grid container spacing={2} className={classes.container}>
           
           <Grid item xs={12} sm={6}>
            <TextField 
                    autoComplete= "off"
                    fullWidth
                    id="outlined-basic" 
                    label="Address1" 
                    variant="outlined" 
                    name="address1"
                    defaultValue={details.address1}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={address1Helper}
					error={address1Helper.trim().length !== 0 || address1.length == 0}
                    ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                    <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Address2" 
                    variant="outlined" 
                    name="address2"
                    defaultValue={details.address2}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={address2Helper}
					error={address2Helper.trim().length !== 0 || address2.length == 0}
                    ></TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
                    <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="City" 
                    variant="outlined"
                    name="city"
                    defaultValue={details.city}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={cityHelper}
					error={cityHelper.trim().length !== 0 || city.length == 0}
                    ></TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
                    <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="County" 
                    variant="outlined"
                    name="county"
                    defaultValue={details.county}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={countyHelper}
					error={countyHelper.trim().length !== 0 || county.length == 0}
                    ></TextField>
                    </Grid>

            <Grid item xs={12} sm={4}>
                    <TextField 
                    fullWidth
                    id="outlined-basic" 
                    label="Postcode" 
                    variant="outlined"
                    name="postcode"
                    defaultValue={details.postcode}
                    onChange={valueChangeHandler}
                    disabled={!edit}
                    helperText={postcodeHelper}
					error={postcodeHelper.trim().length !== 0 || postcode.length == 0}
                    ></TextField>
                    </Grid>
                    </Grid>
                    {errorMsg.length>0 && <Expire delay="5000">{errorMsg}</Expire>  }
                    {edit? getSaveButton() : getEditButton()}
                    </form>
        </div>
    </div>
  );
};



