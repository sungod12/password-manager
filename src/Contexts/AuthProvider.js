import React, { useContext } from "react";
import Axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const url = process.env.REACT_APP_API_END_POINT;
  const signup = (email, password) => {
    return Axios.post(`${url}/register`, { email, password });
  };

  const login = (email, password) => {
    return Axios.post(`${url}/login`, { email, password });
  };

  const resetPass = (email) => {
    return Axios.post(`${url}/resetPassword`, { email });
  };

  const logout = () => {
    return Axios.post(`${url}/logout`);
  };

  const value = {
    signup,
    login,
    resetPass,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
