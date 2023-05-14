// import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signOut,
  reauthenticateWithCredential
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
  savedArticles: [],
  readArticles: [],
});

// Custom hook to read  auth record and user profile doc
export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [readArticles, setReadArticles] = useState([]);

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
          setSavedArticles(docSnap.data().savedArticles);
          setReadArticles(docSnap.data().readArticles);
        }
        setLoading(false);
      });
    }
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        savedArticles: savedArticles,
        readArticles: readArticles,
      });
    }
  }, [savedArticles, readArticles]);

  async function logIn(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }

  async function logOut() {
    return signOut(getAuth());
  }

  async function changeEmail(currentUser, newEmail) {
    return updateEmail(currentUser, newEmail);
  }

  async function changePassword(currentUser, newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  async function signUp(email, password) {
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

  return (
    <UserDataContext.Provider
      value={{
        user,
        loading,
        logIn,
        logOut,
        signUp,
        savedArticles,
        setSavedArticles,
        readArticles,
        setReadArticles,
        changeEmail,
        changePassword,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
