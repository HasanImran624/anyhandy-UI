import React from "react";
import { useContext, useEffect } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { Home } from "../Components/Home/Home";
import { About } from "../Components/About/About";
import { Package } from "../Components/Package/Package";
import { Footer } from "../Components/Footer/Footer";
import { Review } from "../Components/Review/Review";
import { FAQs } from "../Components/FAQs/FAQs";
import { AuthContext } from "../context";

export const Main = () => {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem("tokenExpiration");
      const currentTime = new Date().getTime();

      if (expirationTime && currentTime > expirationTime) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("name");
        setAuth({});
      } else {
        setAuth({
          token: localStorage.getItem("jwt"),
          expirationTime: expirationTime,
          username: localStorage.getItem("name"),
        });
      }
    };

    checkTokenExpiration();
  }, [setAuth]);

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Package />
      <Review />
      <FAQs />
      <Footer />
    </>
  );
};
