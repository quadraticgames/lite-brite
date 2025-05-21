import React from 'react';
import { STENCILS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Heart, Rocket, BirdIcon, Bot, Home, Sailboat } from 'lucide-react';

interface StencilSelectorProps {
  onSelectStencil: (stencilId: string | null) => void;
  activeStencil: string | null;
}

const StencilSelector: React.FC<StencilSelectorProps> = ({ 
  onSelectStencil,
  activeStencil 
}) => {
  // Map of stencil IDs to icons
  const stencilIcons: Record<string, React.ReactNode> = {
    'heart': <Heart className="h-5 w-5" />,
    'spaceship': <Rocket className="h-5 w-5" />,
    'r2d2': <Bot className="h-5 w-5" />,
    'house': <Home className="h-5 w-5" />,
    'sailboat': <Sailboat className="h-5 w-5" />,
    'gameu': <span className="h-5 w-5 flex items-center justify-center font-bold text-lg">G</span>,
  };

  return (
    <div className="flex items-center gap-2">
      {STENCILS.map((stencil) => (
        <Button
          key={stencil.id}
          size="icon"
          className={`transition-all rounded-md ${
            activeStencil === stencil.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-700 text-gray-400 hover:bg-gray-600"
          }`}
          onClick={() => onSelectStencil(stencil.id)}
          title={stencil.name}
        >
          {stencilIcons[stencil.id] || <BirdIcon className="h-5 w-5" />}
        </Button>
      ))}
      
      {/* Clear stencil button */}
      {activeStencil && (
        <Button
          size="icon"
          className="bg-red-600 text-white hover:bg-red-700 transition-all rounded-md"
          onClick={() => onSelectStencil(null)}
          title="Remove Stencil"
        >
          ×
        </Button>
      )}
    </div>
  );
};

export default StencilSelector;
