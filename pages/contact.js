import React, {useState} from 'react';
import {Button, Grid, TextField, useMediaQuery, useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import {makeStyles} from "@material-ui/styles";
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    mainGridContainer: {
        marginTop: '5em',
        marginBottom: '5em',
    },

    marginTopTwo: {
        marginTop: '2em',
    },
    marginBottomTwo: {
        marginBottom: '2em',
    },
    inputField: {
        width: '20em',

        '@media only screen and (max-width: 450px)': {
            padding: '0 1em',
            width: '100%'
        }
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        width: 245,
        height: 45,
        // color: 'rgba(0, 0, 0, 0.26)',
        backgroundColor: '#fce4ec',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    },
}))

const ContactUs = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [nameHelper, setNameHelper] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [messageHelper, setMessageHelper] = useState('');

    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesXss = useMediaQuery('max-width: 350px');

    const valueChangeHandler = (event) => {
        const value = event.target.value;
        switch (event.target.id) {
            case 'name': {
                setName(value);
                // if (name.length === 0) {
                //     setNameHelper('Invalid Name');
                // } else {
                //     setNameHelper('');
                // }
                break;
            }
            case 'email': {
                setEmail(value);
                const valid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value);
                if (!valid) {
                    setEmailHelper('Invalid Email. Format must be like :abcd@hotmail.com');
                } else {
                    setEmailHelper('');
                }
                break;
            }
            case 'phone': {
                setPhone(event.target.value);
                const valid = (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(value);
                if (!valid) {
                    setPhoneHelper('So Far Invalid Phone Number. Format Must Be Like :123-456-7890');
                } else {
                    setPhoneHelper('');
                }
                break;
            }
            case 'message': {
                setMessage(event.target.value);
                if (message.length < 30) {
                    setMessageHelper('Keep Typing, The Message Must Be At Least 30 Characters');
                } else {
                    setMessageHelper('');
                }
                break;
            }
            default:
                break;
        }
    }

    return (
        <Grid container direction={'column'} className={classes.mainGridContainer}>

            <Grid item>

                <Grid container align={'center'} direction={'column'}>
                    <Typography variant={'h2'} style={{lineHeight: 1}}>
                        Contact Us
                    </Typography>
                    <Typography variant={'body1'}>
                        We're waiting.
                    </Typography>
                </Grid>

            </Grid>

            <Grid item className={classes.marginBottomTwo}>

                <Grid container direction={'column'} alignItems={'center'}>

                    <Grid item className={classes.marginTopTwo} style={{width: '20em'}}>
                        <Grid container justify={'flex-start'} alignItems={'flex-end'}>
                            <Grid item>
                                <CallIcon color={"primary"} style={{marginRight: '0.35em'}}/>
                            </Grid>
                            <Grid item>
                                <Typography style={{fontSize: '1rem'}} variant={'body2'}>
                                    <a style={{textDecoration: 'none', color: 'inherit'}} href="tel:(+40) 358-9320">(+40)
                                        358-9320</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item style={{width: '20em'}}>
                        <Grid container justify={'flex-start'} alignItems={'center'}>
                            <EmailIcon color={"primary"} style={{marginRight: '0.35em'}}/>
                            <Typography style={{fontSize: '1rem'}} variant={'body2'}>
                                <a style={{textDecoration: 'none', color: 'inherit'}}
                                   href="mailto:anecollection@hotmail.com"> anecollection@hotmail.com</a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item>

                <Grid container alignItems={'center'} direction={'column'} justify={'center'}
                      style={{width: '100%', margin: '0'}}>
                    <Grid item className={classes.inputField}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            color="primary"
                            size='small'
                            value={name}
                            onChange={valueChangeHandler}
                            fullWidth
                            helperText={nameHelper}
                            error={nameHelper.trim().length !== 0}
                        />
                    </Grid>
                    <Grid item className={classes.inputField} style={{marginTop: '2em', marginBottom: '2em'}}>
                        <TextField
                            id="email"
                            label="email"
                            variant="outlined"
                            color="primary"
                            size='small'
                            value={email}
                            onChange={valueChangeHandler}
                            fullWidth
                            helperText={emailHelper}
                            error={emailHelper.trim().length !== 0}
                        />
                    </Grid>
                    <Grid item className={classes.inputField}>
                        <TextField
                            id="phone"
                            label="phone"
                            variant="outlined"
                            color="primary"
                            size='small'
                            value={phone}
                            onChange={valueChangeHandler}
                            fullWidth
                            helperText={phoneHelper}
                            error={phoneHelper.trim().length !== 0}

                        />
                    </Grid>

                    <Grid item style={{margin: '0', marginTop: '5em', marginBottom: '2em'}}
                          className={classes.inputField}>

                        <TextField
                            id="message"
                            // label="message"
                            variant="outlined"
                            color="primary"
                            size={'small'}
                            value={message}
                            onChange={valueChangeHandler}
                            helperText={messageHelper}
                            fullWidth
                            multiline
                            rows={10}
                            error={messageHelper.trim().length !== 0}

                        />

                    </Grid>

                    <Grid item>
                        <Button style={{backgroundColor: '#fce4ec'}}
                                onClick={() => setOpen(true)}
                                variant={'contained'}
                                disabled={name.trim().length === 0 || email.trim().length === 0 || phone.trim().length === 0 || message.trim().length === 0}
                                className={classes.sendButton}>
                            Send Message
                            <SendIcon style={{marginLeft: '1em'}}/>
                        </Button>
                    </Grid>
                </Grid>

                <Grid item>
                    <Dialog style={{zIndex: '1500',}} open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                            <Grid container direction={"column"}>
                                <Grid item>
                                    <Grid container alignItems={'center'} direction={'column'} justify={'center'}
                                          style={{width: '100%', margin: '0'}}>
                                        <Grid item>
                                            <Typography variant={'h4'} gutterBottom>Confirm Message</Typography>
                                        </Grid>
                                        <Grid item className={classes.inputField}>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                variant="outlined"
                                                color="primary"
                                                size='small'
                                                value={name}
                                                onChange={valueChangeHandler}
                                                fullWidth
                                                helperText={nameHelper}
                                                error={nameHelper.trim().length !== 0}
                                            />
                                        </Grid>
                                        <Grid item className={classes.inputField}
                                              style={{marginTop: '2em', marginBottom: '2em'}}>
                                            <TextField
                                                id="email"
                                                label="email"
                                                variant="outlined"
                                                color="primary"
                                                size='small'
                                                value={email}
                                                onChange={valueChangeHandler}
                                                fullWidth
                                                helperText={emailHelper}
                                                error={emailHelper.trim().length !== 0}
                                            />
                                        </Grid>
                                        <Grid item className={classes.inputField}>
                                            <TextField
                                                id="phone"
                                                label="phone"
                                                variant="outlined"
                                                color="primary"
                                                size='small'
                                                value={phone}
                                                onChange={valueChangeHandler}
                                                fullWidth
                                                helperText={phoneHelper}
                                                error={phoneHelper.trim().length !== 0}

                                            />
                                        </Grid>

                                        <Grid item style={{margin: '0', marginTop: '3em', marginBottom: '1em'}}
                                              className={classes.inputField}>

                                            <TextField
                                                id="message"
                                                // label="message"
                                                variant="outlined"
                                                color="primary"
                                                size={'small'}
                                                value={message}
                                                onChange={valueChangeHandler}
                                                helperText={messageHelper}
                                                fullWidth
                                                multiline
                                                rows={10}
                                                error={messageHelper.trim().length !== 0}

                                            />

                                        </Grid>

                                        <Grid item>
                                            <Grid container
                                                  alignItems={'center'}
                                                  direction={matchesXs ? 'column' : 'row'}
                                                  style={{marginTop: '1em', marginBottom: '1em'}}>

                                                <Grid item style={{
                                                    marginRight: '1em',
                                                    marginBottom: matchesXs ? '.5em' : '0'
                                                }}>
                                                    <Button color={'primary'} onClick={() => setOpen(false)}>
                                                        cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button style={{backgroundColor: '#fce4ec'}}
                                                            onClick={() => setOpen(true)}
                                                            variant={'contained'}
                                                            disabled={name.trim().length === 0 || email.trim().length === 0 || phone.trim().length === 0 || message.trim().length === 0}
                                                            className={classes.sendButton}>
                                                        Send Message
                                                        <SendIcon style={{marginLeft: '1em'}}
                                                        />
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </Grid>


            </Grid>


        </Grid>
    );
};

export default ContactUs;

