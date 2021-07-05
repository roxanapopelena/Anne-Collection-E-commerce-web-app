import React, {useState, useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import useUser from "../lib/useUser";
import axios from "axios";
import EditAccountDetails from "../components/AccountDetails/EditAccountDetails";
import AccountAddress from "../components/AccountDetails/AccountAddress";
import { makeStyles } from '@material-ui/core/styles';

/*
* edit_account page that fetched the account datails (name and email) of a user using the useUser library.
* Maps details to the EditAccountDetails Component that displayed them appropriately.
* Calls the AcountAddress Component to be rendered within the edit_account page.
*/

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    minHeight: '750px',
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
    },
  }));


const edit_account =() =>{
    const classes = useStyles();

    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState (false);

    
    const { user} = useUser({ redirectTo: "/account" });
    
    useEffect(() => {
        if (!user) {
            return <h1>Loading</h1>
          }
          const id = user.id
        async function fetchAccountDetails() {
            const response = await axios.get(`/api/user/${id}`);
      
            if (response.status === 200) {
              setData(response.data.payload);
              setIsLoading(true)
              //console.log(response.data.payload)
            }
          }
          fetchAccountDetails()
      },[user]);

      const displayAccountDetails = () => {
          return data.map((details,i) => (<EditAccountDetails key={i} details={details}/>))
      }

    return(
            <div  className={classes.root}>
              <Typography component="h1" variant="h4" align='center'>
              You can edit your account details here
				    </Typography>
            {isLoading ? displayAccountDetails() : <p></p>}
            <AccountAddress/>
            
            </div>
    )
}

export default edit_account;