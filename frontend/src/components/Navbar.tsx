import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg text-blue-600">
        Task Manager
      </Link>
      <div className="space-x-4">
        {accessToken ? (
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">Login</Link>
            <Link to="/register" className="text-green-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
