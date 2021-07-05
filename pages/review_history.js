import React, {useState, useEffect} from "react";
import AccountReviewsRow from "../components/AccountReviews/AccountReviewsRow";
import useUser from "../lib/useUser";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/*
* review_history page that fetches the review details of a user by userId.
* fetched the id of the user using the useUser library.
* Maps details to the AccountReviewsRow Component that handles the display of data.
* If no data is available (user does not have any reviews), a message is displayed appropriately instead of the AccountReviewsRow Component
*/

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '750px',
		marginTop: theme.spacing(8),
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    },
    h1: {
      marginTop: '2em', 
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
        async function fetchAccountReviews() {
            const response = await axios.get(`/api/user_review/${id}`);
      
            if (response.status === 200) {
              setData(response.data.payload);
              setIsLoading(true)
              //console.log(response.data.payload.length)
            }
          }
          fetchAccountReviews()
      },[user]);

      const displayAccountReviews = () => {
        if(data.length == 0){
          return(
            <div>
               <Typography className={classes.h1} component="h1" variant="h6" align='center'>
               You do not currently have any reviews.<br></br> If you wish to submit a review, navigate to a product's page and fill out the review form details.
				    </Typography>
            </div>
          )
        }else {
          return data.map((details,i) => (<AccountReviewsRow key={i} details={details}/>))
      }
    }

    return(
        <div className={classes.root}>
          <Typography component="h1" variant="h4" align='center'>
          You take a look at all of your past reviews on this page.
				    </Typography>
            {isLoading ? displayAccountReviews() : <p></p>}
            
    </div>
    )
}

export default edit_account;