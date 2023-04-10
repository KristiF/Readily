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
                
                
                </Grid>
            ))}
            </Grid>
        </Container>
    </div>
    );
}