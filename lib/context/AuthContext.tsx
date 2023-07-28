// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../firebase/index";

// const AuthContext = createContext<any>({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   console.log(user);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser({
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName,
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signup = (email: string, password: string) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email: string, password: string) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     setUser(null);
//     await signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {loading ? null : children}
//     </AuthContext.Provider>
//   );
// };

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  // console.log(user);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const deleteAccount = async () => {
    await deleteUser(user);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
