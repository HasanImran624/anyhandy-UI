import { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const setAuth = (data) => {
    const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours from now
    localStorage.setItem("tokenExpiration", expirationTime);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("name", data.username);

    setTimeout(() => {
      const currentExpirationTime = localStorage.getItem("tokenExpiration");
      if (
        currentExpirationTime &&
        new Date().getTime() > currentExpirationTime
      ) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("name");
      }
    }, 8 * 60 * 60 * 1000);
  };

  return (
    <AuthContext.Provider value={{ setAuth }}>{children}</AuthContext.Provider>
  );
};
