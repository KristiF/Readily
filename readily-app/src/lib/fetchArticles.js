import { db, app } from "@/firebaseConfig";

import { doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export async function fetchArticles() {
    const articlesRef = collection(db, "articles")
    const q = query(articlesRef, orderBy("date", "desc"), limit(12))

    const articlesSnap = await getDocs(q);
    var articles = []
    articlesSnap.forEach(article=>articles.push({...article.data(), id:article.id}))
    return Promise.all(articles);
}