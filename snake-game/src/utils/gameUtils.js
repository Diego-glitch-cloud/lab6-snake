import { INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from '../constants';

export function generateFood(snake, cols, rows) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

export function checkWallCollision(head, cols, rows) {
  return head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows;
}

export function checkSelfCollision(head, body) {
  return body.some(seg => seg.x === head.x && seg.y === head.y);
}

export function calcSpeed(score) {
  const reductions = Math.floor(score / 5);
  return Math.max(MIN_SPEED, INITIAL_SPEED - reductions * SPEED_INCREMENT);
}
