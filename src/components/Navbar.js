import React from "react";

const Navbar = ({ counterOne, counterTwo, counterDraw }) => {
  const PlayerX = localStorage.getItem("firstPlayer");
  const PlayerO = localStorage.getItem("secondPlayer");

  const pl1 = `${PlayerX}:${counterOne}`;
  const pl2 = `${PlayerO}: ${counterTwo}`;
  const draw = `Draw: ${counterDraw}`;

  return (
    <header>
      <div className="navbar">
        <div>Tic Tac Toe</div>
      
      <div>{pl1}</div>
      <div>{pl2}</div>
      <div>{draw}</div>
      </div>
    </header>
  );
};

export default Navbar;
