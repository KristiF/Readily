import ArticleCard from "@/components/ArticleCard";
import {fetchArticles, fetchArticle} from "@/lib/fetchArticles";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
export default function Article(props) {
  const { user, savedArticles, setSavedArticles } = useContext(UserDataContext);

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
  const router = useRouter()
    function handleReturn() {
        router.push("/")
    }
    return (
        <div>
            <ArticleCard savedArticles={savedArticles} onArticleSave={handleArticleSave} onReturn={handleReturn} props={props}/>
        </div>
    )
}

export async function getStaticPaths() {
    const articles = await fetchArticles();
    let paths = articles.map(article => {
      return {
        params: {
          id: article.id
        }
      }
    });

    return {
      paths,
      fallback: true
    }
  }

export async function getStaticProps({ params }) {
  let article = await fetchArticle(params.id) ?? null;

  return { props: JSON.parse(JSON.stringify(article))}
} 