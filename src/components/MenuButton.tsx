import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, BarChart, Calendar, Users, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const MenuButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
        <span className="ml-2">Menu</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 overflow-auto">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
            onClick={() => setOpen(false)}
          >
            <BarChart className="w-4 h-4 mr-2" /> Dashboard
          </Link>
          <Link
            to="/workout-plans"
            className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
            onClick={() => setOpen(false)}
          >
            <Calendar className="w-4 h-4 mr-2" /> Workouts
          </Link>
          {user.role === 'client' && (
            <Link
              to="/find-coach"
              className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
              onClick={() => setOpen(false)}
            >
              <Users className="w-4 h-4 mr-2" /> Find Coach
            </Link>
          )}
          <Link
            to={user.role === 'coach' ? '/profile/coach' : '/profile/client'}
            className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
            onClick={() => setOpen(false)}
          >
            <User className="w-4 h-4 mr-2" /> Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
