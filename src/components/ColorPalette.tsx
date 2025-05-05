
import React from 'react';
import { PEG_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onSelectColor }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {PEG_COLORS.map((color) => (
        <button
          key={color.name}
          className={cn(
            "w-8 h-8 rounded-full transition-transform duration-200",
            color.tailwindClass,
            color.glowClass,
            selectedColor === color.value ? "scale-125 ring-2 ring-white" : "hover:scale-110"
          )}
          onClick={() => onSelectColor(color.value)}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
