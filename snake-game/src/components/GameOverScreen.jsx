function GameOverScreen({ score, highScore, onRestart }) {
  return (
    <div className="overlay">
      <h1 className="overlay-title">Game Over</h1>
      <div className="overlay-stats">
        <p>Puntaje: <strong>{score}</strong></p>
        <p>Récord: <strong>{highScore}</strong></p>
      </div>
      <button className="btn" onClick={onRestart}>
        Reintentar
      </button>
    </div>
  );
}

export default GameOverScreen;
