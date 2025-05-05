
import React from 'react';
import { cn } from '@/lib/utils';

interface PegProps {
  isActive: boolean;
  color: string;
  row: number;
  col: number;
  glowClass?: string;
  onClick: (row: number, col: number) => void;
}

const Peg: React.FC<PegProps> = ({
  isActive,
  color,
  row,
  col,
  glowClass,
  onClick
}) => {
  const handleClick = () => {
    onClick(row, col);
  };
  
  return (
    <div 
      className={cn(
        "w-4 h-4 rounded-full border border-gray-700 transition-all duration-150 cursor-pointer hover:scale-110",
        isActive && color !== 'transparent' ? glowClass : '',
        isActive && color !== 'transparent' ? 'border-gray-400' : 'bg-gray-800'
      )}
      style={{ 
        backgroundColor: isActive ? color : undefined,
      }}
      onClick={handleClick}
    />
  );
};

export default Peg;
