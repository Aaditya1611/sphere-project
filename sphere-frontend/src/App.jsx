import React from "react";
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Login from "./login/loginpage";
import Signup from "./signup/signupPage";
import ForgotPassword from "./login/forgotpasswd";

const App = () => {

  return(
   <Router>
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup"  element={<Signup />} />
      <Route path="/forgotpasswd" element={<ForgotPassword />} />
      </Routes>
    </div>
   </Router>
  )
}

export default App;
