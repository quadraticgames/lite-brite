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

// Define character dimensions and spacing constants
const CHAR_HEIGHT = 6; // Standard height from patterns
const CHAR_SPACING_X = 1; // Pegs between characters horizontally
const LINE_HEIGHT = CHAR_HEIGHT + 1; // Pegs between lines vertically
const GRID_ROWS = DEFAULT_GRID_SIZE.rows;
const GRID_COLS = DEFAULT_GRID_SIZE.cols;

interface PegChange {
  row: number;
  col: number;
  color: string;
}

export function textToPegPattern(
  text: string,
  selectedColor: string,
  startRow: number = 2, // Start row (from top)
  startCol: number = 2  // Start column (from left)
): PegChange[] {
  const pegChanges: PegChange[] = [];
  let currentX = startCol;
  let currentY = startRow;

  // Convert text to uppercase to match patterns
  const upperText = text.toUpperCase();

  for (const char of upperText) {
    const pattern = charPatterns[char];
    if (!pattern) {
      // If character not found (like space), just advance horizontal position
      // Use a default width for space, e.g., 3 pegs
      const spaceWidth = 3;
      if (currentX + spaceWidth >= GRID_COLS) { // Check for wrap on space
         currentY += LINE_HEIGHT;
         currentX = startCol;
         if (currentY >= GRID_ROWS - CHAR_HEIGHT) break; // Stop if next line won't fit
      } else {
         currentX += spaceWidth + CHAR_SPACING_X;
      }
      continue; // Skip to next character
    }

    const patternHeight = pattern.length; // Should typically be CHAR_HEIGHT
    // Find max width of the current character pattern
    const patternWidth = pattern.reduce((maxWidth, row) => Math.max(maxWidth, row.length), 0);

    // --- Wrapping Logic --- 
    if (currentX + patternWidth >= GRID_COLS) {
      // Move to the next line
      currentY += LINE_HEIGHT;
      currentX = startCol;

      // Check if the new line goes off the board vertically
      if (currentY >= GRID_ROWS - CHAR_HEIGHT) {
        // Not enough vertical space for the next line
        break; // Stop processing the rest of the text
      }
    }
    // --- End Wrapping Logic ---
    
    // Check if character placement itself goes off the board (even after potential wrap)
    if (currentY >= GRID_ROWS - CHAR_HEIGHT) { 
        break; // Stop if the character won't fit vertically
    }

    // Place the pegs for the current character
    for (let r = 0; r < patternHeight; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c]) {
          const pegRow = currentY + r;
          const pegCol = currentX + c;

          // Final check to ensure peg is within grid bounds
          if (pegRow >= 0 && pegRow < GRID_ROWS && pegCol >= 0 && pegCol < GRID_COLS) {
            pegChanges.push({ row: pegRow, col: pegCol, color: selectedColor });
          }
        }
      }
    }

    // Advance horizontal position for the next character
    currentX += patternWidth + CHAR_SPACING_X;
  }

  return pegChanges;
}
