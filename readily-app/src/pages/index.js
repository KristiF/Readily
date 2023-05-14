import FrontpageCard from "@/components/FrontpageCard";
import { useState, useEffect } from "react";  
import { CircularProgress, Container, Grid } from "@mui/material";
import { fetchArticles, fetchMoreArticles } from "@/lib/fetchArticles";
import Loading from "@/components/Loading";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { savedArticles, setSavedArticles, user, logOut, readArticles, setReadArticles } = useContext(UserDataContext);
  const [articles, setArticles] = useState([])
  const [loadMoreArticles, setLoadMoreArticles] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const displayCategories = ["All", "News", "Sport", "Entertainment", "Economy", "Politics", "Tech"]
  const [currentCategory, setCurrentCategory] = useState("All")

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
  
  useEffect(() => {
    if (loadMoreArticles) {
      fetchMoreArticles(currentCategory, articles[articles.length-1])
        .then((_articles) => setArticles([...articles, ..._articles ?? []]))
        .then(()=>{
          setLoadMoreArticles(false)
        })
    }
  }, [loadMoreArticles]);

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
    setLoading(true)
    fetchArticles(currentCategory).then((_articles) => setArticles(_articles)).then(setLoading(false))
  }, [, currentCategory]);

  function onArticleView(id) {
    setReadArticles([...readArticles, id]);
    router.push("/articles/" + id);
  }

  function handleLogout() {
    logOut().then(()=>{router.reload()});
  }

  function handleCategoriesChange(category) {
    setCurrentCategory(category);
  }

  return (
      <div>
        <Navbar 
        user={user} 
        onLogOut={handleLogout} 
        displayCategories={displayCategories} 
        currentCategory={currentCategory} 
        onCategoriesChange={handleCategoriesChange}/>
        <Container sx={{ py: 8 }} maxWidth="md">
  
          {(loading || articles.length === 0) ? <Loading/>
          :
          <Grid container spacing={4}>
            {articles.map((article) => {
                if (article.date)
                return (
                  <Grid item xs={12} key={article.id} sm={6} md={4}>
                    <FrontpageCard
                      isRead={readArticles?.includes(article.id)} 
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
