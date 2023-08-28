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
  deleteUser,
  signInWithPopup,
  EmailAuthProvider,
  browserLocalPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
      await signInWithRedirect(auth, provider);
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
        // Supprimer la collection "panier" de l'utilisateur
        const panierCollection = collection(db, `users/${user.uid}/panier`);
        const panierDocs = await getDocs(panierCollection);
        panierDocs.forEach(async (doc) => {
          console.log(doc);
          await deleteDoc(doc.ref);
        });

        // Supprimer la collection "history" de l'utilisateur
        const historyCollection = collection(db, `users/${user.uid}/history`);
        const historyDocs = await getDocs(historyCollection);
        historyDocs.forEach(async (doc) => {
          console.log(doc);
          await deleteDoc(doc.ref);
        });

        // Supprimer le compte utilisateur
        await deleteUser(user);

        // Supprimer le document utilisateur
        await deleteDoc(doc(db, "users", user.uid));
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

// import firebase from "firebase/app";
// import "firebase/firestore";

// // Initialiser Firebase
// firebase.initializeApp({
//   // Vos informations de configuration Firebase ici
// });

// // Récupérer une instance de Firestore
// const db = firebase.firestore();

// // Supprimer la collection "panier" de l'utilisateur avec l'ID "userId"
// const batchSize = 10;
// const collectionRef = collection(db, "users", userId, "panier");
// await deleteCollection(db, collectionRef, batchSize);

// // Supprimer la collection "history" de l'utilisateur avec l'ID "userId"
// const collectionRef = collection(db, "users", userId, "history");
// await deleteCollection(db, collectionRef, batchSize);

// // Fonction pour supprimer une collection Firestore en lots de documents
// async function deleteCollection(db, collectionRef, batchSize) {
//   const q = query(collectionRef, orderBy('name'), limit(batchSize));

//   return new Promise((resolve) => {
//     deleteQueryBatch(db, q, batchSize, resolve);
//   });
// }

// async function deleteQueryBatch(db, query, batchSize, resolve) {
//   const snapshot = await getDocs(query);

//   // When there are no documents left, we are done
//   let numDeleted = 0;
//   if (snapshot.size > 0) {
//     // Delete documents in a batch
//     const batch = writeBatch(db);
//     snapshot.docs.forEach((doc) => {
//       batch.delete(doc.ref);
//       numDeleted++;
//     });

//     await batch.commit();
//   }

//   if (numDeleted < batchSize) {
//     resolve();
//     return;
//   }

//   // Recurse on the next process tick, to avoid
//   // exploding the stack.
//   setTimeout(() => {
//     deleteQueryBatch(db, query, batchSize, resolve);
//   }, 0);
// }
