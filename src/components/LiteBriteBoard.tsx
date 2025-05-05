
import React, { useState, useEffect, useCallback } from 'react';
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
  
  // Add history for undo functionality
  const [history, setHistory] = useState<Array<Array<Array<string>>>>([]);

  const [selectedColor, setSelectedColor] = useState(PEG_COLORS[0].value);
  const [activeTool, setActiveTool] = useState(TOOLS.PAINT);
  const [isPainting, setIsPainting] = useState(false);

  // Save current state to history before making changes
  const saveToHistory = useCallback(() => {
    // Create a deep copy of the current grid
    const currentGridCopy = grid.map(row => [...row]);
    setHistory(prev => [...prev, currentGridCopy]);
  }, [grid]);

  // Handle undo
  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setGrid(previousState);
      setHistory(prev => prev.slice(0, -1));
      toast.info("Undo successful");
    } else {
      toast.info("Nothing to undo");
    }
  }, [history]);

  // Handle peg click based on active tool
  const handlePegClick = useCallback((row: number, col: number) => {
    if (activeTool === TOOLS.PAINT) {
      saveToHistory();
      // Paint mode - set the selected color
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = prevGrid[row][col] === selectedColor ? EMPTY_COLOR : selectedColor;
        return newGrid;
      });
    }
  }, [activeTool, selectedColor, saveToHistory]);

  // Handle mouse events for drag painting
  const handleMouseDown = useCallback((row: number, col: number) => {
    if (activeTool === TOOLS.PAINT) {
      saveToHistory();
      setIsPainting(true);
      handlePegClick(row, col);
    }
  }, [activeTool, handlePegClick, saveToHistory]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (isPainting && activeTool === TOOLS.PAINT) {
      handlePegClick(row, col);
    }
  }, [isPainting, activeTool, handlePegClick]);

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
  }, []);

  // Add global mouse up handler
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  // Handle text submission
  const handleTextSubmit = (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text!");
      return;
    }
    
    saveToHistory();
    
    // Calculate center position for text
    const pegChanges = textToPegPattern(text, selectedColor, true);
    
    if (pegChanges.length === 0) {
      toast.error("Unable to place text on the board!");
      return;
    }
    
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      
      pegChanges.forEach(change => {
        if (change.row >= 0 && change.row < rows && change.col >= 0 && change.col < cols) {
          newGrid[change.row][change.col] = change.color;
        }
      });
      
      return newGrid;
    });

    toast.success("Text placed on the board!");
  };

  // Clear the board
  const handleClear = () => {
    saveToHistory();
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(EMPTY_COLOR)));
    toast.info("Board cleared!");
  };

  // Find the appropriate glow class for a color
  const getGlowClass = (color: string) => {
    const pegColor = PEG_COLORS.find(c => c.value === color);
    return pegColor ? pegColor.glowClass : '';
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4">
      <div className="w-full mb-4">
        <ToolBar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          onTextSubmit={handleTextSubmit}
          onClear={handleClear}
          onUndo={handleUndo}
        />
      </div>

      <div className="w-full mb-8">
        <ColorPalette selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      </div>

      <div className="flex justify-center w-full overflow-x-auto">
        <div className="bg-litebrite-background p-6 rounded-lg shadow-xl inline-block">
          <div 
            className="grid gap-1" 
            style={{ 
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              userSelect: 'none' // Prevent text selection during drag
            }}
          >
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
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
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
