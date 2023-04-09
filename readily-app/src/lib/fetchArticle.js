import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export async function fetchArticle() {
    const db = getFirestore(app)
    const docRef = collection(db, "articles");
    const articlesCollection = await query(docRef, orderBy("date", "desc"), limit(12))
    const allArticles = await getDocs(articlesCollection);
    return allArticles.docs
}