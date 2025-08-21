import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    details: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Incident reported:\nType: ${formData.type}\nLocation: ${formData.location}\nDetails: ${formData.details}`);
    // Soon, send formData to backend API
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Report an Incident</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Incident Type:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select one</option>
            <option value="Fire">Fire</option>
            <option value="Accident">Accident</option>
            <option value="Crime">Crime</option>
            <option value="Medical">Medical Emergency</option>
          </select>
        </label>
        <br /><br />
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter location" required />
        </label>
        <br /><br />
        <label>
          Details:
          <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Additional details" />
        </label>
        <br /><br />
        <button type="submit">Report</button>
      </form>
    </div>
  );
}

export default App;
