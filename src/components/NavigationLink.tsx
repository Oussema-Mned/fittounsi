import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
  >
    {children}
  </Link>
);

export default NavigationLink;
