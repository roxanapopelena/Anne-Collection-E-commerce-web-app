import TestimonialCard from 'material-testimonial-card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media(max-width: 1460px)': {
      flexDirection: 'column',
    },
  },
}));

const Testimonials = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item={true} xs={12} sm={3}>
        <TestimonialCard
          name={"Heather Smith"}
          image={""}
          content={"Where do I start! So many positive things to say ... Beautiful quality and design. Great small  business with wonderful ethical and environmental values ... I love this jewellery and hope to eventually have one of everything!"}
          project={"Anne Collections"}
        />
      </Grid>
      <Grid item={true} xs={12} sm={3}>
        <TestimonialCard
          name={"Lisa Williams"}
          image={""}
          content={"I recently gifted a beautiful and delicate pendant to a very dear person in my life to celebrate her recovery from serious and challenging health issues ... The smile on her face said it all ... it was the perfect choice. Thank you so much for your beautiful and original pieces."}
          project={"Anne Collections"}
        />
      </Grid>
      <Grid item={true} xs={12} sm={3}>
        <TestimonialCard
          name={"Jennifer Evans"}
          image={""}
          content={"Thanks so much for sending such joy my way! I was impressed from the moment I opened my package. Each piece of jewellery was individually wrapped to look like a million dollars ... almost too good to open! The jewellery itself is awesome."}
          project={"Anne Collections"}
        />
      </Grid>
    </Grid>
  )
}

export default Testimonials;