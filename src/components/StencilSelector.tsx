
import React from 'react';
import { STENCILS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Heart, Rocket, Flower, Cat, BirdIcon } from 'lucide-react';

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
    'flower': <Flower className="h-5 w-5" />,
    'cat': <Cat className="h-5 w-5" />,
  };

  return (
    <div className="flex flex-col gap-2">
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
