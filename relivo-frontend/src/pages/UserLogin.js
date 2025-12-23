import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { 
        email, 
        password, 
        role: 'user'
      });
      
      // Save JWT token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', 'user');
      
      // Redirect to user dashboard
      navigate('/dashboard/user');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-white space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight">
            Welcome <br /> Back
          </h1>
          <p className="text-lg opacity-80 max-w-sm leading-relaxed">
            
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
          <h2 className="text-4xl font-bold mb-10">Sign in</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-orange-600"
              />
              <label htmlFor="remember" className="text-sm cursor-pointer">Remember Me</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#c84e16] hover:bg-[#a64112] transition-colors px-10 py-3 font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {loading ? 'Signing in...' : 'Sign in now'}
            </button>

            <div className="pt-2">
              <a href="#" className="text-sm opacity-80 hover:opacity-100 border-b border-transparent hover:border-white transition-all">
                Lost your password?
              </a>
            </div>

            <div className="pt-16 text-[11px] opacity-70 leading-normal tracking-wide">
              By clicking on "Sign in now" you agree to <br />
              <a href="#" className="underline hover:text-white">Terms of Service</a> | <a href="#" className="underline hover:text-white">Privacy Policy</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UserLogin;
