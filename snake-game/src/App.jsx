import { useState, useEffect, useRef } from 'react';
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE, INITIAL_SNAKE, INITIAL_SPEED, DIRECTIONS, GAME_STATE } from './constants';
import { generateFood } from './utils/gameUtils';
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

  return <div className="app" />;
}

export default App;
