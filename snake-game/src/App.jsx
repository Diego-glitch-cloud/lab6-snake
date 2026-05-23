import { useState, useEffect, useRef } from 'react';
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE, INITIAL_SNAKE, INITIAL_SPEED, DIRECTIONS, OPPOSITES, KEY_MAP, GAME_STATE } from './constants';
import { generateFood, checkWallCollision, checkSelfCollision, calcSpeed } from './utils/gameUtils';
import Board from './components/Board';
import Snake from './components/Snake';
import Food from './components/Food';
import Score from './components/Score';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import './App.css';

function App() {
  const [snake, setSnake]         = useState(INITIAL_SNAKE);
  const [food, setFood]           = useState(() => generateFood(INITIAL_SNAKE, BOARD_COLS, BOARD_ROWS));
  const [score, setScore]         = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snakeHighScore')) || 0);
  const [speed, setSpeed]         = useState(INITIAL_SPEED);
  const [gameState, setGameState] = useState(GAME_STATE.START);

  // useRef para evitar stale closures dentro del interval
  const snakeRef    = useRef(snake);
  const foodRef     = useRef(food);
  const scoreRef    = useRef(score);
  const speedRef    = useRef(speed);
  const dirRef      = useRef(DIRECTIONS.RIGHT);
  const pendingDir  = useRef(DIRECTIONS.RIGHT);

  // Sincronizar refs con estado
  useEffect(() => { snakeRef.current  = snake;  }, [snake]);
  useEffect(() => { foodRef.current   = food;   }, [food]);
  useEffect(() => { scoreRef.current  = score;  }, [score]);
  useEffect(() => { speedRef.current  = speed;  }, [speed]);

  const moveSnake = () => {
    // Aplicar dirección pendiente
    dirRef.current = pendingDir.current;
    const dir = dirRef.current;

    const current = snakeRef.current;
    const head = { x: current[0].x + dir.x, y: current[0].y + dir.y };

    // Colisión con pared o consigo misma
    if (
      checkWallCollision(head, BOARD_COLS, BOARD_ROWS) ||
      checkSelfCollision(head, current)
    ) {
      const finalScore = scoreRef.current;
      setHighScore(prev => {
        const best = Math.max(prev, finalScore);
        localStorage.setItem('snakeHighScore', best);
        return best;
      });
      setGameState(GAME_STATE.GAMEOVER);
      return;
    }

    const ateFood = head.x === foodRef.current.x && head.y === foodRef.current.y;
    const newSnake = ateFood
      ? [head, ...current]                // crece: no quitar cola
      : [head, ...current.slice(0, -1)];  // mueve: quitar cola

    if (ateFood) {
      const newScore = scoreRef.current + 1;
      const newFood  = generateFood(newSnake, BOARD_COLS, BOARD_ROWS);
      const newSpeed = calcSpeed(newScore);
      setScore(newScore);
      setFood(newFood);
      setSpeed(newSpeed);
      foodRef.current  = newFood;
      scoreRef.current = newScore;
      speedRef.current = newSpeed;
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const handleKey = (e) => {
      const dirName = KEY_MAP[e.key];
      if (!dirName) return;
      // Bloquear dirección opuesta
      if (dirName === OPPOSITES[dirRef.current.name]) return;
      pendingDir.current = { ...DIRECTIONS[dirName], name: dirName };
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return <div className="app" />;
}

export default App;
