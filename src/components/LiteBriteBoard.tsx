import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Peg from './Peg';
import ColorPalette from './ColorPalette';
import ToolBar from './ToolBar';
import StencilSelector from './StencilSelector';
import { PEG_COLORS, DEFAULT_GRID_SIZE, EMPTY_COLOR, TOOLS, STENCILS } from '@/lib/constants';
import { textToPegPattern } from '@/lib/textToPegs';
import { toast } from "sonner";
import { toPng } from 'html-to-image';

interface LiteBriteBoardProps {}

const LiteBriteBoard: React.FC<LiteBriteBoardProps> = () => {
  const rows = DEFAULT_GRID_SIZE.rows;
  const cols = DEFAULT_GRID_SIZE.cols;

  // Initialize the grid with empty pegs
  const [grid, setGrid] = useState<Array<Array<string>>>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(EMPTY_COLOR))
  );
  
  // Add history for undo functionality
  const [history, setHistory] = useState<Array<Array<Array<string>>>>([]);

  const [selectedColor, setSelectedColor] = useState(PEG_COLORS[0].value);
  const [activeTool, setActiveTool] = useState(TOOLS.PAINT);
  const [isPainting, setIsPainting] = useState(false);
  const [activeStencil, setActiveStencil] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ** Sound Effect **
  const clickSound = useMemo(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== 'undefined') {
      // Path relative to the public folder
      return new Audio('/click.wav'); 
    } 
    return null;
  }, []);

  const playClickSound = useCallback(() => {
    if (clickSound) {
      clickSound.currentTime = 0; // Rewind to start in case of rapid clicks
      clickSound.play().catch(error => {
        // Autoplay policy might block the sound initially
        console.error("Error playing click sound:", error);
        // Consider adding a user interaction (e.g., a general 'enable sound' button)
        // if sound doesn't play automatically.
      });
    }
  }, [clickSound]);

  // ** NEW Callback to play Color Selection Sound **
  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color); // Then update the state
  }, []);

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

  // Handle mouse down for initial click/drag start
  const handleMouseDown = useCallback((row: number, col: number) => {
    saveToHistory();
    setIsPainting(true);

    setGrid(prevGrid => {
      if (!prevGrid || !prevGrid[row]) {
        console.error("Grid or row is undefined in handleMouseDown");
        return prevGrid;
      }

      const newGrid = prevGrid.map(r => [...r]); // Create a new grid copy
      const currentColor = newGrid[row][col];
      let newColor = currentColor;

      if (activeTool === TOOLS.PAINT) {
        newColor = selectedColor;
      } else if (activeTool === TOOLS.ERASER) {
        newColor = EMPTY_COLOR;
      }

      if (newColor !== currentColor) {
        playClickSound();
        newGrid[row][col] = newColor;
        return newGrid;
      }
      return prevGrid; // No change, return previous grid
    });
  }, [activeTool, selectedColor, saveToHistory, playClickSound, setGrid, setIsPainting]);

  // Handle mouse enter for drag painting (apply color directly, no toggle)
  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (isPainting) {
      setGrid(prevGrid => {
        if (!prevGrid || !prevGrid[row]) return prevGrid;

        const newGrid = prevGrid.map(r => [...r]); // Create a new grid copy
        const currentColor = newGrid[row][col];
        let newColor = currentColor;

        if (activeTool === TOOLS.PAINT) {
          newColor = selectedColor;
        } else if (activeTool === TOOLS.ERASER) {
          newColor = EMPTY_COLOR;
        }

        if (newColor !== currentColor) {
          playClickSound();
          newGrid[row][col] = newColor;
          return newGrid;
        }
        return prevGrid; // No change
      });
    }
  }, [isPainting, activeTool, selectedColor, playClickSound, setGrid]);

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
    
    // Calculate peg changes using the updated function (defaults to startRow=2, startCol=2)
    const pegChanges = textToPegPattern(text, selectedColor); // Removed the 3rd boolean argument
    
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
    setActiveTool(TOOLS.PAINT); // Switch back to paint tool after text placement
  };

  // Clear the board
  const handleClear = () => {
    saveToHistory();
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(EMPTY_COLOR)));
    toast.info("Board cleared!");
  };

  // ** Handle stencil selection **
  const handleStencilSelect = useCallback((stencilId: string | null) => {
    setActiveStencil(stencilId);
    if (stencilId) {
      toast.info(`${STENCILS.find(s => s.id === stencilId)?.name} stencil activated`);
    } else {
      toast.info("Stencil removed");
    }
  }, []);

  // ** NEW Function to clear the board (New Scene) **
  const handleNewScene = useCallback(() => {
    saveToHistory(); // Save the state *before* clearing
    // Use DEFAULT_GRID_SIZE.rows and .cols correctly
    const newEmptyGrid = Array.from({ length: DEFAULT_GRID_SIZE.rows }, () => 
      Array(DEFAULT_GRID_SIZE.cols).fill(EMPTY_COLOR)
    );
    setGrid(newEmptyGrid); 
    // Do we need to save the pre-cleared state again? saveToHistory already did.
    // setHistory(prev => [...prev, grid]); // Removed potentially duplicate history save
    toast.success("New scene created!");
  }, [saveToHistory]);

  // ** NEW Function to Export Grid as PNG **
  const handleExport = useCallback(async () => {
    if (gridRef.current === null) {
      toast.error("Could not find grid element to export.");
      return;
    }

    try {
      const dataUrl = await toPng(gridRef.current, { 
        cacheBust: true, // Avoid issues with cached images
        backgroundColor: '#000000' // Explicitly set background for transparency issues
      });
      const link = document.createElement('a');
      link.download = 'lite-brite-creation.png';
      link.href = dataUrl;
      link.click();
      toast.success("Exported as PNG!");
    } catch (err) {
      console.error('Oops, something went wrong!', err);
      toast.error("Failed to export image.");
    }
  }, []);

  // Find the appropriate glow class for a color
  const getGlowClass = (color: string) => {
    const pegColor = PEG_COLORS.find(c => c.value === color);
    return pegColor ? pegColor.glowClass : '';
  };

  // ** NEW Tool Change Handler (combines sound and state update) **
  const handleToolChange = useCallback((tool: string) => {
    console.log("handleToolChange called for tool:", tool); // Added log
    setActiveTool(tool); // Then update the state
  }, []);

  // Get stencil overlay pattern if a stencil is active
  const getStencilPattern = useCallback(() => {
    if (!activeStencil) return null;
    
    const stencil = STENCILS.find(s => s.id === activeStencil);
    if (!stencil) return null;
    
    // Center the stencil pattern on the grid
    const pattern = stencil.data;
    const patternHeight = pattern.length;
    const patternWidth = pattern[0].length;
    
    const startRow = Math.floor((rows - patternHeight) / 2);
    const startCol = Math.floor((cols - patternWidth) / 2);
    
    return { pattern, startRow, startCol };
  }, [activeStencil, rows, cols]);

  // Check if a peg is part of the stencil pattern
  const isPegInStencilPattern = useCallback((row: number, col: number) => {
    const stencilData = getStencilPattern();
    if (!stencilData) return false;
    
    const { pattern, startRow, startCol } = stencilData;
    const patternRow = row - startRow;
    const patternCol = col - startCol;
    
    // Check if within pattern bounds and if the pattern has an 'X' at this position
    if (
      patternRow >= 0 &&
      patternRow < pattern.length &&
      patternCol >= 0 &&
      patternCol < pattern[0].length
    ) {
      return pattern[patternRow][patternCol] === 'X';
    }
    
    return false;
  }, [getStencilPattern]);

  return (
    // Main container: Horizontal flex layout
    <div className="flex justify-center items-start w-full max-w-5xl p-2 gap-2"> 

      {/* Left Column: Color Palette */}
      <div className="flex flex-col items-center gap-2"> 
        <span className="text-lg font-medium text-gray-300 mb-2">Colors</span>
        <ColorPalette 
          selectedColor={selectedColor} 
          onSelectColor={handleColorSelect} 
        />
      </div>

      {/* Center Column: Grid and Stencils */}
      <div className="flex flex-col items-center gap-2">
        <div className="p-6 rounded-lg shadow-xl inline-block border-4 border-gray-600 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 bg-size-200 animate-gradient-xy"> 
          <div 
            ref={gridRef}
            className="grid gap-1 bg-black p-4 rounded-lg shadow-lg border border-gray-700"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
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
                  isStencil={isPegInStencilPattern(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
        
        {/* Stencil Selector - Now placed beneath the grid */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-lg font-medium text-gray-300">Stencils:</span>
          <StencilSelector
            onSelectStencil={handleStencilSelect}
            activeStencil={activeStencil}
          />
        </div>
      </div>

      {/* Right Column: Tools */}
      <div className="flex flex-col items-center gap-6"> 
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-medium text-gray-300 mb-2">Tools</span>
          <ToolBar 
            activeTool={activeTool} 
            onToolChange={handleToolChange} 
            onTextSubmit={handleTextSubmit}
            onClear={handleClear}
            onUndo={handleUndo}
            onNewScene={handleNewScene}
            onExport={handleExport}
          />
        </div>
      </div>

    </div>
  );
};

export default LiteBriteBoard;
