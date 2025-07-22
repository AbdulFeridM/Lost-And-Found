import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Clock,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Users,
  Package,
  Menu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../lib/constants';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const Sidebar = ({ open, setOpen }) => {
  const { user, logout: logoutFn } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [reportOpen, setReportOpen] = useState(false);

  const handleLogout = () => {
    logoutFn();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className={`h-screen bg-white p-5 pt-8 fixed z-30 shadow-md transition-all duration-300 ${open ? 'w-64' : 'w-20'} `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-xl font-bold transition-all ${!open && 'hidden'} whitespace-nowrap`}>
          {APP_NAME}
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-500 rounded-md hover:bg-blue-100 p-1 md:hidden"
        >
          <Menu size={22} />
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-500 rounded-md hover:bg-blue-100 p-1 hidden md:block"
        >
          {open ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
      </div>

      {/* Nav Links */}
      <ul className="space-y-3">
        <li>
          <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
            <LayoutDashboard size={20} />
            <span className={`${!open && 'hidden'} transition-all`}>Dashboard</span>
          </Link>
        </li>

        <li>
          <button
            onClick={() => setReportOpen(!reportOpen)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-blue-100"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className={`${!open && 'hidden'} transition-all`}>Reports</span>
            </div>
            {open && (
              <span>
                {reportOpen ? <ChevronUp size={16} className="text-blue-500" /> : <ChevronDown size={16} className="text-blue-500" />}
              </span>
            )}
          </button>
          {reportOpen && open && (
            <ul className="pl-9 mt-1 space-y-1 text-sm text-gray-600">
              <li>
                <Link to="/dashboard/lost-items" className="block p-1 hover:text-gray-400">Lost Items</Link>
              </li>
              <li>
                <Link to="/dashboard/found-items" className="block p-1 hover:text-gray-400">Found Items</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/history" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
            <Clock size={20} />
            <span className={`${!open && 'hidden'} transition-all`}>History</span>
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link to="/admin/manage-users" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
                <Users size={20} />
                <span className={`${!open && 'hidden'} transition-all`}>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-items" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
                <Package size={20} />
                <span className={`${!open && 'hidden'} transition-all`}>Manage Items</span>
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/dashboard/settings" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
            <Settings size={20} />
            <span className={`${!open && 'hidden'} transition-all`}>Settings</span>
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 w-full text-left rounded hover:bg-blue-100"
          >
            <LogOut size={20} />
            <span className={`${!open && 'hidden'} transition-all`}>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
