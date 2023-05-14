import ArticleCard from "@/components/ArticleCard";
import {fetchArticles, fetchArticle} from "@/lib/fetchArticles";
import { useRouter } from "next/router";
export default function Article(props) {
  const router = useRouter()
    function handleReturn() {
        router.push("/")
    }
    return (
        <div>
            <ArticleCard onReturn={handleReturn} props={props}/>
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