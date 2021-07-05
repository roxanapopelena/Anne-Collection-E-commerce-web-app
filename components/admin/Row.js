import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button'
import { withStyles, makeStyles } from '@material-ui/styles'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios'
import _ from 'lodash'
import { Grid } from '@material-ui/core';
import { TextField, TextareaAutosize, Container, MenuItem } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    root: {
    },
    tableImage: {
        maxWidth: 100
    },
    tableDescription: {
        maxWidth: 400
    },
    textareaField: {
        width: '100%'
    },
    textFieldSmall: {
        width: '100%',
        margin: 0,
        padding: 0
    },
    tableImageContainer: {

    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    pageContainer: {
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    input: {
        display: 'none'
    },
    popoupImageContainer: {
        display: 'flex',
        marginTop: theme.spacing(5),
        '& img': {
            width: 200,
            height: 'auto'
        }
    },
    deleteImage: {
        position: 'absolute',
        zIndex: 100000000000000000,
        background: '#fff',
        borderRadius: 0
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Row = ({ details, handleRowDelete }) => {
    const classes = useStyles()
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [open, setOpen] = React.useState(false);

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        async function fetchProductImages() {
            try {
                const response = await axios.get(`/api/products/images/${details.product_id}`)

                if (response.status === 200 && response.data.status === 200) {
                    setImages(response.data.payload)
                    setLoaded(true)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchProductImages()
    }, [])

    const handleImageDeleteClick = async (e, id) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/admin/delete-image`, { id })

            if (response.status === 200 && response.data.status === 200) {
                setImages(images.filter((it) => it.image_id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditClick = (e, id) => {
        setEdit(true)
    }

    const handleClose = () => {
        setEdit(false)
    }

    const displayImages = () => {
        return _.map(images, (it, index) => {
            return (
                <Grid className={classes.tableImageContainer} item xs={6} key={index}>
                    <img className={classes.tableImage} src={`/uploads/${it.img}`} />
                </Grid>
            )
        })
    }

    const onFileChange = async (e) => {
        const formData = new FormData()
        formData.append('selectedFile', e.target.files[0])
        formData.append('product_id', details.product_id)

        try {
            const response = await axios.post(`/api/admin/image-upload`, formData)
        } catch (error) {
            alert('Something went wrong.')
            console.error(error)
        }
    }

    const router = useRouter()

    const handleEditConfirm = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/admin/change-product`, { name, category, price, stock, desc, id: details.product_id })
            if (response.status === 200 && response.data.status === 200) {
                router.reload()
            }
        } catch (err) {
            console.error(err)
        }

        setEdit(false)
    }

    const [name, setName] = useState(details.product_name)
    const [category, setCategory] = useState(details.category_id)
    const [price, setPrice] = useState(details.product_price)
    const [stock, setStock] = useState(details.stock)
    const [desc, setDesc] = useState(details.product_desc)

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }

    const handleStockChange = (e) => {
        setStock(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        setOpen(false);
    };
    return (
        <StyledTableRow key={details.product_id}>
            <StyledTableCell align="center">{details.product_name}</StyledTableCell>
            <StyledTableCell align="center">{details.category_name}</StyledTableCell>
            <StyledTableCell className={classes.tableDescription} align="left">{details.product_desc}</StyledTableCell>
            <StyledTableCell align="center">{details.product_price}</StyledTableCell>
            <StyledTableCell align="center">{details.stock}</StyledTableCell>

            <StyledTableCell>
                {loaded ? <Grid container>{displayImages()}</Grid> : 'Loading...'}
                {(!images.length && loaded) && 'No images.'}
            </StyledTableCell>

            <StyledTableCell>
                <Button onClick={(e, id) => handleEditClick(e, details.product_id)}><CreateIcon /></Button>
                <Button onClick={handleClickOpen}>
                    <DeleteIcon />
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this product?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            This will delete all information about the product, including images.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePopupClose}>
                            No
                            </Button>
                        <Button onClick={(e, id) => handleRowDelete(e, details.product_id)}>
                            Yes
                            </Button>
                    </DialogActions>
                </Dialog>
            </StyledTableCell>

            <Dialog fullScreen open={edit} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit {details.product_name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleEditConfirm}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <form className={classes.form}>
                        <Grid container spacing={7}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Product"
                                    name="product_name"
                                    autoFocus
                                    defaultValue={details.product_name}
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Category</Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={details.category_id}
                                    fullWidth
                                    label="Category"
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem value={1}>Handmade Collection</MenuItem>
                                    <MenuItem value={2}>Angel Collection</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Description</Typography>
                                <TextareaAutosize
                                    className={classes.textareaField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    label="Description"
                                    name="product_desc"
                                    autoFocus
                                    rows="6"
                                    defaultValue={details.product_desc}
                                    onChange={handleDescChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Price"
                                    name="product_price"
                                    autoFocus
                                    defaultValue={details.product_price}
                                    onChange={handlePriceChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Stock"
                                    name="stock"
                                    autoFocus
                                    defaultValue={details.stock}
                                    onChange={handleStockChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={onFileChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload Image
                                    </Button>
                                </label>

                                <Grid className={classes.popoupImageContainer} container spacing={10}>
                                    {_.map(images, (it) => {
                                        return (
                                            <Grid item key={it.image_id}>
                                                <Button onClick={(e, image_id) => handleImageDeleteClick(e, it.image_id)} variant="contained" className={classes.deleteImage}>x</Button>
                                                <img src={`/uploads/${it.img}`} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Dialog>
        </StyledTableRow>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        border: '1px solid rgba(153, 153, 153, .4)',
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default Row