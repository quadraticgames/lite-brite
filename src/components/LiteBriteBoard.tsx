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
  }, [grid, setHistory]);

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
  }, [history, toast]);

  // ** NEW Function to apply TOGGLE color change for initial click **
  const applyToggleColorChange = useCallback((row: number, col: number) => {
    setGrid(prevGrid => {
      if (!prevGrid || !prevGrid[row]) {
        console.error("Grid or row is undefined in applyToggleColorChange");
        return prevGrid;
      }
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]]; // Ensure row is copied
      newGrid[row][col] = prevGrid[row][col] === selectedColor ? EMPTY_COLOR : selectedColor;
      return newGrid;
    });
  }, [selectedColor]);

  // Handle mouse down for initial click/drag start
  const handleMouseDown = useCallback((row: number, col: number) => {
    if (activeTool === TOOLS.PAINT) {
      saveToHistory(); // Save history ONLY on initial click/drag start
      setIsPainting(true);
      applyToggleColorChange(row, col); // Apply the TOGGLE change
    }
  }, [activeTool, applyToggleColorChange, saveToHistory]); // Use applyToggleColorChange

  // Handle mouse enter for drag painting (apply color directly, no toggle)
  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (isPainting && activeTool === TOOLS.PAINT) {
      // Apply selected color directly, only if the peg isn't already that color
      setGrid(prevGrid => {
        if (!prevGrid || !prevGrid[row]) return prevGrid;
        // Only paint if the peg is currently empty or a different color
        if (prevGrid[row][col] !== selectedColor) {
           const newGrid = prevGrid.map((r, rIndex) =>
               rIndex === row ? [...r.slice(0, col), selectedColor, ...r.slice(col + 1)] : r
           );
           return newGrid;
        }
        return prevGrid; // No change needed if already the selected color
      });
    }
  }, [isPainting, activeTool, selectedColor]); // Depends on selectedColor now

  const handleMouseUp = useCallback(() => {
    if (isPainting) { // Only reset if we were actually painting
        setIsPainting(false);
    }
  }, [isPainting]);

  // Add global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
        if (isPainting) {
            setIsPainting(false);
        }
    };
    // Use the captured event on window to handle mouseup outside the grid
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPainting]);

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
      {/* Combined Controls Bar */}
      <div className="flex items-baseline justify-center gap-4 w-full mb-2 p-4 bg-gray-900 rounded-lg"> 
        <span className="text-lg font-medium text-gray-300">Colors:</span>
        <ColorPalette selectedColor={selectedColor} onSelectColor={setSelectedColor} />
        
        <span className="text-lg font-medium text-gray-300 ml-4">Tools:</span>
        <ToolBar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          onTextSubmit={handleTextSubmit}
          onClear={handleClear} // Keeping prop for now, will remove button in ToolBar
          onUndo={handleUndo}
        />
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
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
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
