import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [open, setOpen] = useState(false); // mobile drawer
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setUserRole(role || '');
  }, []);

  useEffect(() => {
    // close on route change (mobile)
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  const NavItem = ({ to, label, emoji }) => (
    <Link
      to={to}
      className={`sb-link ${isActive(to) ? 'active' : ''}`}
    >
      <span className="sb-emoji" aria-hidden>{emoji}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile top bar with menu button */}
      <div className="sb-topbar md-hidden">
        <button
          className="sb-burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="sb-brand-mini">
          <span className="sb-brand-icon" aria-hidden>🚨</span>
          <span className="sb-brand-text">Relivo</span>
        </Link>
        <Link to="/donations" className="sb-cta-mini">Donate</Link>
      </div>

      {/* Sidebar */}
      <aside className={`sb-root ${open ? 'open' : ''}`}>
        <div className="sb-brand">
          <span className="sb-brand-icon" aria-hidden>🚨</span>
          <span className="sb-brand-text">Relivo</span>
        </div>

        <nav className="sb-nav">
          <NavItem to="/" label="Home" emoji="🏠" />
          <NavItem to="/donations" label="Donations" emoji="💝" />
          <NavItem to="/map" label="Map" emoji="🗺️" />
          <NavItem to="/chatbot" label="Chatbot" emoji="🤖" />
        </nav>

        <div className="sb-cta">
          <Link to="/donations" className="sb-donate">Donate</Link>
        </div>

        <div className="sb-divider" />

        <div className="sb-auth">
          {isLoggedIn ? (
            <>
              <Link
                to={userRole === 'ngo' ? '/dashboard/ngo' : '/dashboard/user'}
                className="sb-link"
              >
                <span className="sb-emoji" aria-hidden>📊</span>
                <span>Dashboard</span>
              </Link>
              <button className="sb-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavItem to="/login/user" label="User Login" emoji="👤" />
              <NavItem to="/login/ngo" label="NGO Login" emoji="🏢" />
            </>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && <div className="sb-overlay" onClick={() => setOpen(false)} aria-hidden></div>}
    </>
  );
};

export default Sidebar;


