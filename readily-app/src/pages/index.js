import FrontpageCard from "@/components/FrontpageCard";
import { useState, useEffect } from "react";  
import { Container, Grid } from "@mui/material";
import { fetchArticles } from "@/lib/fetchArticles";
import Loading from "@/components/Loading";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";


export default function Home() {
  const { likeArticle, user } = useContext(UserDataContext);
  const [articlesPromiseState] = useState({})
  const [articles, setArticles] = useState(null)
  const [, reRender] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleLikes(articleId){
    return await likeArticle(articleId, user.uid)
  }

  useEffect(()=> {
    setLoading(true)
    fetchArticles().then((_articles) => setArticles(_articles)).then(setLoading(false))
  }, []);

  return (
      <div>
        <Container sx={{ py: 8 }} maxWidth="md">
  
          {(loading || !articles) ? <Loading/>
          :
          <Grid container spacing={4}>
            {articles.map((article) => {
                return (
                  <Grid item xs={12} key={article.id} sm={6} md={4}>
                    <FrontpageCard article={article} onLike = {handleLikes}/>
                  </Grid> 
                )}
              )}
          </Grid> 
          }
        </Container>
      </div>
  )
}
