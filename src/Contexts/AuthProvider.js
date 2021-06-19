import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const value = {
    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
