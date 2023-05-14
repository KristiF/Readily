import { db } from "./firebaseConfig";

import { doc, getDoc, collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

export async function fetchArticles() {
    const articlesRef = collection(db, "articles");
    const q = query(
      articlesRef,
      orderBy("date", "desc"),
      limit(12),
    );
  
    const articlesSnap = await getDocs(q);
    var articles = [];
    articlesSnap.forEach((article) =>
      articles.push({ ...article.data(), id: article.id })
    );
    return Promise.all(articles);
  }
export async function fetchMoreArticles(start) {
    const articlesRef = collection(db, "articles");
    const q = query(
        articlesRef,
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