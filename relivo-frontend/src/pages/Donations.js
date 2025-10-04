import React, { useState } from 'react';
import axios from 'axios';

export default function Donation() {
  const [formData, setFormData] = useState({
    donorName: '',
    type: 'Money',
    amount: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!formData.donorName.trim()) err.donorName = 'Name is required';
    if (!formData.amount.trim()) {
      err.amount = 'Donation amount is required';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      err.amount = 'Enter a valid positive amount';
    }
    return err;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await axios.post('http://localhost:5000/donation/', {
          donorName: formData.donorName,
          type: formData.type,
          amount: Number(formData.amount)
        });
        setSubmitted(true);
        setFormData({ donorName: '', type: 'Money', amount: '', message: '' });
        setErrors({});
      } catch (error) {
        setErrors({ submit: 'Failed to submit donation. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Make a Donation</h2>
      {submitted && <p className="success-message">Thank you for your generous donation!</p>}
      {errors.submit && <p className="error-text">{errors.submit}</p>}
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="donorName">Full Name*</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            aria-describedby="donorNameError"
          />
          {errors.donorName && <small id="donorNameError" className="error-text">{errors.donorName}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Donation Type*</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Money">Money</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Donation Amount (INR)*</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            aria-describedby="amountError"
          />
          {errors.amount && <small id="amountError" className="error-text">{errors.amount}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="donate-submit-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
}
