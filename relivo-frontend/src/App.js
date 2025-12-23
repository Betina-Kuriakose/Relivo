import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import Map from "./pages/Map";
import Chatbot from "./pages/Chatbot";
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import NGOLogin from './pages/NGOLogin';
import UserDashboard from './pages/UserDashboard';
import NGODashboard from './pages/NGODashboard';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/login');
  const isSignupPage = location.pathname.includes('/signup');

  if (isLoginPage || isSignupPage) {
    return (
      <Routes>
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/ngo" element={<NGOLogin />} />
        <Route path="/signup/user" element={<UserSignup />} />
      </Routes>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="page-with-sidebar">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/map" element={<Map />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route 
            path="/dashboard/user" 
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            } 
          />
          <Route
            path="/dashboard/ngo"
            element={
              <PrivateRoute role="ngo">
                <NGODashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
