import { Container, Card, CardMedia, Typography, CardContent, CardActions, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function ArticleCard(props) {
    return (
        <Container maxWidth="md" sx={{mt: 1, display:"flex-inline", alignItems:"center", justifyContent:"center"}}>
            <Card>
                <CardMedia
                component="img"
                image={
                    "https://firebasestorage.googleapis.com/v0/b/readify-a88ee.appspot.com/o/images%2F" 
                    + props.props.image 
                    + "?alt=media"}
                />
                <CardContent>
                    <Typography variant="h4">{props.props.title}</Typography>
                    <Typography sx={{fontWeight: 600}} >20th Oct 2022</Typography>
                    <Typography paragraph>{props.props.summary}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <FavoriteIcon/>
                    </IconButton>
                    <Button href={props.props.url}>Read full article</Button>
                </CardActions>
            </Card>
        </Container>
    )
}