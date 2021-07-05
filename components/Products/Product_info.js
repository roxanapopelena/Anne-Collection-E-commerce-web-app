import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Button, Typography, Container, Paper } from "@material-ui/core";

import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { CartContext } from '../../components/cart/CartProvider'

const productStyle = makeStyles({
  root: {
    marginTop: "7rem",
    marginBottom: "4rem",
  },
  inStock: {
    marginBottom: "4rem",
    color: "blue",
  },
  productDescription: {
    marginBottom: "2rem",
  },
  productImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "100% 200",
    minHeight: "30vh",
  },
  price: {
    marginBottom: "1rem",
    fontSize: "20px",
  },
  arrowBtn: {
    maxWidth: "fit-content",
    marginTop: "0.3rem",
  },

  imgcontainer: {
    maxWidth: "50%",
  },

  productHeader: {
    fontSize: "40px",
  },

  strepper: {
    marginTop: "2rem",
  },
});


var maxSteps = 0;
const Product_info = ({ data_product }) => {
  const { dispatch } = useContext(CartContext)
  const [images, setImages] = React.useState({});

  images ?? <h2>Loading...</h2>;

  React.useEffect(() => {
    async function fetchAppointments() {
      const response = await axios.get(`/api/products/images/${data_product.id}`);

      setImages(response.data.payload);

    }

    fetchAppointments();
  }, []);


  const pclasses = productStyle();
  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  var img = []


  _.map(images, (p) => { img.push(p.img); })

  const handleClick = (e, productId) => {
    e.preventDefault()

    return dispatch({ type: 'ADD_ITEM', payload: { productId } })
  }

  maxSteps = img.length
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div>
            { }
            <Paper square elevation={0}>
              <Typography></Typography>
            </Paper>
            <center>
              <img
                className={pclasses.imgcontainer}
                src={`/uploads/${img[activeStep]}`}

              />
            </center>
            <MobileStepper
              className={pclasses.strepper}
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              }
            />
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          className={pclasses.productHeader}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4"> </Typography>
            {data_product.product_name}
            <Typography
              variant="caption"
              display="block"
              color="secondary"
              className={pclasses.inStock}
            >
              In Stock
            </Typography>
          </Grid>
          <Typography variant="body2" className={pclasses.productDescription}>
            {data_product.product_desc}
          </Typography>

          <Typography variant="subtitle2" className={pclasses.price}>
            {data_product.product_price} RON
          </Typography>

          <Button variant="contained" color="primary" onClick={(e) => handleClick(e, data_product.id)}>
            Buy
          </Button>

          <Grid item container justify="space-between" alignItems="center">
            <IconButton
              className={pclasses.arrowBtn}
              color="primary"
              onClick={() => history.goBack()}
            ></IconButton>
            <IconButton onClick={() => addToFavs(product)}></IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product_info;
