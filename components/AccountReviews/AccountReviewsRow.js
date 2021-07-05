import React, {useState, useEffect} from "react"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import ReviewImage from "./ReviewImage";

/*
* AccountReviewsRow Component that displayes the details of a review by user.
* Accepts props from the review_history Component within pages.
* On rendering, fetches one image associated with the product that the review is associated with.
* Maps the details of the image to a new Component: ReviewImage that will handle the display of the review image.
*/

const useStyles = makeStyles(() => ({
    container: {
        minHeight: '350px',
        marginTop: '1em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        border: 'thin',
        boxShadow: '0 0  15px #cccccc',
        '@media(max-width: 570px)' : {
        justifyContent: 'center',
        flexWrap: 'wrap',
          },
    },
    img_container: {
        height:'350px',
        minHeight:'100%',
        width: '50%',
        minWidth: '50%',
    },
  }));

export default function AccountReviewsRow({details}) {
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState (false);


    useEffect(() => {
        async function fetchProductImage() {
            const response = await axios.get(`/api/products/image/${details.product_id}`);
      
            if (response.status === 200) {
              setData(response.data.payload);
              setIsLoading(true)
              //console.log(response.data.payload)
            }
          }
          fetchProductImage()
      },[]);

      const displayReviewImage = () => {
        return data.map((details,i) => (<ReviewImage key={i} details={details}/>))
    }

    return (
        <div className={classes.container}>
            <div className={classes.img_container}>
            {isLoading ? displayReviewImage() : <p></p>} </div>
            <div className={classes.details_container}> 
                <p><b>Product name:{' '}</b>{details.product_name}</p>
                <p><b>Product category:{' '}</b>{details.product_category}</p>
                <p><b>Rating:{' '}</b>{details.rating}</p>
                <p><b>Review:{' '}</b>{details.message}</p>
            </div>
            
        </div>
      );

}