import FrontpageCard from "@/components/FrontpageCard";
import { useState, useEffect } from "react";  
import { Container, Grid } from "@mui/material";
import { fetchArticlesId } from "@/lib/fetchArticles";
import Loading from "@/components/Loading";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useRouter } from "next/router";
import {Typography} from "@mui/material";

export default function SavedArticlesPage() {
  const { savedArticles, setSavedArticles, user, logOut, loading } = useContext(UserDataContext);
  const [articles, setArticles] = useState([])
  const [articlesLoading, setArticlesLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;
      if (scrolled + windowHeight >= fullHeight) {
        setLoadMoreArticles(true);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  function handleArticleSave(id) {
    if (user) {
      if (savedArticles.includes(id)) {
        setSavedArticles(savedArticles.filter((articleId) => articleId !== id));
      } else {
        setSavedArticles([...savedArticles, id]);
      }
    } else {
      router.push("/login");
    }
  }
 
  useEffect(()=> {
    if (savedArticles.length == 0 && !loading) {
        setArticles([])
    }
    if (savedArticles.length > 0 && !loading) {
        setArticlesLoading(true)
        fetchArticlesId(savedArticles).then((_articles) => setArticles(_articles)).then(setArticlesLoading(false))
    }
  }, [savedArticles, ]);

  function onArticleView(id) {
    router.push("/articles/" + id);
  }

  function handleLogout() {
    logOut().then(()=>router.reload());
  }



  return (
      <div>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Saved Articles
          </Typography>
          {(!loading && savedArticles.length == 0 && !articlesLoading) && 
            <Typography variant="h4" component="h1" gutterBottom>
                You have no saved articles
            </Typography>
          }  
          {(loading) || articlesLoading ? <Loading/>
          :
          <Grid container spacing={4}>
            {articles.map((article) => {
                if (article.date)
                return (
                  <Grid item xs={12} key={article.id} sm={6} md={4}>
                    <FrontpageCard 
                      article={article} 
                      onArticleSave={handleArticleSave}
                      onArticleView={onArticleView}
                      isSaved={user && savedArticles?.includes(article.id)}/>
                  </Grid> 
                )}
              )}
          </Grid> 
          }
        </Container>
      </div>
  )
}
