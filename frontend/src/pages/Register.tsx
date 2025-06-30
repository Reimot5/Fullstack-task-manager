import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      setMessage('Registration successful. Please login.');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Registration failed');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <div className="text-green-500 mb-2">{message}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
