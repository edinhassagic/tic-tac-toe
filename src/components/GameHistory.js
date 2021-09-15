import React from 'react';


const GameHistory = ({gameHistory}) => {


  
  return (
    <div>
    <h2> Game History</h2>
    {gameHistory && gameHistory.map(gh => <div>{gh}</div>)}
    </div>
  );
}

export default GameHistory;