import { useEffect, useContext } from "react";
import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import Services from "./pages/Services";
import HeroDashboard from "./pages/HeroDashboard";
import UserProfile from "./pages/UserProfile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestore } from "./Components/ScrollRestore";
import HeroProtectedRoutes from "./utils/HeroProtectedRoutes";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import JobPosting from "./pages/JobPosting";
import InviteHandyman from "./pages/InviteHandyman";
import { AuthContext } from "./context";

function App() {
  const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollRestore />
        <Routes>
          <Route path="/" element={<Main />} exact />
          <Route path="/services" element={<Services />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/jobPosting" element={<JobPosting />} />
          <Route
            path="/jobPosting/inviteHandyman"
            element={<InviteHandyman />}
          />

          <Route path="/*" element={<HeroProtectedRoutes />}>
            <Route path="hero-dashboard" element={<HeroDashboard />} />
          </Route>

          <Route path="/*" element={<UserProtectedRoutes />}>
            <Route path="userProfile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
