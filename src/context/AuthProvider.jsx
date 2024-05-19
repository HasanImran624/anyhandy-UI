import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const setAuth = (data) => {
    const expirationTime =
      data.expirationTime || new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours from now
    localStorage.setItem("tokenExpiration", expirationTime);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("name", data.username);
    setIsSignedIn(!!data.token);

    data.token &&
      setTimeout(() => {
        const currentExpirationTime = localStorage.getItem("tokenExpiration");
        if (
          currentExpirationTime &&
          new Date().getTime() > currentExpirationTime
        ) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("name");
          navigate("/signIn");
        }
      }, 8 * 60 * 60 * 1000);
  };

  return (
    <AuthContext.Provider value={{ setAuth, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
