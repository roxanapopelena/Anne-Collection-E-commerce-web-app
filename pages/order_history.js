import React, { useState, useEffect } from "react";
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
* order_history page that fetches the order details of a user by userId.
* Fetched the id of the user using the useUser library.
* Display details in the form of a table.
* Table contains a caption to make it accessible.
* If no data is available (user does not have any past orders), a message is displayed appropriately instead of the order history table.
*/

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    marginTop: theme.spacing(10),
    height: 800,
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: '1em',
    marginBottom: '1em',
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

const edit_account = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const { user } = useUser({ redirectTo: "/account" });

  useEffect(() => {
    if (!user) {
      return <h1>Loading</h1>
    }
    const id = user.id
    async function fetchAccountOrders() {
      const response = await axios.get(`/api/orders/${id}`);

      if (response.status === 200) {
        setData(response.data.payload);
        setIsLoading(true)
        //console.log(response.data.payload)
      }
    }
    fetchAccountOrders()
  }, [user]);

  const displayAccountOrders = () => {
    if (data.length == 0) {
      return (
        <div>
          <Typography className={classes.h1} component="h1" component="h1" variant="h6" align='center'>
            No orders were found for this account.
          </Typography>
          <Button fullWidth href='/account' variant="contained" color="primary" className={classes.button}><b>Back to account</b></Button><br></br>
          <Typography component="h1" variant="h6" align='center'>
            or
          </Typography>
          <Button fullWidth href='/handmade' variant="contained" color="primary" className={classes.button}><b>Shop handmade collection</b></Button>
          <Button fullWidth href='/products' variant="contained" color="primary" className={classes.button}><b>Shop angel collection</b></Button>
        </div>
      )
    } else {
      return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <caption>Order table that displays all past orders</caption>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Address 1</StyledTableCell>
              <StyledTableCell align="right">Address 2</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">County</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Payment Method</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((details) => (
              <StyledTableRow key={details.id}>
                <TableCell component="th" scope="row">
                  {details.client_name}
                </TableCell>
                <TableCell align="right">{details.email}</TableCell>
                <TableCell align="right">{details.address1}</TableCell>
                <TableCell align="right">{details.address2}</TableCell>
                <TableCell align="right">{details.city}</TableCell>
                <TableCell align="right">{details.county}</TableCell>
                <TableCell align="right">{details.date_time}</TableCell>
                <TableCell align="right">{details.order_status}</TableCell>
                <TableCell align="right">{details.payment_method}</TableCell>
                <TableCell align="right">{details.phone}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography component="h1" variant="h4" align='center'>
          You can see your orders here
        </Typography>
        {isLoading ? displayAccountOrders() : <p></p>}

      </div>
    </React.Fragment>
  )
}

export default edit_account;