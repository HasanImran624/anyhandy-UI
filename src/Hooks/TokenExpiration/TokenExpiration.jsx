import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";

export const TokenExpiration = () => {
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!!token) {
      const interval = setInterval(() => {
        const currentExpirationTime = localStorage.getItem("tokenExpiration");
        if (
          currentExpirationTime &&
          new Date().getTime() > Number(currentExpirationTime)
        ) {
          console.log(
            "Token expired, clearing localStorage and navigating to signIn"
          );
          signOut();
        }
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [signOut]);

  return null;
};
