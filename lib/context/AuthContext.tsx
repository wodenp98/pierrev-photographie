"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  setPersistence,
  browserSessionPersistence,
  deleteUser,
  signInWithPopup,
  EmailAuthProvider,
  browserLocalPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

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
      setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider).then(() => {
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

  const reauthenticate = async (credential: any) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await reauthenticateWithCredential(currentUser, credential);
      }
    } catch (error) {
      console.error("Re-authentication failed:", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };

  const reauthenticateWithGoogle = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(currentUser, provider);
      }
    } catch (error) {
      console.error("Re-authentication with Google failed:", error);
      throw error;
    }
  };

  const updateFirstNameUser = async (firstName: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: `${firstName} ${user.displayName?.split(" ")[1]}`,
        }).then(() => {
          updateDoc(doc(db, "users", currentUser.uid), {
            firstName: firstName,
          });
        });
      }
    } catch (error) {
      console.error("Failed to update first name:", error);
    }
  };

  const updateLastNameUser = async (lastName: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: `${user.displayName?.split(" ")[0]} ${lastName}`,
        }).then(() => {
          updateDoc(doc(db, "users", currentUser.uid), {
            lastName: lastName,
          });
        });
      }
    } catch (error) {
      console.error("Failed to update last name:", error);
    }
  };

  const updateEmailUser = async (email: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateEmail(currentUser, email).then(() => {
          updateDoc(doc(db, "users", currentUser.uid), {
            email: email,
          });
        });
      }
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  const updatePasswordUser = async (password: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updatePassword(currentUser, password);
      }
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Failed to reset password:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user).then(() => {
          // delete panier
          deleteDoc(doc(db, "users", user.uid));
          toast({
            className: "bg-red-500 text-white",
            title: "Votre compte a été supprimé",
            duration: 3000,
          });
        });
      }
    } catch (error: any) {
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
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        signIn,
        updateFirstNameUser,
        updateLastNameUser,
        updateEmailUser,
        updatePasswordUser,
        resetPassword,
        reauthenticate,
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
