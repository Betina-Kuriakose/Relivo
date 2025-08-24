import React, { useState } from 'react';

export default function Donation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Name is required';
    if (!formData.email.trim()) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Email is invalid';
    }
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

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Process donation - e.g., API call
      setSubmitted(true);
      setFormData({ name: '', email: '', amount: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Make a Donation</h2>
      {submitted && <p className="success-message">Thank you for your generous donation!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="nameError"
          />
          {errors.name && <small id="nameError" className="error-text">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailError"
          />
          {errors.email && <small id="emailError" className="error-text">{errors.email}</small>}
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

        <button type="submit" className="donate-submit-btn">Donate Now</button>
      </form>
    </div>
  );
}
