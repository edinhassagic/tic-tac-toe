import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Login() {
  let history = useHistory();
  const [firstPlayer, setfirstPlayer] = useState("");
  const [secondPlayer, setsecondPlayer] = useState("");

  const start = () => {
    if (firstPlayer && secondPlayer) {
      localStorage.setItem("firstPlayer", firstPlayer);
      localStorage.setItem("secondPlayer", secondPlayer);
      history.push("/game");
    }
  };

  return (
    <div className="form-group ">
      <form>
        <label>Player1:</label>
        <input
          id="name1"
          value={firstPlayer}
          onChange={(e) => setfirstPlayer(e.target.value)}
          type="text"
          required
          className="form-control "
          placeholder="Enter your name"
        />

        <label>Player2:</label>
        <input
          id="name2"
          value={secondPlayer}
          onChange={(e) => setsecondPlayer(e.target.value)}
          type="text"
          required
          className="form-control"
          placeholder="Enter your name"
        />

        <button onClick={start} className="btn btn-primary mt-2">
          Start
        </button>
      </form>
    </div>
  );
}

export default Login;
