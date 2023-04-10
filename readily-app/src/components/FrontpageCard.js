export default function FrontpageCard(props) {
    <Card
        sx={{  display: 'flex', flexDirection: 'column', height:"100%"}}
    >
        <a href={"/articles/" + article?.data().id}>
        <CardMedia
        component="img"
        loading="lazy"
        image={article.data().image ? "https://firebasestorage.googleapis.com/v0/b/readify-a88ee.appspot.com/o/images%2F" + article.data().image + "?alt=media":null}
        alt="random"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {article?.data().title}
        </Typography>
            
        <Typography noWrap>
            {article?.data().summary}
        </Typography>
        </CardContent>
        </a>
        <Container sx={{flexGrow: 2}}/>
        <CardActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>

        </CardActions>
           
    </Card>
}