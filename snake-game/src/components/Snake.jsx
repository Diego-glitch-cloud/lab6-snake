function Snake({ segments, cellSize }) {
  return (
    <>
      {segments.map((seg, index) => {
        const style = {
          position: 'absolute',
          left: seg.x * cellSize,
          top: seg.y * cellSize,
          width: cellSize,
          height: cellSize,
        };
        const className = index === 0 ? 'snake-head' : 'snake-body';
        return <div key={index} className={className} style={style} />;
      })}
    </>
  );
}

export default Snake;
