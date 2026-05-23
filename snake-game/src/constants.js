export const BOARD_COLS = 20;
export const BOARD_ROWS = 20;
export const CELL_SIZE = 28; // px

export const INITIAL_SPEED = 150; // ms per tick
export const SPEED_INCREMENT = 5; // ms menos por cada 5 pts
export const MIN_SPEED = 60;      // ms floor

export const DIRECTIONS = {
  UP:    { x:  0, y: -1 },
  DOWN:  { x:  0, y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x:  1, y:  0 },
};

// Para validar que no se mueva en dirección opuesta
export const OPPOSITES = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

// Mapeo de teclas → nombre de dirección
export const KEY_MAP = {
  ArrowUp:    'UP',
  ArrowDown:  'DOWN',
  ArrowLeft:  'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
  W: 'UP',
  S: 'DOWN',
  A: 'LEFT',
  D: 'RIGHT',
};

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9,  y: 10 },
  { x: 8,  y: 10 },
];

export const GAME_STATE = {
  START:    'start',
  PLAYING:  'playing',
  GAMEOVER: 'gameover',
};
