import { Container, Card, CardMedia, Typography, CardContent, CardActions, Button, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
export default function ArticleCard(props) {
    const pubDate = new Date(props.props.date["seconds"]*1000)
    console.log(pubDate)
    return (
        <Container maxWidth="md" sx={{mt: 1, display:"flex-inline", alignItems:"center", justifyContent:"center"}}>
            <Card>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                    component="img"
                    image={
                        "https://firebasestorage.googleapis.com/v0/b/readify-a88ee.appspot.com/o/images%2F" 
                        + props.props.image 
                        + "?alt=media"}
                    />
                    <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                    color: 'white',
                    padding: '10px',
                    }}
                    >
                        <IconButton onClick={()=>props.onReturn()}>
                            <KeyboardReturnIcon sx={{color:"white"}}/>
                        </IconButton>
                    </Box>
                </Box>
                <CardContent>
                    <Typography variant="h4">{props.props.title}</Typography>
                    <Typography sx={{fontWeight: 600}} >{pubDate.toDateString()}</Typography>
                    <Typography paragraph>{props.props.summary}</Typography>
                </CardContent>
                <CardActions>
                <IconButton
                    id="save-button"
                    onClick={() => {
                    props.onArticleSave(props.props.id);
                    }}
                >
                    <FavoriteIcon sx={props.savedArticles?.includes(props.props.id) ? {color: "red"} : {}}/>
                </IconButton>
                    <Button href={props.props.url}>Read full article</Button>
                </CardActions>
            </Card>
        </Container>
    )
}