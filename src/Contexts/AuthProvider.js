import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app';
import "firebase/auth";

const AuthContext=React.createContext();

export function useAuth(){
    useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [user,setCurrentUser]=useState();

    const signup=(email,password)=>{
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    const login=(email,password)=>{
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    useEffect(()=>{
        const unsubscribe=firebase.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user);
        })
        return unsubscribe;
    },[])

    const value={
        signup,
        login,
        user
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


