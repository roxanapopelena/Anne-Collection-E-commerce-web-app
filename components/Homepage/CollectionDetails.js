import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    container: { 
        display: 'flex',
        flexDirection:'row',
        
    },
    media: { 
      height: 500,
      margin: '2em',
      borderRadius: '25px',
    },
    info_container: {
        alignSelf: 'center',
        padding: '30px',
        item: 'true',
        
        '@media(max-width: 1115px)' : {
            order: '1',
              },
    },
  });

const CollectionDetails =() =>{
    const classes = useStyles();
    return(
        <div>
            <Typography align='center' gutterBottom variant="h4" component="h2">
            Understand our message
          </Typography>
          <Grid container  className={classes.container}>
          <Grid item={true} xs={12} sm={6}>
          <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/hxtKsjWSd3M"
          title="Handmade Collection"
        />
          </Grid>
          <Grid item={true} xs={12} sm={6} className={classes.info_container}>
          <Typography align='center' gutterBottom variant="h5" component="h2">
            <b>The Handmade Collection</b>
          </Typography>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis nisl ac consequat scelerisque. Phasellus id varius nisi. Nam cursus volutpat bibendum. Proin ac placerat mauris, at pretium nibh. Praesent pretium egestas pretium. Fusce eget varius odio, non pharetra lacus. Nullam quis urna ut ipsum commodo gravida iaculis vel tortor. Morbi et urna et diam pharetra sodales vel ut ipsum. Suspendisse eleifend hendrerit elit sit amet tristique. Nunc semper in ex vitae aliquam. Maecenas pretium vestibulum lacus, quis scelerisque risus tempor non. Vestibulum tincidunt tristique augue nec viverra. Vestibulum venenatis viverra magna, sodales lobortis ipsum malesuada sit amet. Suspendisse auctor magna diam, et tincidunt mi vehicula eu. Aenean auctor bibendum turpis et euismod.
          </p>
          </Grid>
          </Grid>
          <Grid container>
          
          <Grid item={true} xs={12} sm={6} className={classes.info_container}>
          <Typography align='center' gutterBottom variant="h5" component="h2">
            <b>The Angel Collection</b>
          </Typography>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis nisl ac consequat scelerisque. Phasellus id varius nisi. Nam cursus volutpat bibendum. Proin ac placerat mauris, at pretium nibh. Praesent pretium egestas pretium. Fusce eget varius odio, non pharetra lacus. Nullam quis urna ut ipsum commodo gravida iaculis vel tortor. Morbi et urna et diam pharetra sodales vel ut ipsum. Suspendisse eleifend hendrerit elit sit amet tristique. Nunc semper in ex vitae aliquam. Maecenas pretium vestibulum lacus, quis scelerisque risus tempor non. Vestibulum tincidunt tristique augue nec viverra. Vestibulum venenatis viverra magna, sodales lobortis ipsum malesuada sit amet. Suspendisse auctor magna diam, et tincidunt mi vehicula eu. Aenean auctor bibendum turpis et euismod.
          </p>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
          <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/aL6iFnespCU"
          title="Angel Collection"
        />
          </Grid>
          </Grid>
        </div>
    )
}

export default CollectionDetails;