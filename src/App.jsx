import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollRestore } from "./Components/ScrollRestore";
import HeroDashboard from "./pages/HeroDashboard";
import HeroProtectedRoutes from "./utils/HeroProtectedRoutes";
import UserProfile from "./pages/UserProfile";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import DashboardRoutes from "./routes/DashboardRoutes";
import JobsListing from "./Components/DashboardComponents/JobListing/JobsListing";

function App() {
  return (
    <>
      <>
        <DashboardLayout children={<DashboardRoutes />} />
      </>
    </>
  );
}
export default App;
