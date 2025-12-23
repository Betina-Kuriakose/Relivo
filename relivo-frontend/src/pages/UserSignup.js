import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserSignup.css';

const UserSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/auth/register', { 
        name,
        email, 
        password, 
        role: 'user'
      });
      
      // Save JWT token and redirect to dashboard
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', 'user');
      navigate('/dashboard/user');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-signup-container">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-white space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight">
            Join Us <br /> Today
          </h1>
          <p className="text-lg opacity-80 max-w-sm leading-relaxed">
            Create your account and start your journey with us. It's quick and easy!
          </p>
          
          <div className="space-y-6 pt-4">
            <div className="flex space-x-6 text-2xl">
              <a href="#" className="hover:opacity-70 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:opacity-70 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:opacity-70 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:opacity-70 transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="text-white lg:max-w-md lg:ml-auto w-full">
          <h2 className="text-4xl font-bold mb-10">Sign up</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white text-black outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white text-black outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white text-black outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-white text-black outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 accent-orange-600"
              />
              <label htmlFor="agree" className="text-sm cursor-pointer">
                I agree to the <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#c84e16] hover:bg-[#a64112] transition-colors px-10 py-3 font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {loading ? 'Signing up...' : 'Sign up now'}
            </button>

            <div className="pt-2 text-center">
              <span className="text-sm opacity-80">Already have an account? </span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login/user'); }} className="text-sm opacity-80 hover:opacity-100 border-b border-transparent hover:border-white transition-all">
                Sign in here
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UserSignup;

