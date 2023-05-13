// import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const UserDataContext = React.createContext({
  user: null,
  setUser: () => {},
});

// Custom hook to read  auth record and user profile doc
export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [savedArticles, setSavedArticles] = useState(null);
  const [readArticles, setReadArticles] = useState(null);

  useEffect(() => {
    setLoading(true);
    var unsubscribe = onAuthStateChanged(getAuth(), (_user) => {
      if (_user) setUser(_user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const ref = doc(db, "users", user.uid);
      var unsubscribe = onSnapshot(ref, (docSnap) => {
        if (docSnap.exists()) {
          const _name = `${docSnap.data().firstName} ${
            docSnap.data().lastName
          }`;
          setName(_name);
        }
        setLoading(false);
      });
    }
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (user && tokens) {
      updateDoc(doc(db, "users", user.uid), {
        tokens: tokens,
        unlockedArticles: unlockedArticles,
      });
    }
  }, [savedArticles, readArticles]);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(getAuth(), email, password).then(
      (resp) => {
        setDoc(doc(db, "users", resp.user.uid), {
          email: email,
          savedArticles: [],
          readArticles: [],
        });
      }
    );
  }

  function likeArticle(articleId, uid) {
    const userDocRef = doc(db, "users", uid);
    return updateDoc(userDocRef, { savedArticles: arrayUnion(articleId) });
  }

  return (
    <UserDataContext.Provider value={{ user, loading, logIn, logout, signup, likeArticle }}>
      {children}
    </UserDataContext.Provider>
  );
};
