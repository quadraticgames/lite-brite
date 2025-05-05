
import { DEFAULT_GRID_SIZE } from './constants';

// Simple mapping of characters to peg patterns
const charPatterns: Record<string, boolean[][]> = {
  'A': [
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, true],
    [true, false, false, true],
    [true, false, false, true],
  ],
  'B': [
    [true, true, true, false],
    [true, false, false, true],
    [true, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, false],
  ],
  'C': [
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, true],
    [false, true, true, false],
  ],
  'D': [
    [true, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, false],
  ],
  'E': [
    [true, true, true, true],
    [true, false, false, false],
    [true, true, true, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, true, true, true],
  ],
  'F': [
    [true, true, true, true],
    [true, false, false, false],
    [true, true, true, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
  ],
  'G': [
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, false],
    [true, false, true, true],
    [true, false, false, true],
    [false, true, true, true],
  ],
  'H': [
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
  ],
  'I': [
    [true, true, true],
    [false, true, false],
    [false, true, false],
    [false, true, false],
    [false, true, false],
    [true, true, true],
  ],
  'J': [
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [true, false, true],
    [false, true, false],
  ],
  'K': [
    [true, false, false, true],
    [true, false, true, false],
    [true, true, false, false],
    [true, false, true, false],
    [true, false, true, false],
    [true, false, false, true],
  ],
  'L': [
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, true, true, true],
  ],
  'M': [
    [true, false, false, false, true],
    [true, true, false, true, true],
    [true, false, true, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
  ],
  'N': [
    [true, false, false, true],
    [true, true, false, true],
    [true, true, false, true],
    [true, false, true, true],
    [true, false, true, true],
    [true, false, false, true],
  ],
  'O': [
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
  ],
  'P': [
    [true, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, false],
    [true, false, false, false],
    [true, false, false, false],
  ],
  'Q': [
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, true, true],
    [false, true, true, true],
  ],
  'R': [
    [true, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
    [true, true, true, false],
    [true, false, true, false],
    [true, false, false, true],
  ],
  'S': [
    [false, true, true, true],
    [true, false, false, false],
    [false, true, true, false],
    [false, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
  ],
  'T': [
    [true, true, true, true, true],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
  ],
  'U': [
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
  ],
  'V': [
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
    [false, false, true, false],
  ],
  'W': [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, true, false, true],
    [true, true, false, true, true],
    [true, false, false, false, true],
  ],
  'X': [
    [true, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
    [false, true, true, false],
    [true, false, false, true],
    [true, false, false, true],
  ],
  'Y': [
    [true, false, false, true],
    [true, false, false, true],
    [false, true, true, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, false, true, false],
  ],
  'Z': [
    [true, true, true, true],
    [false, false, false, true],
    [false, false, true, false],
    [false, true, false, false],
    [true, false, false, false],
    [true, true, true, true],
  ],
  ' ': [
    [false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ],
  '!': [
    [true],
    [true],
    [true],
    [true],
    [false],
    [true],
  ],
  '.': [
    [false],
    [false],
    [false],
    [false],
    [false],
    [true],
  ],
};

export function textToPegPattern(
  text: string, 
  selectedColor: string, 
  startRow: number = 2, 
  startCol: number = 2
) {
  const gridChanges: Array<{ row: number; col: number; color: string }> = [];
  const upperText = text.toUpperCase();
  
  let cursorCol = startCol;
  
  // Process each character
  for (let i = 0; i < upperText.length; i++) {
    const char = upperText[i];
    const pattern = charPatterns[char];
    
    if (pattern) {
      // Apply the pattern at the current position
      for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
          if (pattern[y][x]) {
            const row = startRow + y;
            const col = cursorCol + x;
            
            // Only add if within grid bounds
            if (row < DEFAULT_GRID_SIZE.rows && col < DEFAULT_GRID_SIZE.cols) {
              gridChanges.push({
                row,
                col,
                color: selectedColor
              });
            }
          }
        }
      }
      
      // Move cursor to the right for the next character (width of pattern + 1 space)
      cursorCol += pattern[0].length + 1;
    } else {
      // Unknown character, just add a space
      cursorCol += 2;
    }
  }
  
  return gridChanges;
}
