import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    familiesHelped: 0,
    pendingDonations: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/ngo');
      return;
    }

    fetchNGOData();
  }, [navigate]);

  const fetchNGOData = async () => {
    try {
      setLoading(true);
      const [donationsRes, familiesRes] = await Promise.all([
        axios.get('http://localhost:5000/donation/'),
        axios.get('http://localhost:5000/family/').catch(() => ({ data: [] }))
      ]);

      const donationsData = donationsRes.data;
      const familiesData = familiesRes.data;

      setDonations(donationsData);
      setFamilies(familiesData);

      const totalAmount = donationsData.reduce((sum, donation) => sum + (donation.amount || 0), 0);
      const pendingDonations = donationsData.filter(d => d.status === 'Pending').length;
      const familiesHelped = familiesData.filter(f => f.status === 'Resolved').length;

      setStats({
        totalDonations: donationsData.length,
        totalAmount,
        familiesHelped,
        pendingDonations
      });
    } catch (error) {
      console.error('Error fetching NGO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/donation/${donationId}`, { status: newStatus });
      fetchNGOData(); // Refresh data
    } catch (error) {
      console.error('Error updating donation status:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
        <p>Loading NGO dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🏢 NGO Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="ngo-stats">
        <div className="ngo-stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{stats.totalAmount.toLocaleString()}</div>
          <div className="stat-label">Total Funds Managed</div>
        </div>
        <div className="ngo-stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.totalDonations}</div>
          <div className="stat-label">Donations Received</div>
        </div>
        <div className="ngo-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.familiesHelped}</div>
          <div className="stat-label">Families Helped</div>
        </div>
        <div className="ngo-stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{stats.pendingDonations}</div>
          <div className="stat-label">Pending Actions</div>
        </div>
      </div>

      <div className="management-section">
        <h3>Donation Management</h3>
        <div className="donations-list">
          {donations.slice(0, 5).map((donation, index) => (
            <div key={index} className="donation-item">
              <div className="donation-info">
                <h3>{donation.donorName}</h3>
                <p>Type: {donation.type}</p>
                <p>Amount: ₹{donation.amount}</p>
                <p>Date: {new Date(donation.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="donation-actions">
                <div className={`donation-status ${donation.status.toLowerCase()}`}>
                  {donation.status}
                </div>
                {donation.status === 'Pending' && (
                  <div className="action-buttons">
                    <button 
                      onClick={() => updateDonationStatus(donation._id, 'Approved')}
                      className="management-btn"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateDonationStatus(donation._id, 'Assigned')}
                      className="management-btn"
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="management-section">
        <h3>Family Management</h3>
        <div className="families-list">
          {families.slice(0, 5).map((family, index) => (
            <div key={index} className="family-item">
              <div className="family-info">
                <h3>{family.familyName}</h3>
                <p>Location: {family.location}</p>
                <p>Members: {family.membersCount}</p>
                <p>Needs: {Object.entries(family.needs).filter(([key, value]) => value).map(([key]) => key).join(', ')}</p>
              </div>
              <div className={`family-status ${family.status.toLowerCase()}`}>
                {family.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => navigate('/map')} className="action-btn primary">
            🗺️ View Relief Map
          </button>
          <button onClick={() => navigate('/chatbot')} className="action-btn secondary">
            🤖 AI Assistant
          </button>
          <button onClick={fetchNGOData} className="action-btn secondary">
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
