import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { useEffect, useState } from "react";
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		marginLeft: '1%',
		marginRight: '1%',
		marginTop: '5%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},

	header: {
		marginLeft: '2rem',

	},

}));

const Product_comment = ({ comments }) => {
	const classes = useStyles();

	const [comment, setComment] = useState({});

	comment ?? <h2>Loading...</h2>;


	useEffect(() => {
		async function fetchComments() {
			const response = await axios.get(`/api/products/comments/${comments}`);
			setComment(response.data.payload);
		}

		async function fetchUsers() {
			const response = await axios.get(`/api/products/username/`);
			setUser(response.data.payload);
		}

		window.scrollTo(0, 0)
		fetchUsers();
		fetchComments();
	}, []);



	const [user, setUser] = useState({});

	user ?? <h2>Loading...</h2>;

	return (
		<div>
			<CssBaseline />

			<List className={classes.root}>
				<h1 className={classes.header} >Reviews</h1>
				{_.map(comment, (c) => {
					return (
						<ListItem alignItems="flex-start" key={c.id}>
							<ListItemAvatar>
								<Avatar alt="User Avatar" src="https://icons-for-free.com/iconfiles/png/512/comment-131965017416332557.png" />
							</ListItemAvatar>

							<ListItemText
								primary={_.map(user, (u) => (u.id == c.user_id ? (u.name) : null))}
								secondary={
									<span key={c.id}>
										<Typography
											component="span"
											variant="body2"
											className={classes.inline}
											color="textPrimary"
										>
											{c.message}
										</Typography>

										<br />
										<Typography component="span">{`Rating: ${c.rating}`}</Typography>
									</span>
								}
							/>

						</ListItem>
					)
				})}

			</List>

		</div>

	);
}

export default Product_comment;
