import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";



function Login() {
  let history = useHistory();
  const [firstPlayer, setfirstPlayer] = useState("")
  const [secondPlayer, setsecondPlayer] = useState("")
  

 const start = () => {
    if(firstPlayer && secondPlayer)
    {   
        localStorage.setItem('firstPlayer', firstPlayer);
        localStorage.setItem('secondPlayer', secondPlayer);
        history.push('/game')}
 }

  return (
    <div className="form-group ">
      <label>Player1:</label>
      <input
        value={firstPlayer}
        onChange= {(e) => setfirstPlayer(e.target.value)}
        type="text"
        required
        className="form-control "
        placeholder="Enter your name"
      />

      <label>Player2:</label>
      <input
      value={secondPlayer}
      onChange= {(e) => setsecondPlayer(e.target.value)}
        type="text"
        required
        className="form-control"
        placeholder="Enter your name"
      />

      <button
        onClick={start}
        className="btn btn-primary mt-2"
      >
        Start
      </button>
    </div>
  );
}

export default Login;
