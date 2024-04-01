import React from "react";
import HeroDashboard from "../pages/HeroDashboard";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Main } from "../pages/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollRestore } from "../Components/ScrollRestore";
import UserProfile from "../pages/UserProfile";
import UserProtectedRoutes from "../utils/UserProtectedRoutes";
import MyJobs from '../pages/MyJobs';

function DashboardRoutes() {
  return (
    <>
      <ScrollRestore />
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="userdashboard" element={<HeroDashboard />} />
        <Route path="myJobs" element={<MyJobs />} />

        {/* <Route path="/*" element={ <HeroProtectedRoutes />} >
            <Route path="userdashboard" element={ <HeroDashboard />} />
          </Route> */}

        <Route path="/*" element={<UserProtectedRoutes />}>
          <Route path="userProfile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default DashboardRoutes;
