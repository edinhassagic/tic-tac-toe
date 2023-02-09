import { useState } from 'react';
import Navbar from './Navbar';
import { useEffect } from 'react';
import GameHistory from './GameHistory';
import { useHistory } from 'react-router';
import { render } from 'react-dom';

const Square = props => {
  return (
    <button className='square' onClick={props.onClick}     >
      {props.value}
    </button>
  );
};



const Board = ({ PlayerX, PlayerO,  setGameHistory }) => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
 

  const handleClick = i => {
    
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareAlreadyFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareAlreadyFilled) return;
    

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    
  };

  const reset = () => {
    setSquares(initialSquares);
    setXIsNext(PlayerX);
  };

 
  let history = useHistory();
  const newGame = () => {
    history.push("/");
    localStorage.clear();
  }
  

  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  let winnerText = 'X';

  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);
  const [counterDraw, setCounterDraw] = useState(0);

  useEffect(() => {
    if (winner) {
      const date = new Date();
      let result = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}  ${PlayerX} vs ${PlayerO} : `;

      if (winner === 'X') {
        result += `winner : ${PlayerX}`;
        
      } else if (winner === 'O') {
        result += `winner : ${PlayerO}`;
        
      } else {
        
        result += 'DRAW';
      }
      const history = JSON.parse(localStorage.getItem('history')) || [];
      localStorage.setItem('history', JSON.stringify([...history, result]));
    }
  }, [winner]);

  if (winner === 'X') {
    winnerText = PlayerX;
  } else if (winner === 'O') { 
    winnerText = PlayerO;
  } else {
    winnerText = 'No winner (DRAW)';
  }

  useEffect(() => {
    if (winner === 'X') {
      setCounterOne(prev => prev + 1);
    } else if (winner === 'O') {
      setCounterTwo(prev => prev + 1);
    } else if (winner === 'D') {
      setCounterDraw(prev => prev + 1);
    }
  }, [winner]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history'));
    setGameHistory(history);
  }, [counterOne, counterTwo, counterDraw]);

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
      <div className='main'>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {renderSquare(0)} 
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button
          type='button'
          className='btn btn-outline-primary m-1'
          onClick={reset}
        >
          Try again
        </button>
        <button
          type='button'
          className='btn btn-outline-primary m-1'
          onClick={newGame}
        >
          Reset all
        </button>
      </div>
    </div>
  );
};

const Game = props => {
  const PlayerX = localStorage.getItem('firstPlayer');
  const PlayerO = localStorage.getItem('secondPlayer');

  const [gameHistory, setgameHistory] = useState();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history'));
    setgameHistory(history);
  }, []);

  return (
    <div className='game'>
      <div className='game-board left'>
        <Board
          PlayerX={PlayerX}
          PlayerO={PlayerO}
          gameHistory={gameHistory}
          setGameHistory={setgameHistory}
        />
      </div>
      <div className='game-board-right'>
        {' '}
        <GameHistory gameHistory={gameHistory} />
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let isDraw = true;
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }
  if (isDraw) return 'D';
  return null;
}

export default Game;
