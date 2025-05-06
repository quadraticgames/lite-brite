export const PEG_COLORS = [
  { name: 'white', value: '#c5c5c5', tailwindClass: 'bg-litebrite-white', glowClass: 'shadow-glow-white' }, 
  { name: 'black', value: '#000000', tailwindClass: 'bg-litebrite-black', glowClass: 'shadow-glow-black' },
  { name: 'crimson-red', value: '#E63946', tailwindClass: 'bg-litebrite-crimson-red', glowClass: 'shadow-glow-crimson-red' },
  { name: 'deep-orange', value: '#F77F00', tailwindClass: 'bg-litebrite-deep-orange', glowClass: 'shadow-glow-deep-orange' },
  { name: 'gold-yellow', value: '#FCCA46', tailwindClass: 'bg-litebrite-gold-yellow', glowClass: 'shadow-glow-gold-yellow' },
  { name: 'lime-green', value: '#90BE6D', tailwindClass: 'bg-litebrite-lime-green', glowClass: 'shadow-glow-lime-green' },
  { name: 'turquoise', value: '#43AA8B', tailwindClass: 'bg-litebrite-turquoise', glowClass: 'shadow-glow-turquoise' },
  { name: 'sky-blue', value: '#4D9DE0', tailwindClass: 'bg-litebrite-sky-blue', glowClass: 'shadow-glow-sky-blue' }, 
  { name: 'royal-purple', value: '#8338EC', tailwindClass: 'bg-litebrite-royal-purple', glowClass: 'shadow-glow-royal-purple' },
  { name: 'hot-pink', value: '#FF006E', tailwindClass: 'bg-litebrite-hot-pink', glowClass: 'shadow-glow-hot-pink' },
];

export const DEFAULT_GRID_SIZE = { rows: 20, cols: 31 };

export const EMPTY_COLOR = 'transparent';

export const TOOLS = {
  PAINT: 'paint',
  TEXT: 'text',
};

// New stencil overlays
export const STENCILS = [
  {
    id: 'heart',
    name: 'Heart',
    data: [
      "    XXX   XXX    ",
      "   XXXXX XXXXX   ",
      "  XXXXXXXXXXXXX  ",
      "  XXXXXXXXXXXXX  ",
      "   XXXXXXXXXXX   ",
      "    XXXXXXXXX    ",
      "     XXXXXXX     ",
      "      XXXXX      ",
      "       XXX       ",
      "        X        ",
    ],
  },
  {
    id: 'spaceship',
    name: 'Spaceship',
    data: [
      "        X        ",
      "        X        ",
      "        X        ",
      "        X        ",
      "       XXX       ",
      "       XXX       ",
      "      XXXXX      ",
      "       XXX       ",
      "   XXXXXXXXXXX   ",
      " XXXXXXXXXXXXXXX ",
      "       XXX       ",
      "      XX XX      ",
      "     X     X     "
    ],
  },
  {

      id: 'r2d2',
      name: 'R2-D2',
      data: [
        "           XXXXXXXX          ",
        "         XXXXX  XXXXX        ",
        "        XXXXX    XXXXX       ",
        "       XX  XX    XX XXX      ",
        "       XXX  XX  XX   XX      ",
        "       XXX XXXXXXX  XXX      ",
        "       XX    XXX     XX      ",
        "       XX  XXXXXXX  XXX      ",
        "       XXXXXXXXXXXXXXXX      ",
        "       XX   XXXXX    XX      ",
        "       XX   X XXX X  XX      ",
        "       XX XXXXXXX  X XX      ",
        "       XXX XXXXXX   XXX      ",
        "       X X    X     X X      ",
        "       X XXXXXXXXXXXX X      ",
        "       X X XXXXXXXX X X      ",
        "       X X          X X      ",
        "      XX XX        XX XX     ",
        "     XXXXXXX      XXXXXXX    ",
        "                             "
      ],
    },
    {
      id: 'house',
      name: 'House',
      data: [
        "               X               ",
        "              XXX              ",
        "             XXXXX             ",
        "            XXXXXXX            ",
        "           XXXXXXXXX           ",
        "          XXXXXXXXXXX          ",
        "         XXXXXXXXXXXXX         ",
        "        XXXXXXXXXXXXXXX        ",
        "       XXXXXXXXXXXXXXXXX       ",
        "      XXXXX   XXX   XXXXX      ",
        "      XXXXX   XXX   XXXXX      ",
        "      XXXXX   XXX   XXXXX      ",
        "      XXXXX   XXX   XXXXX      ",
        "      XXXXXXXXXXXXXXXXXXX      ",
        "      XX  XXXX   XXXX  XX      ",
        "      XX  XXXX   XXXX  XX      ",
        "      XXXXXXXX   XXXXXXXX      ",
        "      XXXXXXXX   XXXXXXXX      ",
        "      XXXXXXXX   XXXXXXXX      ",
        "                               "
      ],
    
  },
  {
    id: 'gameu',
    name: 'GAMEU!',
    data: [
      "XXXX  XX  XXXXX XXXX X  X X ",
      "X    X  X X X X X    X  X X ",
      "X XX X  X X X X XXX  X  X X ",
      "X  X XXXX X X X X    X  X   ",
      "XXXX X  X X X X XXXX XXXX X "
    ],
  },
];
