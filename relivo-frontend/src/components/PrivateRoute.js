import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  // You can add token decoding to check user role here if needed

  if (!token) {
    return <Navigate to={role === 'ngo' ? "/login/ngo" : "/login/user"} replace />;
  }

  return children;
};

export default PrivateRoute;
