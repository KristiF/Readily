import { collection, getFirestore } from "firebase/firestore";
import { doc } from "firebase/firestore"
import { getDoc, getDocs } from "firebase/firestore";
import ArticleCard from "@/components/ArticleCard";
import { app } from "../../firebaseConfig"


const db = getFirestore(app);

async function fetchArticle(id) {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

async function fetchArticles() {
  let articles = []
  const articlesSnap = await getDocs(collection(db, "articles"));
  articlesSnap.forEach(articleDoc=>articles.push({...articleDoc.data(), id:articleDoc.id}))
  return articles;
}

export default function Article(props) {
    return (
        <div>
            <ArticleCard props={props}/>
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

	  return { props: {...article, date: ""}}
  } 