import React from "react";
import { CardMedia, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from 'next/router'

const ProductCardImage = ({ productId, productName}) => {
	const [image, setImage] = React.useState("placeholder.jpg");

	const router = useRouter()

	React.useEffect(() => {
		if (!router.isReady) {
			return
		}

		async function fetchImageByProdId() {
			const response = await axios.get(`/api/products/image/${productId}`);

			try {
				if (response.status === 200) {
					setImage(response.data.payload[0].img);
				}
			} catch (error) {
				setImage("placeholder.jpg")
				console.warn(`Image for product with ${productId} does not currently have an image.`)
			}
		}

		fetchImageByProdId();
	}, [router.isReady]);

	image ?? (
		<Typography variant="h3" component="h2">
			Loading...
		</Typography>
	);

	return (
		<CardMedia
			style={{
				height: 350,
				paddingTop: "56.25%",
			}}
			image={`/uploads/${image}`}
			title={productName}
		/>
	);
};

export default ProductCardImage;
