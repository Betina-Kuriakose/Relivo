import { useState } from 'react';
import axios from 'axios';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isRegistering ? 'register' : 'login';
      const res = await axios.post(`http://localhost:5000/auth/${endpoint}`, { 
        email, 
        password, 
        role 
      });
      
      // Save JWT token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', role);
      
      // Redirect based on role
      window.location.href = role === 'ngo' ? '/dashboard/ngo' : '/dashboard/user';
    } catch (err) {
      setError(err.response?.data?.error || `${isRegistering ? 'Registration' : 'Login'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        {isRegistering 
          ? `${role === 'ngo' ? 'NGO' : 'User'} Registration` 
          : `${role === 'ngo' ? 'NGO' : 'User'} Login`
        }
      </h2>
      
      {error && <div className="text-red-600 mb-4 text-center p-3 bg-red-50 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-indigo-600 hover:text-indigo-800 text-sm"
        >
          {isRegistering 
            ? 'Already have an account? Login' 
            : "Don't have an account? Register"
          }
        </button>
      </div>
    </div>
  );
};

export default Login;
