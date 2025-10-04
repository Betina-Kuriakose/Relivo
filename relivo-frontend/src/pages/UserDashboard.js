import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonated: 0,
    donationsCount: 0,
    pendingDonations: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/user');
      return;
    }

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/donation/');
      const donations = response.data;
      
      // For demo purposes, we'll show all donations
      // In a real app, you'd filter by user ID
      setUserDonations(donations.slice(0, 10)); // Show last 10 donations
      
      const totalDonated = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
      const pendingDonations = donations.filter(d => d.status === 'Pending').length;
      
      setStats({
        totalDonated,
        donationsCount: donations.length,
        pendingDonations
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👤 User Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{stats.totalDonated.toLocaleString()}</div>
          <div className="stat-label">Total Donated</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.donationsCount}</div>
          <div className="stat-label">Donations Made</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{stats.pendingDonations}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Donations</h2>
        <div className="donations-list">
          {userDonations.length > 0 ? (
            userDonations.map((donation, index) => (
              <div key={index} className="donation-item">
                <div className="donation-info">
                  <h3>{donation.donorName}</h3>
                  <p>Type: {donation.type}</p>
                  <p>Amount: ₹{donation.amount}</p>
                </div>
                <div className={`donation-status ${donation.status.toLowerCase()}`}>
                  {donation.status}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No donations found. <button onClick={() => navigate('/donations')}>Make your first donation</button></p>
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => navigate('/donations')} className="action-btn primary">
            💝 Make Donation
          </button>
          <button onClick={() => navigate('/map')} className="action-btn secondary">
            🗺️ Track Relief
          </button>
          <button onClick={() => navigate('/chatbot')} className="action-btn secondary">
            🤖 AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
