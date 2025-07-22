import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Search,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import { APP_NAME } from '../../lib/constants';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = user?.role === 'admin';
  const panelPath = isAdmin ? '/admin' : '/dashboard';
  const panelLabel = isAdmin ? 'Admin Panel' : 'Dashboard';

  return (
    <header className="bg-white/20 backdrop-blur-md border-b border-white sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
          </Link>

          {user && (
            <div className="hidden md:flex flex-1 mx-8">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full bg-white/30 text-gray-800 backdrop-blur-md border border-white/40 hover:bg-blue-600 hover:text-white transition text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={panelPath}
                    className={`flex items-center gap-1 px-3 py-2 text-sm rounded-full transition ${
                      isActive(panelPath)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-white/40'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {panelLabel}
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/30 text-gray-800"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-700" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                    </button>

                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg z-50">
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                          {isAdmin && (
                            <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              <Shield className="w-3 h-3" />
                              Admin
                            </span>
                          )}
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-white/30"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden mt-2 bg-white/70 backdrop-blur-md border-t border-white/30 rounded-b-lg px-4 py-3 space-y-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={panelPath}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    isActive(panelPath)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {panelLabel}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
