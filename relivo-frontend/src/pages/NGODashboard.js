import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NGODashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/ngo');
    }
    // Optionally verify role from token or backend here
  }, [navigate]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">NGO Dashboard</h1>
      <p>Welcome, NGO partner! Manage relief efforts and donations here.</p>
      {/* Add your NGO-specific UI */}
    </div>
  );
};

export default NGODashboard;
