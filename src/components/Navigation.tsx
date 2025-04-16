import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  Home, 
  LogIn, 
  UserPlus, 
  LogOut, 
  BarChart, 
  Calendar, 
  User, 
  Users, 
  Dumbbell
} from 'lucide-react';
import MenuButton from './MenuButton';

const Navigation = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                <Dumbbell className="w-7 h-7 text-blue-600" />
                <span>FitTounsi</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
                <div className="absolute top-4 left-8 z-50">
                  <MenuButton />
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                    isActive('/login')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                    isActive('/register')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;