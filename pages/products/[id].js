import React from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import _ from "lodash";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Product_info from "../../components/Products/Product_info";

import Product_comment from "../../components/Products/Product_comment";

import Product_comment_add from "../../components/Products/Product_comment_add";
const classesr = makeStyles({
	root: {
		marginTop: "7rem",
	},

	comments: {
		marginTop: "50px",
	},
});


const ProductId = () => {
	const classes = classesr();
	const router = useRouter()

	const get_product_id = router.query.id;
	const [product, setProduct] = useState({});

	product ?? <h2>Loading...</h2>;


	useEffect(() => {
		async function fetchAppointments() {
			const response = await axios.get(`/api/products/get-all-products/`);
			setProduct(response.data.payload);
		}
		fetchAppointments();
		
	}, []);

	return (


		<div style={{overflow:'hidden'}}>
			{_.map(product, (p) => { return (p.id + "-") })}

			{_.map(product, (p, index) => {
				return (get_product_id == p.id ? (
					<div className={classes.root} key={index}>
						<Product_info
							className={classes.root}
							data_product={p}
							key={index}
						/>

						<Product_comment className={classes.comments} comments={get_product_id} />
						<Product_comment_add productId_comment={get_product_id} />
					</div>
				) : (''))
			})}
		</div>
	);
};

export default ProductId;
