function Board({ children, cols, rows, cellSize }) {
  const style = {
    position: 'relative',
    width: cols * cellSize,
    height: rows * cellSize,
  };

  return (
    <div className="board" style={style}>
      {children}
    </div>
  );
}

export default Board;
