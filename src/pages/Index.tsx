import React, { useState, useEffect } from 'react';
import LiteBriteBoard from '@/components/LiteBriteBoard';
import { PEG_COLORS } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const title = "Lite-Brite!";
  // Filter out black color for title animation
  const nonBlackColors = PEG_COLORS.filter(color => color.name !== 'black');

  const [letterColors, setLetterColors] = useState<string[]>(() => 
    // Use nonBlackColors for initial state as well
    title.split('').map(() => nonBlackColors[Math.floor(Math.random() * nonBlackColors.length)].value)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLetterColors(
        // Use nonBlackColors for random selection in interval
        title.split('').map(() => nonBlackColors[Math.floor(Math.random() * nonBlackColors.length)].value)
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
          style={{ width: '125px' }}
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
            Click on pegs to add or remove colored lights, or hold and drag to paint multiple pegs at once! Use the text tool to easily generate glowing text!{' '}
            <Dialog>
              <DialogTrigger asChild>
                <span className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors">Click here to learn more about Lite-Brite!</span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] bg-gray-800 border-gray-700 text-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">What is Lite-Brite?</DialogTitle>
                </DialogHeader>
                <DialogDescription className="mt-4 space-y-4 text-sm font-sans font-light">
                  <p className="text-white">
                    Lite-Brite is a super cool, light-up art toy that lets you create glowing pictures using colorful plastic pegs. You press the pegs into a black screen, and when the light behind it turns on—boom!—your artwork lights up like a mini neon sign. You can make your own designs or use templates that show you where to put each color. It’s like painting with light, and the results are always awesome!
                  </p>
                  <p className="text-white">
                    Here’s a fun fact: Lite-Brite was first released way back in 1967 by Hasbro, and it’s still going strong today! It’s been in cartoons, movies, and even on Stranger Things. In fact, a giant Lite-Brite board was built in 2022 that set a Guinness World Record with over 600,000 pegs! So, whether you’re making a glowing unicorn, rocket ship, or pixelated emoji, Lite-Brite makes your imagination shine bright.
                  </p>
                  <p className="text-white">
                    Want a blast from the past? <a href="https://youtu.be/fzGzu93yFKI?si=u4vn7oPyq3JeFv0U" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 transition-colors">Check out this vintage Lite-Brite commercial from the 70s!</a> It's a real trip down memory lane - well, for me at least!
                  </p>
                </DialogDescription>
                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" className="bg-gray-600 hover:bg-gray-500 text-white">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {' | '}
            <Link to="/stencil-creator" className="text-green-400 underline cursor-pointer hover:text-green-300 transition-colors">
              Create/Edit Stencils
            </Link>
          </p>
        </div>
      </div>
      <LiteBriteBoard />
    </div>
  );
};

export default Index;
