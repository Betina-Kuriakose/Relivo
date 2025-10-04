import React, { useState, useEffect } from 'react';
import './Home.css';

// Simulated counters

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

const timelineData = [
  { step: 'Donation Received', desc: '₹500 by John Doe for Bangalore North Flood' },
  { step: 'Donation Verified', desc: 'Verified instantly by AI' },
  { step: 'Supplies Procured', desc: 'Food packets acquired from supplier' },
  { step: 'Delivered', desc: 'Food packet delivered to family in Bangalore North ✅' }
];

const mapPins = [
  { city: "Bangalore North", status: "delivered", left: "30%", top: "55%" },
  { city: "Bangalore South", status: "in-progress", left: "45%", top: "65%" },
  { city: "Mysore", status: "pending", left: "60%", top: "70%" }
];

export default function Home() {
  // Counters
  const affected = useCounter(12456);
  const donations = useCounter(743);
  const funds = useCounter(2783400); // In INR
  const supplies = useCounter(3175);

  return (
    <div className="page-root">
        {/* Existing Home content */}

        {/* HERO SECTION */}
        <section className="hero-container">
          <div className="hero-textblob">
            <h1>AI-Powered Disaster Relief & Donation Transparency</h1>
            <p>
              Real-time tracking, total transparency, and verified positive impact for victims.<br />
              Trust. Verify. Donate with confidence.
            </p>
            <button className="donate-btn hero-cta">Donate Now</button>
          </div>
          <div className="hero-image"></div>
        </section>

        {/* LIVE STATS | INFOGRAPHIC */}
        <section className="stats-section">
          <div className="stat-card emphasis">
            <span className="stat-icon">👥</span>
            <div className="stat-num">{affected}</div>
            <div className="stat-label">People Affected</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💸</span>
            <div className="stat-num">{donations}</div>
            <div className="stat-label">Donations Made</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">₹</span>
            <div className="stat-num">{funds}</div>
            <div className="stat-label">Total Funds Raised</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div className="stat-num">{supplies}</div>
            <div className="stat-label">Supplies Delivered</div>
          </div>
        </section>

        {/* DONATION TRACKING MAP */}
        <section className="map-section">
          <h2 className="section-heading">Donation Tracking Map</h2>
          <div className="map-visual">
            <div className="fake-map-bg"></div>
            {/* Pins */}
            {mapPins.map((pin, i) => (
              <div
                key={i}
                className={`map-pin ${pin.status}`}
                style={{ left: pin.left, top: pin.top }}
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
          </div>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
          <h2 className="section-heading">Donation Transparency Timeline</h2>
          <div className="timeline">
            {timelineData.map((item, idx) => (
              <div className="timeline-step" key={idx}>
                <div className={`timeline-circle ${item.step === "Delivered" ? "delivered" : "pending"}`}></div>
                <div className="timeline-content">
                  <div className="step-title">{item.step}</div>
                  <div className="step-desc">{item.desc}</div>
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
            <div className="pred-bar-bg">
              <div className="pred-bar-fill" style={{ width: "72%" }}></div>
            </div>
            <div className="pred-status">Severe risk for low-lying areas. AI model refreshes every hour.</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <span>© {new Date().getFullYear()} Relivo · AI Transparency for Disaster Relief</span>
        </footer>
    </div>
  );
}
