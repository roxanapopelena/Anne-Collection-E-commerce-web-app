import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Carousel from 'react-material-ui-carousel'
import _ from 'lodash'
import React from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import HomeDetails from '../components/Homepage/HomeDetails'
import CollectionDetails from '../components/Homepage/CollectionDetails'
import Testimonials from '../components/Homepage/Testimonials'
import Divider from '@material-ui/core/Divider';

import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Button,
	Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	imageGrid: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	gridTextContent: {
		padding: theme.spacing(4)
	},
	carouselItemMedia: {
		height: '100%',
		backgroundColor: '#fff',
		overflow: 'hidden',
		position: 'relative',
		transition: '300ms',
		cursor: 'pointer',
		'&:hover': {
			filter: 'brightness(115%)'
		}
	},
	Banner: {
		height: '80vh',
		position: 'relative',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(6),
		[theme.breakpoints.down('sm')]: {
			height: '40vh'
		}
	},
	BannerGrid: {
		height: '100%',
		position: 'relative'
	},
	carouselContent: {
		backgroundColor: 'lightpink',
		height: '100%',
		position: 'relative',
		cursor: 'pointer',
		padding: theme.spacing(4),
		color: '#fff',
		transition: '300ms',
	},
	carouselTitle: {
		fontSize: 60,
		fontWeight: '500',
		textOverflow: 'ellipsis',
	},
	carouselCaption: {
		marginTop: '10px',
		fontSize: 30,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	carouselButton: {
		'&:hover': {
			backgroundColor: '#fff',
			color: 'darkred'
		},
		marginTop: theme.spacing(8),
		color: '#fff',
		fontSize: 20,
		border: '3px solid white',
		textTransform: 'capitalize',
		transition: '200ms',
		[theme.breakpoints.down('sm')]: {
			fontSize: 11,
			marginTop: theme.spacing(4)
		}
	},
	mediaCaption: {
		textOverflow: 'ellipsis',
		position: 'absolute',
		bottom: 0,
		padding: '15px',
		backgroundColor: '#000',
		opacity: .6,
		color: '#fff',
		fontSize: 20,
		fontWeight: 500,
		transition: '300ms',
		cursor: 'pointer',
		width: '100%',
		height: '10%',

		'&:hover': {
			opacity: .8
		},

		[theme.breakpoints.down('sm')]: {
			fontSize: 10,
			padding: 8
		}
	}
}))

const items = [
	{
		Name: "Exquisite jewellery",
		Caption: "Shop our finest pieces by browsing the Handmade and Angel Collections",
		contentPosition: "left",
		Items: [
			{
				Name: "Handmade Collection",
				Image: "https://source.unsplash.com/0vwTn3twzJY",
				link: "/handmade"
			},
			{
				Name: "Angel Collection",
				Image: "https://source.unsplash.com/uf_IDewI6iQ",
				link: "/products"
			}
		]
	},
	{
		Name: "Get to know us",
		Caption: "Have a look at our story or contact us about more info",
		contentPosition: "right",
		Items: [
			{
				Name: "About us",
				Image: "https://source.unsplash.com/Oalh2MojUuk",
				link: "/about"
			},
			{
				Name: "Contact us",
				Image: "https://source.unsplash.com/q3QPw37J6Xs",
				link: "/contact"
			}
		]
	}
]

const Item = (props) => {
	const classes = useStyles()

	const contentPosition = props.contentPosition ? props.contentPosition : "left"
	const totalItems = props.length ? props.length : 3;
	const mediaLength = totalItems - 1;

	const [displayTitle, setDisplayTitle] = React.useState(true)

	React.useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 900 ? setDisplayTitle(false) : setDisplayTitle(true)
		};
		console.log(window.innerWidth < 900, displayTitle)

		setResponsiveness();

		window.addEventListener("resize", () => setResponsiveness());
	}, []);

	let items = [];

	if (displayTitle) {
		for (let i = 0; i < mediaLength; i++) {
			const item = props.item.Items[i];
			console.log(item.link)
			const media = (

				<Grid item xs={12 / totalItems} key={item.Name}>
					<Link href={item.link}>
						<CardMedia
							className={classes.carouselItemMedia}
							image={item.Image}
							title={item.Name}

						>
							<Typography className={classes.mediaCaption}>
								{item.Name}
							</Typography>
						</CardMedia>
					</Link>
				</Grid>

			)

			items.push(media);
		}

		const content = (
			<Grid item xs={12 / totalItems} key="content" className={classes.carouselItemContainer}>
				<CardContent className={classes.carouselContent}>
					<Typography className={classes.carouselTitle}> {props.item.Name} </Typography>

					<Typography className={classes.carouselCaption}>
						{props.item.Caption}
					</Typography>
				</CardContent>
			</Grid>
		)

		if (contentPosition === "left") {
			items.unshift(content);
		} else if (contentPosition === "right") {
			items.push(content);
		} else if (contentPosition === "middle") {
			items.splice(items.length / 2, 0, content);
		}
	} else {
		for (let i = 0; i < mediaLength; i++) {
			const item = props.item.Items[i];

			const media = (
				<Grid item xs={6} key={item.Name}>
					<CardMedia
						className={classes.carouselItemMedia}
						image={item.Image}
						title={item.Name}
					>
						<Typography className={classes.mediaCaption}>
							{item.Name}
						</Typography>
					</CardMedia>
				</Grid>
			)

			items.push(media);
		}
	}

	return (
		<Card raised className={classes.Banner}>
			<Grid container spacing={0} className={classes.BannerGrid}>
				{items}
			</Grid>
		</Card>
	)
}

const Home = () => {
	const classes = useStyles()

	return (
		<div className={classes.homeWrapper}>
			<CssBaseline />

			<Carousel className={classes.carouselContainer}
				indicators={false}
			>
				{_.map(items, (it, index) => {
					return <Item key={index} item={it} />
				})}
			</Carousel>
			<HomeDetails />
			<CollectionDetails />
			{/*
			<Grid container component="main">
				<Grid className={classes.imageGrid} item xs={6}></Grid>
				
				<Grid className={classes.gridTextContent} item xs={6} elevation={12} component={Paper}>
					<Typography component="h1" variant="h5">
						PLACEHOLDER TITLE
					</Typography>
					<Typography component="h1" variant="h5">
						Placeholder text
					</Typography>
				</Grid>
			</Grid>
*/}
		</div>
	)
}

export default Home