import React, {useState, useEffect} from "react";
import EditAccountAddress from "./EditAccountAddress";
import Typography from '@material-ui/core/Typography';
import useUser from "../../lib/useUser";
import axios from "axios";

/*
* AccountAddress Component that fetched all addresses of a user.
* Uses the useUser library to fetch data by userId.
* Fetches data through the /api/address/{id} endpoint.
* Maps the data to a new EditAccountAddress Component that will display the data.
* Handles absence of data: if user does not have any addresses, a message will be displayed instead of the EditAccountAddress Component.
*/
const edit_account =() =>{
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState (false);

    
    const { user} = useUser({ redirectTo: "/account" });
    
    useEffect(() => {
        if (!user) {
            return <h1>Loading</h1>
          }
            const id = user.id
            async function fetchAccountAddress() {
            const response = await axios.get(`/api/address/${id}`);
      
            if (response.status === 200) {
              setData(response.data.payload);
              setIsLoading(true)
              //console.log(response.data.payload)
            }
          }
          fetchAccountAddress()
      },[user]);

      const displayAccountAddress = () => {
        if(data.length == 0){
          return(
            <div>
              <Typography component="h1" variant="h6" align='center'>
              No addresses were found for this account.<br></br> If you wish to add an address, you can do so when purchasing an item.
				    </Typography>
            </div>
          )
        }else {
        return data.map((details,i) => (<EditAccountAddress key={i} details={details}/>))
        }
    }

    return(
            <div >
            <Typography component="h1" variant="h4" align='center'>
            You can edit your addresses details here
				</Typography>
            {isLoading ? displayAccountAddress() : <p></p>}
   
            
            </div>
    )
}

export default edit_account;