import { useState } from 'react';
import axios from 'axios';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password, role });
      // Save JWT token
      localStorage.setItem('token', res.data.token);
      // Redirect based on role
      window.location.href = role === 'ngo' ? '/dashboard/ngo' : '/dashboard/user';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        {role === 'ngo' ? 'NGO Login' : 'User Login'}
      </h2>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full p-3 border rounded mb-4"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full p-3 border rounded mb-6"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
