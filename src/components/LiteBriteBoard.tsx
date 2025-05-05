
import React, { useState, useEffect } from 'react';
import Peg from './Peg';
import ColorPalette from './ColorPalette';
import ToolBar from './ToolBar';
import { PEG_COLORS, DEFAULT_GRID_SIZE, EMPTY_COLOR, TOOLS } from '@/lib/constants';
import { textToPegPattern } from '@/lib/textToPegs';
import { toast } from '@/components/ui/sonner';

interface LiteBriteBoardProps {}

const LiteBriteBoard: React.FC<LiteBriteBoardProps> = () => {
  const rows = DEFAULT_GRID_SIZE.rows;
  const cols = DEFAULT_GRID_SIZE.cols;

  // Initialize the grid with empty pegs
  const [grid, setGrid] = useState<Array<Array<string>>>(() => 
    Array(rows).fill(null).map(() => Array(cols).fill(EMPTY_COLOR))
  );

  const [selectedColor, setSelectedColor] = useState(PEG_COLORS[0].value);
  const [activeTool, setActiveTool] = useState(TOOLS.PAINT);
  const [formatPainterColor, setFormatPainterColor] = useState<string | null>(null);

  // Handle peg click based on active tool
  const handlePegClick = (row: number, col: number) => {
    if (activeTool === TOOLS.PAINT) {
      // Paint mode - set the selected color
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = prevGrid[row][col] === selectedColor ? EMPTY_COLOR : selectedColor;
        return newGrid;
      });
    } else if (activeTool === TOOLS.FORMAT_PAINTER) {
      if (formatPainterColor === null) {
        // First click - copy color
        const pegColor = grid[row][col];
        if (pegColor !== EMPTY_COLOR) {
          setFormatPainterColor(pegColor);
          toast.success("Color picked! Click another peg to apply.");
        }
      } else {
        // Second click - apply copied color
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          newGrid[row] = [...newGrid[row]];
          newGrid[row][col] = formatPainterColor;
          return newGrid;
        });
        setFormatPainterColor(null);
      }
    }
  };

  // Handle text submission
  const handleTextSubmit = (text: string) => {
    const pegChanges = textToPegPattern(text, selectedColor);
    
    if (pegChanges.length === 0) {
      toast.error("Unable to place text on the board!");
      return;
    }
    
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      
      pegChanges.forEach(change => {
        if (change.row < rows && change.col < cols) {
          newGrid[change.row][change.col] = change.color;
        }
      });
      
      return newGrid;
    });

    toast.success("Text placed on the board!");
  };

  // Clear the board
  const handleClear = () => {
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(EMPTY_COLOR)));
    toast.info("Board cleared!");
  };

  // Reset format painter color when tool changes
  useEffect(() => {
    if (activeTool !== TOOLS.FORMAT_PAINTER) {
      setFormatPainterColor(null);
    }
  }, [activeTool]);

  // Find the appropriate glow class for a color
  const getGlowClass = (color: string) => {
    const pegColor = PEG_COLORS.find(c => c.value === color);
    return pegColor ? pegColor.glowClass : '';
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-4xl p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Lite-Brite</h1>
      
      <div className="w-full mb-4">
        <ToolBar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          onTextSubmit={handleTextSubmit}
          onClear={handleClear}
        />
      </div>

      <div className="w-full mb-8">
        <ColorPalette selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="bg-litebrite-background p-6 rounded-lg shadow-xl inline-block">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((pegColor, colIndex) => (
                <Peg
                  key={`${rowIndex}-${colIndex}`}
                  isActive={pegColor !== EMPTY_COLOR}
                  color={pegColor}
                  row={rowIndex}
                  col={colIndex}
                  glowClass={getGlowClass(pegColor)}
                  onClick={handlePegClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteBriteBoard;
