import React, {useState, useEffect} from "react";
import useUser from "../lib/useUser";
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

/*
* payment_history page that fetches the payment details of a user by userId.
* Fetched the id of the user using the useUser library.
* Display details in the form of a table.
* Table contains a caption to make it accessible.
* If no data is available (user does not have any past payments), a message is displayed appropriately instead of the payment history table.
*/

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 700,
      marginTop: theme.spacing(6),
    },
    root: {
      margin:'10em',
        marginTop: theme.spacing(10),
        height: 800,
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',
      '@media(max-width: 1115px)' : {
        margin: '1em',
        marginTop: theme.spacing(10),
          },
      },
      button: {
        marginTop: '1em',
      },
      h1: {
        marginTop: '2em', 
      },
  }));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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
        async function fetchAccountPayments() {
            const response = await axios.get(`/api/payments/${id}`);
      
            if (response.status === 200) {
              setData(response.data.payload);
              setIsLoading(true)
              //console.log(response.data.payload)
            }
          }
          fetchAccountPayments()
      },[user]);

      const displayAccountPayments = () => {
        if(data.length == 0){
          return(
            <div>
              <Typography className={classes.h1} component="h1" component="h1" variant="h6" align='center'>
              No payments were found for this account. New payments are added when you make an order.
				    </Typography>
            <Button fullWidth href='/account' variant="contained" color="primary" className={classes.button}><b>Back to account</b></Button>
            </div>
          )
        }else {
          return <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="table">
          <caption>Payment table that displays all past payments</caption>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell headers='Transaction date'>Transaction Date</StyledTableCell>
                <StyledTableCell align="right">Total Amount</StyledTableCell>
                <StyledTableCell align="right">Payment Method</StyledTableCell>
                <StyledTableCell align="right">Invoice</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((details) => (
                <StyledTableRow key={details.id}>
                  <TableCell component="th" scope="row">
                  {details.transaction_date}
                  </TableCell>
                  <TableCell align="right">{details.payment_total}</TableCell>
                  <TableCell align="right">{details.payment_method}</TableCell>
                  <TableCell align="right">{details.invoice}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    }

    return(
        <React.Fragment>
            <div className={classes.root}>
            <Typography component="h1" variant="h4" align='center'>
            You can see your payment history here
				    </Typography>
            {isLoading ? displayAccountPayments() : <p></p>}
            
            </div>
    </React.Fragment>
    )
}

export default edit_account;