import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Eye, EyeOff, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'user@student.edu',
    password: 'password123',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setFormData({ email: 'admin@campus.edu', password: 'password123' });
    setLoading(true);
    try {
      const result = await login('admin@campus.edu', 'password123');
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full border border-blue-200/40 bg-white backdrop-blur-md rounded-xl p-8 space-y-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
          </div>
          <p className="text-sm text-gray-600">Sign in to your Campus Lost And Found account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 flex items-center justify-center rounded-full text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition disabled:opacity-60"
          >
            {loading ? <Loader className='w-5 h-5 text-white animate-spin duration-300'/> : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up here
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200/50">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Or login as Admin:
          </h4>
          <button
            onClick={handleDemoAdminLogin}
            className="w-full text-left text-sm px-4 py-2 border border-blue-100 rounded-lg bg-white/50 hover:bg-white/70 text-blue-800 transition-colors"
            disabled={loading}
          >
            <strong>Admin:</strong> admin@campus.edu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
