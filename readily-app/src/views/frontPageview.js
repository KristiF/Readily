import { Container, Card, CardMedia, Typography, CardContent, CardActions, Button, IconButton, Grid } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Head from "next/head";

export default function FrontpageView(props) {
    console.log(props.savedArticles)
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
                <Grid item xs={12} key={article.title} sm={6} md={4}>
                <Card
                    sx={{  display: 'flex', flexDirection: 'column', height:"100%"}}
                >
                    <a href={"/articles/" + article.id}>
                    
                    </a>
                    <Container sx={{flexGrow: 2}}/>
                </Card>
                
                </Grid>
            ))}
            </Grid>
        </Container>
    </div>
    );
}