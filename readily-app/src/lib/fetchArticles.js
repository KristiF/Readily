import { db } from "./firebaseConfig";

import { doc, getDoc, collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";

export async function fetchArticles(category="All") {
  const articlesRef = collection(db, "articles");
  let q;
  (category === "All") ?
    q = query(
      articlesRef,
      orderBy("date", "desc"),
      limit(12),
    )
  :
    q = query(
      articlesRef,
      where("category", "==", category),
      orderBy("date", "desc"),
      limit(12),
    );
  const articlesSnap = await getDocs(q);
  const articles = articlesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(`Fetched ${articles.length} articles for category '${category}'`);
  return articles;

}

export async function fetchMoreArticles(category, start) {
    const articlesRef = collection(db, "articles");
    let q;
    (category === "All") ?
      q = query(
        articlesRef,
        orderBy("date", "desc"),
        startAfter(start.date),
        limit(12),
      )
    :
      q = query(
        articlesRef,
        where("category", "==", category),
        orderBy("date", "desc"),
        startAfter(start.date),
        limit(12),
      );  
    const articlesSnap = await getDocs(q);
    var articles = [];
    articlesSnap.forEach((article) =>
        articles.push({ ...article.data(), id: article.id })
    );
    return Promise.all(articles);
}  

export async function fetchArticle(id) {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function fetchArticlesId(ids) {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, where("__name__", "in", ids));
  const articlesSnap = await getDocs(q);
  const articles = articlesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return articles;
}