import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    display: 'flex',
    padding: '3em',
    '@media(max-width: 1115px)' : {
        flexWrap:'wrap'
          },
  },
  header: {
    fontStyle: 'italic',
  },
  media: { 
    height: 440,
    margin: '2em',
  },
});

export default function MediaCards() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href='/about'>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/s8SJ8pmxPDA"
          title="Fair pricing"
        />
        <CardContent>
          <Typography align='center' gutterBottom variant="h4" component="h2" className={classes.header}>
            Fair pricing.
          </Typography>
          <Typography variant="body2"  component="p">
          Quisque pellentesque libero lacinia ante molestie pulvinar. Morbi libero sem, bibendum eget felis eget, aliquam finibus velit. Aliquam laoreet eget quam at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia, ex blandit venenatis euismod, mi ante ultrices magna, eget lacinia felis enim at urna. Pellentesque rutrum ac sapien a dignissim. Maecenas nec magna sit amet purus lacinia blandit in varius tellus. Donec feugiat tristique ligula. Fusce eu tellus ac enim tempus convallis vel quis risus. Phasellus placerat sollicitudin eros. In porta felis in tempor posuere. Cras commodo ultrices eros sit amet luctus. Aliquam quis metus elit.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/OibaEuEfpeg"
          title="High quality"
        />
        <CardContent href='/about'>
          <Typography align='center' gutterBottom variant="h4" component="h2" className={classes.header}>
            High quality.
          </Typography>
          <Typography variant="body2" component="p">
          Quisque pellentesque libero lacinia ante molestie pulvinar. Morbi libero sem, bibendum eget felis eget, aliquam finibus velit. Aliquam laoreet eget quam at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia, ex blandit venenatis euismod, mi ante ultrices magna, eget lacinia felis enim at urna. Pellentesque rutrum ac sapien a dignissim. Maecenas nec magna sit amet purus lacinia blandit in varius tellus. Donec feugiat tristique ligula. Fusce eu tellus ac enim tempus convallis vel quis risus. Phasellus placerat sollicitudin eros. In porta felis in tempor posuere. Cras commodo ultrices eros sit amet luctus. Aliquam quis metus elit.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}