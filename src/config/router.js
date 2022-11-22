import React from "react";
import {
  BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import SignUp from "../masterlogin/signup";
import Login from "../masterlogin/login";
import Dashboard from "../pages/Dashboard";
import Form from "../userpages/form";
import UserHome from "../userpages/userhome";
import Transpoter from "../transporter/transpoter";
import Transpotersignup from "../transporter/transpotersignup";

export default function AppRouter() {
  return (
    // Derfine Main Routes
    <Router>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="transpotersignup" element={<Transpotersignup/>}/>
        <Route path="transpoter/*" element={<Transpoter/>}/>
        <Route path="dashboard/*" element={<Dashboard/>}/>
        <Route path="userhome/*" element={<UserHome/>}/>
      </Routes>
    </Router>
  );
}

