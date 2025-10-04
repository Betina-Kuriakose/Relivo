import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setUserRole(role || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        🚨 Relivo
      </Link>
      
      <ul className="flex gap-6 items-center">
        <li><Link to="/" className="hover:text-gray-200 transition">Home</Link></li>
        <li><Link to="/donations" className="hover:text-gray-200 transition">Donations</Link></li>
        <li><Link to="/map" className="hover:text-gray-200 transition">Map</Link></li>
        <li><Link to="/chatbot" className="hover:text-gray-200 transition">Chatbot</Link></li>
        
        {isLoggedIn ? (
          <>
            <li>
              <Link 
                to={userRole === 'ngo' ? '/dashboard/ngo' : '/dashboard/user'} 
                className="hover:text-gray-200 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login/user" className="hover:text-gray-200 transition">User Login</Link></li>
            <li><Link to="/login/ngo" className="hover:text-gray-200 transition">NGO Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
