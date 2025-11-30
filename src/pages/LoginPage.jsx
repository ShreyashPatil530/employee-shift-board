import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(credentials.email, credentials.password);
      const { user, token } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📋 Shift Board</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center border border-red-300">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="hire-me@anshumat.org"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="HireMe@2025!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition"
          >
            {loading ? '⏳ Logging in...' : '🔓 Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t text-sm text-gray-600 space-y-2">
          <p className="font-semibold text-gray-800">📝 Demo Credentials:</p>
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>👨‍💼 Admin:</strong></p>
            <p>Email: hire-me@anshumat.org</p>
            <p>Password: HireMe@2025!</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>👤 User:</strong></p>
            <p>Email: user@example.com</p>
            <p>Password: Password@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;