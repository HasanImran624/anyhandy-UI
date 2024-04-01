import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { NavBar_Dashboard } from "../Navbar/NavBar_Dashboard";
import { Main } from "../../pages/Main";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(0);

  if (["/", "/signUp", "/signIn"].includes(location.pathname)) {
    if (isLogin === 0) {
      setIsLogin(1);
    }
    return (
      <>
        <div>{children}</div>
      </>
    );
  }
  debugger;
  if (["/userdashboard"].includes(location.pathname)) {

    const jwt_token = localStorage.getItem('jwt');
    const userName = localStorage.getItem('name');

    if (jwt_token != null && userName != null) {
      return (
        <>
          {isLogin === 0 ? <NavBar_Dashboard /> : <Navbar />}
          {children}
          <Footer />
        </>
      );
    } else {
      return (
        <>
          {/* {isLogin === 0 ? <NavBar_Dashboard /> : <Navbar />} */}
          <Main />
          <Footer />
        </>
      );
    }

  }
  return (
    <>
      {isLogin === 0 ? <NavBar_Dashboard /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
};
export default Layout;
