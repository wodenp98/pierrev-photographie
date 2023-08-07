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
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    await getRedirectResult(auth).then((result) => {
      if (result?.user) {
        setDoc(doc(db, "users", result.user.uid), {
          id: result.user.uid,
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          image: result.user.photoURL,
          firstName: result.user.displayName?.split(" ")[0],
          lastName: result.user.displayName?.split(" ")[1],
        }).then(() => {
          router.push("/");
        });
      }
    });
  };

  const deleteAccount = async () => {
    await deleteUser(user).then(() => {
      deleteDoc(doc(db, "users", user.uid));
      router.push("/login");
    });
  };

  const logOut = () => {
    setUser(null);
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
