import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import Map from "./pages/Map";
import Chatbot from "./pages/Chatbot";
import UserLogin from './pages/UserLogin';
import NGOLogin from './pages/NGOLogin';
import UserDashboard from './pages/UserDashboard';
import NGODashboard from './pages/NGODashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/ngo" element={<NGOLogin />} />
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
    </Router>
  );
}

export default App;
