function Score({ score, highScore }) {
  return (
    <div className="score">
      <span>Puntaje: <strong>{score}</strong></span>
      <span>Récord: <strong>{highScore}</strong></span>
    </div>
  );
}

export default Score;
