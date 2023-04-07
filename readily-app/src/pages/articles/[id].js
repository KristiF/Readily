import { collection, getFirestore } from "firebase/firestore";
import {firebaseConfig} from "../../src/firebaseConfig"
import { initializeApp } from "firebase/app";
import {doc} from "firebase/firestore"
import { getDoc, getDocs } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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

export default function ArticlePresenter(props) {
    return (
        <div>
            {props}
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
    let article = await fetchArticle(params.id)

	  return { props: {...article, date:article.date.toDate().toDateString()} }
  } 