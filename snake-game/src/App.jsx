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
  const dirRef    = useRef(DIRECTIONS.RIGHT);
  const dirQueue  = useRef([]); // cola de direcciones pendientes

  // Sincronizar refs con estado
  useEffect(() => { snakeRef.current  = snake;  }, [snake]);
  useEffect(() => { foodRef.current   = food;   }, [food]);
  useEffect(() => { scoreRef.current  = score;  }, [score]);
  useEffect(() => { speedRef.current  = speed;  }, [speed]);

  const moveSnake = () => {
    // Consumir siguiente dirección de la cola
    if (dirQueue.current.length > 0) {
      dirRef.current = dirQueue.current.shift();
    }
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

      // Dirección efectiva actual = último en cola o dirRef
      const queue = dirQueue.current;
      const lastDir = queue.length > 0 ? queue[queue.length - 1] : dirRef.current;

      // Bloquear opuesta y duplicada
      if (dirName === OPPOSITES[lastDir.name]) return;
      if (dirName === lastDir.name) return;

      // Máximo 2 entradas en cola — evita buffer infinito
      if (queue.length < 2) {
        queue.push(DIRECTIONS[dirName]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  //  handlers
  const resetGame = () => {
    const initialSnake = INITIAL_SNAKE;
    const initialFood  = generateFood(initialSnake, BOARD_COLS, BOARD_ROWS);

    snakeRef.current   = initialSnake;
    foodRef.current    = initialFood;
    scoreRef.current   = 0;
    speedRef.current   = INITIAL_SPEED;
    dirRef.current   = DIRECTIONS.RIGHT;
    dirQueue.current = [];

    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState(GAME_STATE.PLAYING);
  };

  const handleStart   = () => resetGame();
  const handleRestart = () => resetGame();

  // game loop
  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) return;
    const id = setInterval(moveSnake, speed);
    return () => clearInterval(id);
  }, [gameState, speed]);

  return (
    <div className="app">
      <Score score={score} highScore={highScore} />
      <Board cols={BOARD_COLS} rows={BOARD_ROWS} cellSize={CELL_SIZE}>
        <Snake segments={snake} cellSize={CELL_SIZE} />
        <Food position={food} cellSize={CELL_SIZE} />
      </Board>
      {gameState === GAME_STATE.START && (
        <StartScreen onStart={handleStart} />
      )}
      {gameState === GAME_STATE.GAMEOVER && (
        <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
