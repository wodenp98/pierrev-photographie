"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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

  const createUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("currentUser", currentUser);

          setDoc(doc(db, "users", currentUser.uid), {
            firstName: firstName,
            lastName: lastName,
            email: currentUser.email,
            image: currentUser.photoURL,
            uid: currentUser.uid,
            emailVerified: currentUser.emailVerified,
          }).then(() => {
            updateProfile(currentUser, {
              displayName: `${firstName} ${lastName}`,
            });
          });
        }
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(() => {
        const user = auth.currentUser;

        if (user) {
          setDoc(doc(db, "users", user.uid), {
            firstName: user.displayName?.split(" ")[0],
            lastName: user.displayName?.split(" ")[1],
            email: user.email,
            image: user.photoURL,
            uid: user.uid,
            emailVerified: user.emailVerified,
          });
        }
      });
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user).then(() => {
          deleteDoc(doc(db, "users", user.uid));
        });
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const logOut = () => {
    try {
      setUser(null);
      signOut(auth);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("secondUser", currentUser);
      // if (currentUser) {
      //   try {
      //     setDoc(doc(db, "users", currentUser.uid), {
      //       firstName: currentUser.displayName?.split(" ")[0],
      //       lastName: currentUser.displayName?.split(" ")[1],
      //       email: currentUser.email,
      //       image: currentUser.photoURL,
      //       uid: currentUser.uid,
      //       emailVerified: currentUser.emailVerified,
      //     });
      //   } catch (error) {
      //     console.error("Failed to update user data:", error);
      //   }
      // }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        signIn,
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
