import React, { useState, useEffect } from 'react';
import LiteBriteBoard from '@/components/LiteBriteBoard';
import { PEG_COLORS } from '@/lib/constants';

const Index = () => {
  const title = "GameU Lite-Brite!";
  const [letterColors, setLetterColors] = useState<string[]>(() => 
    title.split('').map(() => PEG_COLORS[Math.floor(Math.random() * PEG_COLORS.length)].value)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLetterColors(
        title.split('').map(() => PEG_COLORS[Math.floor(Math.random() * PEG_COLORS.length)].value)
      );
    }, 500); 

    return () => clearInterval(intervalId);
  }, [title]); 

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center mb-0">
        <img 
          src="/lovable-uploads/315b283c-8c23-45f9-afd8-94fefca84bae.png" 
          alt="Lite-Brite Box" 
          className="max-w-xs w-3/5 mb-4 rounded-lg" 
        />
        <h1 className="text-4xl font-bold mb-2 text-white font-ribeye"> 
          {title.split('').map((letter, index) => (
            <span key={index} style={{ color: letterColors[index], transition: 'color 0.3s ease' }}>
              {letter}
            </span>
          ))}
        </h1>
        <div className="text-center text-gray-400 text-sm mb-0 max-w-2xl mx-auto">
          <p className="text-white font-sans font-light"> 
            Click on pegs to add or remove colored lights, or hold and drag to paint multiple pegs at once! Use the text tool to easily generate glowing text!
          </p>
        </div>
      </div>
      <LiteBriteBoard />
    </div>
  );
};

export default Index;
