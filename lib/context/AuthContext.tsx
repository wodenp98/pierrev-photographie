"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  deleteUser,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const deleteAccount = async () => {
    await deleteUser(user).then(() => {
      deleteDoc(doc(db, "users", user.uid));
    });
  };

  const logOut = () => {
    setUser(null);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setDoc(doc(db, "users", currentUser.uid), {
          id: currentUser.uid,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          image: currentUser.photoURL,
          firstName: currentUser?.displayName?.split(" ")[0],
          lastName: currentUser.displayName?.split(" ")[1],
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
