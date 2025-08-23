import React, { useState } from 'react';
import './Home.css';

// Donation, event, and transparency log mock data
const initialTasks = [
  { text: "Donate $100 for Flood Relief", status: "Verified" },
  { text: "Donate food supplies for Earthquake Victims", status: "Pending" },
  { text: "Volunteer for Rescue Mission", status: "Verified" }
];

export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(initialTasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTasks([...tasks, { text: input, status: "Pending" }]);
      setInput('');
    }
  };

  const handleDelete = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  return (
    <div className="app-root">
      {/* Header */}
      <header className="header">
        <div className="logo">Relivo</div>
        <nav>
          <a href="#" className="nav-btn">Get started</a>
          <a href="#" className="nav-btn">Prepare</a>
          <a href="#" className="nav-btn">Pricing</a>
          <a href="#" className="nav-btn">Sign in / up</a>
          <button className="cta">Get full access</button>
        </nav>
      </header>

      {/* Announcement Banner */}
      <div className="banner">
        Enjoy 20% off on all plans for new donors! Transparency powered by AI.
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>AI-Powered Disaster Relief</h1>
        <p>Promoting Donation Transparency and Real-Time Impact Reporting.</p>
        <button className="hero-cta">Get started now</button>
        <div className="stats">
          <span>1M+ donors verified</span> | <span>200+ disasters tracked</span>
        </div>
      </section>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="tab active">Description</div>
          <div className="tab">Impact Stats</div>
          <div className="tab">Transparency Logs</div>
          <div className="tab">AI Insights</div>
        </aside>

        {/* Center Panel */}
        <main className="center-panel">
          <h2>Live Disaster Events</h2>
          <div className="panel">
            <h3>Flood in California</h3>
            <p>AI verifies all donations and relief actions in real-time.</p>
            <ul className="event-list">
              <li>Food Distributed <span className="verified">Verified</span></li>
              <li>Medical Aid Sent <span className="pending">Pending</span></li>
              <li>Volunteers Deployed <span className="verified">Verified</span></li>
            </ul>
          </div>
        </main>

        {/* Right Panel */}
        <section className="right-panel">
          <h2>Contribution/Action Panel</h2>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              placeholder="Add your relief action or donation"
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <ul className="task-list">
            {tasks.map((task, idx) => (
              <li key={idx}>
                {task.text}
                <span className={task.status === "Verified" ? "verified" : "pending"}>{task.status}</span>
                <button className="delete-btn" onClick={() => handleDelete(idx)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
