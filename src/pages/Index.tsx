
import React from 'react';
import LiteBriteBoard from '@/components/LiteBriteBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center mb-8">
        <img 
          src="/lovable-uploads/315b283c-8c23-45f9-afd8-94fefca84bae.png" 
          alt="Lite-Brite Box" 
          className="max-w-xs w-3/5 mb-4 rounded-lg" // Reduced by 40% using width classes
        />
        <h1 className="text-4xl font-bold mb-2 text-white">GameU Lite-Brite!</h1>
        <div className="text-center text-yellow-200 mb-6 max-w-2xl">
          <p className="mb-2">Click on pegs to add or remove colored lights, or hold and drag to paint multiple pegs at once! Use the text tool to easily generate glowing text!</p>
        </div>
      </div>
      <LiteBriteBoard />
    </div>
  );
};

export default Index;
