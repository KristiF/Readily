// import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { Mixpanel } from "./mixpanel";

export const UserDataContext = React.createContext({user:null, setUser: () => {}})

// Custom hook to read  auth record and user profile doc
export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  
  useEffect(()=> {
    setLoading(true)
    var unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user) 
        setUser(_user);
      setLoading(false);
    });
    return unsubscribe;
  }, [])

  useEffect(()=> {
    if (user) {
      setLoading(true);
      const ref =  (doc(db, "users", user.uid));
      var unsubscribe = onSnapshot(ref, (docSnap)=> {
        if (docSnap.exists()){ 
          const _name = `${docSnap.data().firstName} ${docSnap.data().lastName}`
          setName(_name)
        }
        setLoading(false) 
      });
    }
    return unsubscribe;
  }, [user])

  useEffect(()=> {
    if (user && tokens) {
      updateDoc(doc(db, "users", user.uid), {"tokens": tokens, "unlockedArticles": unlockedArticles})
    }
  }, [savedArticles, readArticles]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return auth.signOut();
  }
  
  return  (
    <UserDataContext.Provider value={{ user, loading, login, logout }}>{children}</UserDataContext.Provider> 
  );
}

