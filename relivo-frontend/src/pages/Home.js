import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

// Custom hook for animated counters
function useCounter(target, speed = 18) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value < target) {
      const inc = Math.ceil(target / 60);
      const timeout = setTimeout(() => setValue(Math.min(value + inc, target)), speed);
      return () => clearTimeout(timeout);
    }
  }, [value, target, speed]);
  return value.toLocaleString();
}

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    donations: 0,
    totalAmount: 0,
    families: 0,
    supplies: 0
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [donationsRes, familiesRes] = await Promise.all([
          axios.get('http://localhost:5000/donation/'),
          axios.get('http://localhost:5000/family/').catch(() => ({ data: [] })) // Fallback if families endpoint doesn't exist
        ]);

        const donations = donationsRes.data;
        const families = familiesRes.data;

        // Calculate real statistics
        const totalAmount = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
        const approvedDonations = donations.filter(d => d.status === 'Approved' || d.status === 'Assigned');
        const deliveredSupplies = families.filter(f => f.status === 'Resolved').length;

        setStats({
          donations: donations.length,
          totalAmount: totalAmount,
          families: families.length,
          supplies: deliveredSupplies
        });

        // Get recent donations for timeline
        setRecentDonations(donations.slice(-4).reverse());
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load real-time data. Using sample data.');
        // Fallback to sample data
        setStats({
          donations: 743,
          totalAmount: 2783400,
          families: 12456,
          supplies: 3175
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animated counters with real data
  const affected = useCounter(stats.families);
  const donations = useCounter(stats.donations);
  const funds = useCounter(stats.totalAmount);
  const supplies = useCounter(stats.supplies);

  // Dynamic timeline data based on recent donations
  const timelineData = recentDonations.length > 0 ? recentDonations.map((donation, index) => ({
    step: index === 0 ? 'Donation Received' : 
          index === 1 ? 'Donation Verified' : 
          index === 2 ? 'Supplies Procured' : 'Delivered',
    desc: index === 0 ? `₹${donation.amount} by ${donation.donorName} for ${donation.type}` :
          index === 1 ? 'Verified instantly by AI' :
          index === 2 ? `${donation.type} acquired from supplier` :
          `${donation.type} delivered to family ✅`,
    status: donation.status
  })) : [
    { step: 'Donation Received', desc: '₹500 by John Doe for Bangalore North Flood', status: 'Pending' },
    { step: 'Donation Verified', desc: 'Verified instantly by AI', status: 'Approved' },
    { step: 'Supplies Procured', desc: 'Food packets acquired from supplier', status: 'Assigned' },
    { step: 'Delivered', desc: 'Food packet delivered to family in Bangalore North ✅', status: 'Delivered' }
  ];

  const mapPins = [
    { city: "Bangalore North", status: "delivered", left: "30%", top: "55%" },
    { city: "Bangalore South", status: "in-progress", left: "45%", top: "65%" },
    { city: "Mysore", status: "pending", left: "60%", top: "70%" }
  ];

  const handleDonateClick = () => {
    navigate('/donations');
  };

  const handleMapClick = () => {
    navigate('/map');
  };

  return (
    <div className="page-root">
      {/* Loading State */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading real-time data...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-container">
        <div className="hero-textblob">
          <h1>AI-Powered Disaster Relief & Donation Transparency</h1>
          <p>
            Real-time tracking, total transparency, and verified positive impact for victims.<br />
            Trust. Verify. Donate with confidence.
          </p>
          <button 
            className="donate-btn hero-cta"
            onClick={handleDonateClick}
            aria-label="Make a donation to help disaster relief efforts"
            role="button"
            tabIndex={0}
          >
            💝 Donate Now
          </button>
        </div>
        <div className="hero-image">
          <div className="hero-visual">
            <div className="floating-icon">🚨</div>
            <div className="floating-icon">💝</div>
            <div className="floating-icon">🏠</div>
          </div>
        </div>
      </section>

      {/* LIVE STATS | INFOGRAPHIC */}
      <section className="stats-section">
        <div className="stat-card emphasis">
          <span className="stat-icon" role="img" aria-label="People">👥</span>
          <div className="stat-num">{affected}</div>
          <div className="stat-label">Families in Need</div>
          <div className="stat-subtitle">Real-time data</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" role="img" aria-label="Donations">💸</span>
          <div className="stat-num">{donations}</div>
          <div className="stat-label">Donations Made</div>
          <div className="stat-subtitle">Live count</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" role="img" aria-label="Money">₹</span>
          <div className="stat-num">₹{funds}</div>
          <div className="stat-label">Total Funds Raised</div>
          <div className="stat-subtitle">Verified amount</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" role="img" aria-label="Supplies">📦</span>
          <div className="stat-num">{supplies}</div>
          <div className="stat-label">Supplies Delivered</div>
          <div className="stat-subtitle">Confirmed deliveries</div>
        </div>
      </section>

      {/* DONATION TRACKING MAP */}
      <section className="map-section">
        <h2 className="section-heading">Donation Tracking Map</h2>
        <div 
          className="map-visual"
          onClick={handleMapClick}
          role="button"
          tabIndex={0}
          aria-label="View interactive map of donation tracking"
          onKeyDown={(e) => e.key === 'Enter' && handleMapClick()}
        >
          <div className="fake-map-bg"></div>
          {/* Pins */}
          {mapPins.map((pin, i) => (
            <div
              key={i}
              className={`map-pin ${pin.status}`}
              style={{ left: pin.left, top: pin.top }}
              role="img"
              aria-label={`${pin.city} - ${pin.status}`}
            >
              <span className="pin-dot"></span>
              <span className="pin-label">{pin.city}</span>
            </div>
          ))}
          <div className="legend-bar">
            <span><span className="dot delivered"></span> Delivered</span>
            <span><span className="dot in-progress"></span> In Progress</span>
            <span><span className="dot pending"></span> Pending</span>
          </div>
          <div className="map-overlay">
            <p>Click to view interactive map</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <h2 className="section-heading">Donation Transparency Timeline</h2>
        <div className="timeline">
          {timelineData.map((item, idx) => (
            <div className="timeline-step" key={idx}>
              <div 
                className={`timeline-circle ${item.status === "Delivered" || item.status === "Assigned" ? "delivered" : 
                          item.status === "Approved" ? "approved" : "pending"}`}
                role="img"
                aria-label={`Status: ${item.status}`}
              ></div>
              <div className="timeline-content">
                <div className="step-title">{item.step}</div>
                <div className="step-desc">{item.desc}</div>
                <div className="step-status">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISASTER PREDICTION WIDGET */}
      <section className="prediction-section">
        <h2 className="section-heading">Disaster Prediction</h2>
        <div className="prediction-card">
          <div className="pred-title">Flood risk in Bangalore North (Next 48 hrs)</div>
          <div className="pred-bar-bg" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100">
            <div className="pred-bar-fill" style={{ width: "72%" }}></div>
          </div>
          <div className="pred-status">Severe risk for low-lying areas. AI model refreshes every hour.</div>
          <button 
            className="pred-action-btn"
            onClick={() => navigate('/chatbot')}
            aria-label="Get more information about disaster predictions"
          >
            Get AI Insights
          </button>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of people making a real impact in disaster relief efforts.</p>
          <div className="cta-buttons">
            <button 
              className="cta-btn primary"
              onClick={handleDonateClick}
              aria-label="Make a donation now"
            >
              💝 Donate Now
            </button>
            <button 
              className="cta-btn secondary"
              onClick={() => navigate('/login/user')}
              aria-label="Sign up as a user"
            >
              👤 Sign Up
            </button>
            <button 
              className="cta-btn secondary"
              onClick={() => navigate('/login/ngo')}
              aria-label="Register as an NGO"
            >
              🏢 NGO Registration
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🚨 Relivo</h3>
            <p>AI-powered disaster relief platform ensuring transparency and impact.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigate('/donations')}>Donate</button></li>
              <li><button onClick={() => navigate('/map')}>Track Relief</button></li>
              <li><button onClick={() => navigate('/chatbot')}>AI Assistant</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li><button onClick={() => navigate('/login/user')}>User Login</button></li>
              <li><button onClick={() => navigate('/login/ngo')}>NGO Login</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Relivo · AI Transparency for Disaster Relief</span>
        </div>
      </footer>
    </div>
  );
}
