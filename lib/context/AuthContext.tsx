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
  deleteUser,
  signInWithPopup,
} from "firebase/auth";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const createUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setCookie("user", currentUser.uid, {
            maxAge: 60 * 60 * 24 * 7,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "strict",
            httpOnly: true,
            path: "/",
            domain: "localhost",
          });
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
          router.push("/compte");
        }
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        setCookie("user", currentUser.uid, {
          maxAge: 60 * 60 * 24 * 7,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: true,
          sameSite: "strict",
          httpOnly: true,
          path: "/",
          domain: "localhost",
        });
        router.push("/compte");
      }
    } catch (error) {
      console.error("Failed to sign in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Cookies.set("user", currentUser.uid, {
        //   expires: 7,
        //   secure: true,
        //   sameSite: "strict",
        // });

        setCookie("user", currentUser.uid, {
          maxAge: 60 * 60 * 24 * 7,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: true,
          sameSite: "strict",
          httpOnly: true,
          path: "/",
          domain: "localhost",
        });
      }
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    } finally {
      setIsLoading(false);
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
        deleteCookie("user", { path: "/", domain: "localhost" });
        deleteCookie("panier", { path: "/", domain: "localhost" });

        const historyCollection = collection(db, `users/${user.uid}/history`);
        const historyDocs = await getDocs(historyCollection);
        historyDocs.forEach(async (doc) => {
          console.log(doc);
          await deleteDoc(doc.ref);
        });

        await deleteUser(user);

        await deleteDoc(doc(db, "users", user.uid));
      }
    } catch (error: any) {
      console.error("Failed to delete account:", error);
    }
  };

  const logOut = () => {
    setIsLoading(true);
    try {
      setUser(null);
      signOut(auth);
      deleteCookie("user", { path: "/", domain: "localhost" });
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (
        currentUser &&
        currentUser.providerData[0].providerId !== "password"
      ) {
        setDoc(doc(db, "users", currentUser.uid), {
          firstName: currentUser.displayName?.split(" ")[0],
          lastName: currentUser.displayName?.split(" ")[1],
          email: currentUser.email,
          image: currentUser.photoURL,
          uid: currentUser.uid,
          emailVerified: currentUser.emailVerified,
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        signIn,
        isLoading,
        updateFirstNameUser,
        updateLastNameUser,
        updateEmailUser,
        updatePasswordUser,
        resetPassword,
        reauthenticate,
        reauthenticateWithGoogle,
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
