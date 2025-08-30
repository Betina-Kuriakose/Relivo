import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Relivo</h1>
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/donations" className="hover:text-gray-200">Donations</Link></li>
        <li><Link to="/map" className="hover:text-gray-200">Map</Link></li>
        <li><Link to="/chatbot" className="hover:text-gray-200">Chatbot</Link></li>
        <li><Link to="/login" className="hover:text-gray-200">Login</Link></li> {/* Added Login link */}
        <li><Link to="/login/user" className="hover:text-gray-200">User Login</Link></li>
        <li><Link to="/login/ngo" className="hover:text-gray-200">NGO Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
