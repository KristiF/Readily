import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
export default function FrontpageCard(props) {
  const { user } = useContext(UserDataContext);
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <a href={"/articles/" + props.article.id}>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.article.title}
          </Typography>

          <Typography noWrap>{props.article.summary}</Typography>
        </CardContent>
      </a>
      <Container sx={{ flexGrow: 2 }} />
      <CardActions
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      ></CardActions>
      <CardActions>
        <IconButton
          onClick={() => {
            props.onLike(props.article.id);
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
