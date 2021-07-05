import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        //background: 'red',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(8),
        padding:'10px',
    },
    items: {
        minHeight: '600px',
        width: '100%',
        minWidth: '50%',
        //background: 'blue',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
        padding: '25px',
        
        '@media(max-width: 1115px)' : {
            flexDirection: 'column',
            width: '100%',
              },
    },
    img_container: {
            height: '100%',
            width: '50%', 
            //background: 'green',
        '& img': {
            width: '100%',
            height: '100%',
            borderRadius: '50px 0 0 50px', 
            border: 'thin',
            boxShadow: '0 0  15px #85837A',
        },
        
        '@media(max-width: 1115px)' : {
            width: '100%',
            order: '1',
              },
    },
    
    img2_container: {
        '& img': {
            borderRadius: '0 50px 50px 0', 
        }
    },
    info_container: {
        height: '100%',
        width: '50%',
        //background: 'pink',
        padding: '80px',
        '& h1': {
        textAlign: 'center',
            },
        '@media(max-width: 1115px)' : {
            width: '100%',
            padding: '0',
              },
    }
  }));

const about =() =>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.items}>
                <div className={classes.img_container}>
                <img src="https://source.unsplash.com/iusJ25iYu1c">
                    </img>

                </div>
                <div className={classes.info_container}>
                    <h1>Our mission.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat sem eu auctor accumsan. Praesent rhoncus porttitor luctus. Maecenas euismod sem et ante vehicula rutrum. Etiam tincidunt, nibh eget tempus rhoncus, nibh elit tempor neque, ut interdum felis nisi id tortor. Suspendisse vel ultrices nisi, eget pharetra risus. Curabitur tempor magna eu neque vehicula blandit. Duis a velit sit amet leo semper cursus non sit amet ante. In scelerisque sed lorem eu volutpat. Cras posuere aliquet dui ut consequat. Maecenas id vehicula eros.

Quisque hendrerit nec dui eu rhoncus. Nulla id leo sollicitudin, auctor urna in, ultrices nibh. Sed in velit non sapien vestibulum aliquet. Phasellus velit nunc, hendrerit vel metus eget, faucibus ullamcorper purus. Quisque diam sem, accumsan sit amet nulla vel, pellentesque bibendum nulla. Mauris ut tempus dolor. Integer iaculis, tellus in condimentum cursus, justo diam blandit lectus, eu mollis nibh sapien finibus nisl. Maecenas interdum mauris id feugiat tincidunt. Etiam feugiat augue ac enim pulvinar posuere.</p>

                </div>

            </div>
            <div className={classes.items}>
                <div className={classes.info_container}>
                    <h1>The quality of our products.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat sem eu auctor accumsan. Praesent rhoncus porttitor luctus. Maecenas euismod sem et ante vehicula rutrum. Etiam tincidunt, nibh eget tempus rhoncus, nibh elit tempor neque, ut interdum felis nisi id tortor. Suspendisse vel ultrices nisi, eget pharetra risus. Curabitur tempor magna eu neque vehicula blandit. Duis a velit sit amet leo semper cursus non sit amet ante. In scelerisque sed lorem eu volutpat. Cras posuere aliquet dui ut consequat. Maecenas id vehicula eros.

Quisque hendrerit nec dui eu rhoncus. Nulla id leo sollicitudin, auctor urna in, ultrices nibh. Sed in velit non sapien vestibulum aliquet. Phasellus velit nunc, hendrerit vel metus eget, faucibus ullamcorper purus. Quisque diam sem, accumsan sit amet nulla vel, pellentesque bibendum nulla. Mauris ut tempus dolor. Integer iaculis, tellus in condimentum cursus, justo diam blandit lectus, eu mollis nibh sapien finibus nisl. Maecenas interdum mauris id feugiat tincidunt. Etiam feugiat augue ac enim pulvinar posuere.</p>

                </div>
                <div className={`${classes.img_container} ${classes.img2_container}`}>
                <img src="https://source.unsplash.com/fo83GD_AARE">
                    </img>

                </div>

            </div>
            <div className={classes.items}>
                <div className={classes.img_container}>
                <img src="https://source.unsplash.com/fUdTivaXoYs">
                    </img>

                </div>
                <div className={classes.info_container}>
                    <h1>How we do it.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat sem eu auctor accumsan. Praesent rhoncus porttitor luctus. Maecenas euismod sem et ante vehicula rutrum. Etiam tincidunt, nibh eget tempus rhoncus, nibh elit tempor neque, ut interdum felis nisi id tortor. Suspendisse vel ultrices nisi, eget pharetra risus. Curabitur tempor magna eu neque vehicula blandit. Duis a velit sit amet leo semper cursus non sit amet ante. In scelerisque sed lorem eu volutpat. Cras posuere aliquet dui ut consequat. Maecenas id vehicula eros.

Quisque hendrerit nec dui eu rhoncus. Nulla id leo sollicitudin, auctor urna in, ultrices nibh. Sed in velit non sapien vestibulum aliquet. Phasellus velit nunc, hendrerit vel metus eget, faucibus ullamcorper purus. Quisque diam sem, accumsan sit amet nulla vel, pellentesque bibendum nulla. Mauris ut tempus dolor. Integer iaculis, tellus in condimentum cursus, justo diam blandit lectus, eu mollis nibh sapien finibus nisl. Maecenas interdum mauris id feugiat tincidunt. Etiam feugiat augue ac enim pulvinar posuere.</p>

                </div>

            </div>

       
        </div>
    )
    }
export default about;