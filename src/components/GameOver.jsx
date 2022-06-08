import "./GameOver.css";

const GameOver = ({ turns, shuffleCards }) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      {turns <= 10 && <h5>Pretty good! It took you {turns} turns</h5>}
      {turns <= 15 && <h5>Not too bad, you needed {turns} rounds</h5>}
      {turns > 15 && (
        <h5>Come on, you can do better. You needed {turns} attempts</h5>
      )}
      <button onClick={shuffleCards}>Try again?</button>
    </div>
  );
};

export default GameOver;
