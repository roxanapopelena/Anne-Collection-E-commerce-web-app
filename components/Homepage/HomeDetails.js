import MediaCards from './MediaCards'
import Typography from '@material-ui/core/Typography';

const HomeDetails =() =>{
    return(
        <div>
            <Typography align='center' gutterBottom variant="h4" component="h2">
            Learn about our business
          </Typography>
            <MediaCards/>
        </div>
    )
}

export default HomeDetails;