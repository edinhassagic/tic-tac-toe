import { useState } from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import GameHistory from "./GameHistory";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = ({ PlayerX, PlayerO }) => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareAlreadyFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareAlreadyFilled) return;

    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setSquares(initialSquares);
    setXIsNext(PlayerX);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  let winnerText = "X";

  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);
  const [counterDraw, setCounterDraw] = useState(0);

  if (winner) {
    const date = new Date();
    let result = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}  ${PlayerX} vs ${PlayerO} : `;
  


  if (winner === "X") {
    result += `winner : ${PlayerX}`;
    winnerText = PlayerX;
  } else if (winner === "O") {
    
    result += `winner : ${PlayerO}`;
    winnerText = PlayerO;
  } else {
    winnerText = "No winner (DRAW)";
    result += "DRAW"
  }
  const history = JSON.parse(localStorage.getItem('history')) || [] ;
  localStorage.setItem('history', JSON.stringify([...history, result]))
  }

  useEffect(() => {
    if (winner === "X") {
      setCounterOne((prev) => prev + 1);
    } else if (winner === "O") {
      setCounterTwo((prev) => prev + 1);
    } else if (winner === "No winner (DRAW)") {
      setCounterDraw((prev) => prev + 1);
    }
  }, [winner]);

  const status = winner
    ? `Winner: ${winnerText}`
    : `Next player: ${xIsNext ? PlayerX : PlayerO}`;

    

    

     
  return (
    <div>
      <Navbar
        counterOne={counterOne}
        counterTwo={counterTwo}
        counterDraw={counterDraw}
      />
       <div className="main">

       
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        type="button"
        className="btn btn-outline-primary m-1"
        onClick={reset}
      >
        Restart
      </button>
      </div>
    </div>

  );
};

const Game = (props) => {
  const PlayerX = localStorage.getItem("firstPlayer");
  const PlayerO = localStorage.getItem("secondPlayer");

 const [gameHistory, setgameHistory] = useState([])

 useEffect(() => {
  const history = JSON.parse(localStorage.getItem('history')) || [] ;
  setgameHistory(history);
}, [])



  return (
    <div className="game">
      <div className="game-board left">
        <Board PlayerX={PlayerX} PlayerO={PlayerO} />
        
      </div>
      <div className="game-board right"> <GameHistory gameHistory={gameHistory} />
       </div>
    </div>
  );
};

function calculateWinner(squares) {

  
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // shows all of the winning combinations ("lines")

  // Iterate over all the winning line combinations to see if the
  // input squares array has one of the with all 'X's or all 'O's.
  // If it does, return 'X' or 'O'.
  for (let line of combinations) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } else if (!squares.includes(null)) {
      return "No winner (DRAW)";
    }
  }
  // If none of the winning line combinations is contained in
  // input squares array, return null...
  return null;
}

export default Game;
