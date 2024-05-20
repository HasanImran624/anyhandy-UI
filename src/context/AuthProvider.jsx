import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const setAuth = (data) => {
    const expirationTime =
      data.expirationTime || new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("name", data.username);
    setIsSignedIn(!!data.token);
  };

  return (
    <AuthContext.Provider value={{ setAuth, isSignedIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
