import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (to) => {
    try {
      if (to === "/") return location.pathname === "/";
      return location.pathname.startsWith(to);
    } catch {
      return false;
    }
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/60 transition ${
        isActive(to)
          ? "bg-white/20 shadow-inner"
          : "hover:bg-blue-500/20"
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="rlv-header sticky top-0 z-50 bg-blue-600/95 backdrop-blur text-white shadow-md">
      <nav className="rlv-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 group-hover:bg-white/30 transition">
                <span aria-hidden>🚨</span>
              </span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight hover:text-gray-200">Relivo</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="rlv-links hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/donations">Donations</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/chatbot">Chatbot</NavLink>
            <Link
              to="/donations"
              className="rlv-donate ml-2 px-4 py-2 rounded-md bg-amber-400 text-blue-900 font-semibold hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
              onClick={() => setMenuOpen(false)}
            >
              Donate
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                <NavLink to={userRole === 'ngo' ? '/dashboard/ngo' : '/dashboard/user'}>Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 ml-2">
                <NavLink to="/login/user">User Login</NavLink>
                <NavLink to="/login/ngo">NGO Login</NavLink>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="rlv-mobile md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="rlv-mobile-panel md:hidden bg-blue-600/95 backdrop-blur px-4 pb-4">
          <div className="rlv-mobile-list flex flex-col gap-1 pt-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/donations">Donations</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/chatbot">Chatbot</NavLink>
            <Link
              to="/donations"
              className="mt-1 px-3 py-2 rounded-md bg-amber-400 text-blue-900 font-semibold text-center hover:bg-amber-300"
              onClick={() => setMenuOpen(false)}
            >
              Donate
            </Link>
            {isLoggedIn ? (
              <>
                <NavLink to={userRole === 'ngo' ? '/dashboard/ngo' : '/dashboard/user'}>Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="mt-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-left font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login/user">User Login</NavLink>
                <NavLink to="/login/ngo">NGO Login</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
