import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          <Link 
            to="/stencil-creator" 
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            Create/Edit Stencils
          </Link>
          {' | '}
          <a 
            href="https://github.com/yourusername/peggle-phrase-painter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub Repository
          </a>
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Note: To use the stencil creator, please download and run this application locally.
        </p>
        <p className="text-gray-500 text-xs mt-4">
          Created with ❤️ in Florida by{' '}
          <a 
            href="https://quadraticgames.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Quadratic Games
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
