import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Box
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";


export default function FrontpageCard(props) {
  function getTimeStamp() {
    const now = new Date();
  
    const ageInSeconds = Math.floor((now - new Date(props.article.date.seconds*1000)) / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInMonths = Math.floor(ageInDays / 30);
    const ageInYears = Math.floor(ageInMonths / 12);
  
  
    let ageString;
    if (ageInYears > 0) {
      ageString = `${ageInYears}yr`;
    } else if (ageInMonths > 0) {
      ageString = `${ageInMonths}m`;
    } else if (ageInDays > 0) {
      ageString = `${ageInDays}d`;
    } else if (ageInHours > 0) {
      ageString = `${ageInHours}h`;
    } else if (ageInMinutes > 0) {
      ageString = `${ageInMinutes}min`;
    } else {
      ageString = `${ageInSeconds}s`;
    }
    return ageString;
  }
 
  
  const handleClick = (event) => {
    if (!event.target.closest("#save-button")) {
      props.onArticleView(props.article.id);
    }

  };
  return (
    <div onClick={handleClick}>
      <Card style={{cursor:"pointer"}}sx={{ display: "flex", flexDirection: "column", height: "100%", opacity: props.isRead ? 0.5 : 1 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            loading="lazy"
            image={
              props.article.image
                ? "https://firebasestorage.googleapis.com/v0/b/readify-a88ee.appspot.com/o/images%2F" +
                  props.article.image +
                  "?alt=media"
                : null
            }
            alt="random"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bgcolor: 'rgba(0, 0, 0, 0.54)',
              color: 'white',
              padding: '10px',
            }}
          >
            <Typography variant="subtitle2">{getTimeStamp()}</Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.article.title}
          </Typography>

          <Typography noWrap>{props.article.summary}</Typography>
        </CardContent>
        <Container sx={{ flexGrow: 2 }} />

        <CardActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <IconButton
            id="save-button"
            onClick={() => {
              props.onArticleSave(props.article.id);
            }}
          >
            <FavoriteIcon sx={props.isSaved ? {color: "red"} : {}}/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
