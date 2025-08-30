import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/user');
    }
    // Here you can decode token or call backend to verify role if needed
  }, [navigate]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <p>Welcome, regular user! Manage your donations and requests here.</p>
      {/* Add your features and UI */}
    </div>
  );
};

export default UserDashboard;
