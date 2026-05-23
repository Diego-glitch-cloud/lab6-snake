function StartScreen({ onStart }) {
  return (
    <div className="overlay">
      <h1 className="overlay-title">Snake</h1>
      <div className="overlay-controls">
        <p>Controles</p>
        <ul>
          <li>Arrow keys</li>
          <li>W A S D</li>
        </ul>
      </div>
      <button className="btn" onClick={onStart}>
        Jugar
      </button>
    </div>
  );
}

export default StartScreen;
