import React from "react";
import Link from "next/link";
import _ from "lodash";
import ProductCardImage from "./ProductCardImage";

import {
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Grid,
	Container,
	Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

// cart provider context
import { useContext } from 'react'
import { CartContext } from '../../components/cart/CartProvider'

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: 350,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
	header: {
		flexDirection: "column",
		alignItems: "center",
	},
	sub: {
		flexDirection: "column",
		alignItems: "center",
		color: "black",
	},

	shop: {
		align: "right",
		textAlign: "right",
	},
}));

const Products_list_card = ({ products }) => {
	const { dispatch } = useContext(CartContext)
	const { state: items } = useContext(CartContext)

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleClick = (e, productId) => {
		e.preventDefault();

		return dispatch({ type: 'ADD_ITEM', payload: { productId } })
	};

	return (
		<Container style={{ marginTop: "5em" }}>
			<Grid container spacing={2}>
				{_.map(products, (it) => {
					return (
						<Grid item xs={12} md={3} key={it.id}>
							<Link href={"/products/" + it.id}>
								<Card className={classes.root}>
									<CardHeader
										className={classes.header}
										title={it.product_name}
									/>
									<ProductCardImage productId={it.id} productName={it.product_name}/>
									<CardContent className={classes.sub}>
										<Typography
											className={classes.sub}
											variant="body2"
											color="textSecondary"
											component="p"
										>
										</Typography>
										{it.product_desc}
									</CardContent>
									<CardActions disableSpacing>
										<IconButton aria-label="add to favorites">
											<FavoriteIcon />
										</IconButton>
										<IconButton
											className={classes.shop}
											onClick={(e) => handleClick(e, it.id)}
											aria-label="add to shopping cart"
										>
											<AddShoppingCartIcon />
										</IconButton>
										Price: {it.product_price} RON
									</CardActions>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};

export default Products_list_card;
