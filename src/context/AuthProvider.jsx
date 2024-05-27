import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");

  const signOut = () => {
    localStorage.clear();
    setFullName("");
    navigate("/");
  };

  const setAuth = (data) => {
    const expirationTime =
      data.expirationTime || new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("name", data.username);
    setFullName(data.username);
  };

  return (
    <AuthContext.Provider value={{ setAuth, signOut, fullName }}>
      {children}
    </AuthContext.Provider>
  );
};
