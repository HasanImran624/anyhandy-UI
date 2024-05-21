import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const isSignedIn = useMemo(() => {
    return !!localStorage.getItem("jwt");
  }, []);

  const setAuth = (data) => {
    const expirationTime =
      data.expirationTime || new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("name", data.username);
  };

  return (
    <AuthContext.Provider value={{ setAuth, isSignedIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
