import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import _ from "lodash";
import useUser from "../../lib/useUser"
import { useRouter } from 'next/router'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from '../../components/Loader'
import Row from '../../components/admin/Row'
import { Button, Container } from "@material-ui/core";
import { Grid } from '@material-ui/core';
import { TextField, TextareaAutosize, MenuItem } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        border: '1px solid rgba(153, 153, 153, .4)'
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
        overflow: 'hidden',
    },
    TableContainer: {
        marginTop: theme.spacing(10)
    },
    actionContainer: {
        padding: theme.spacing(4)
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
}));

const AdminIndex = () => {
    const router = useRouter()
    const classes = useStyles()
    let { user } = useUser({ redirectTo: "/account" });
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState(1)
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [desc, setDesc] = useState('')

    useEffect(() => {
        async function fetchAppointments() {
            const response = await axios.get(`/api/admin/get-all-products`);

            setProducts(response.data.payload);
        }

        fetchAppointments();
    }, []);

    if (!user) {
        return <div style={{ marginTop: '20em' }}>LOADING</div>
    }

    if (user && !user.isAdmin) {
        return <div style={{ marginTop: '20em' }}>You are not admin</div>
    }

    const renderItems = () => {
        return _.map(products, (it, index) => {
            return (
                <Row handleRowDelete={handleRowDelete} key={index} details={it} />
            )
        })
    }

    const handleRowDelete = async (e, id) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/admin/delete-product`, { id })

            if (response.status === 200 && response.data.status === 200) {
                router.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/admin/create-product`, { name, category, price, stock, desc })

            if (response.status === 200 && response.data.status === 200) {
                router.reload()
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong.')
        }
    }

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

    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    return (
        <TableContainer className={classes.TableContainer} component={Paper}>
            <Container className={classes.actionContainer}>
                <Button onClick={handleOpen} variant="contained" color="primary">Create Product</Button>
            </Container>

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Stock</StyledTableCell>
                        <StyledTableCell align="center">Gallery</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products ? renderItems() : <Loader />}
                </TableBody>
            </Table>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Create new Product
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCreate}>
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
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Category</Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    label="Category"
                                    onChange={handleCategoryChange}
                                    defaultValue={1}
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
                                    onChange={handleStockChange}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Dialog>
        </TableContainer>
    );
};
export default AdminIndex;