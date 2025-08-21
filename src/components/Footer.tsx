import React from 'react';
import { Camera, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Camera className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">Code and Colors </span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <span>© 2025 Code and Colors </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            Crafting cinematic experiences • Video Editor & Cinematographer with 6+ years of expertise
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
