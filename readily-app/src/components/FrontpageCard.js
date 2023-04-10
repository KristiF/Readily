import { Card, CardMedia, Typography, CardActions, CardContent, Container } from "@mui/material"

export default function FrontpageCard(props) {
    return(
        <Card sx={{  display: 'flex', flexDirection: 'column', height:"100%"}}>
            <a href={"/articles/" + props.article.id}>
                <CardMedia
                component="img"
                loading="lazy"
                image={props.article.image ? "https://firebasestorage.googleapis.com/v0/b/readify-a88ee.appspot.com/o/images%2F" + props.article.image + "?alt=media":null}
                alt="random"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.article.title}
                </Typography>
                    
                <Typography noWrap>
                    {props.article.summary}
                </Typography>
                </CardContent>
            </a>
            <Container sx={{flexGrow: 2}}/>
            <CardActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            </CardActions>
           
        </Card>
    )
}