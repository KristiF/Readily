import { Container, Card, CardMedia, Typography, CardContent, CardActions, Button, IconButton, Grid } from "@mui/material";

import Head from "next/head";

export default function FrontpageView(props) {
    return (
    <div>
        <Head>
            <title>Readily - Frontpage</title>
            <meta name="description" content="Summarize the web" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
            {props.articles.map((article) => (
                <Grid item xs={12} key={article?.data().title} sm={6} md={4}>
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
                
                </Grid>
            ))}
            </Grid>
        </Container>
    </div>
    );
}