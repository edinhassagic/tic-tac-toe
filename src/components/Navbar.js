import React from 'react';





const Navbar = () => {


    const PlayerX = localStorage.getItem('firstPlayer');
    const PlayerO = localStorage.getItem('secondPlayer');
    
    const pl1 = `${PlayerX}: 0`
    const pl2 = `${PlayerO}: 0`
    const draw = `Draw: 0`

    return (
        
      
    <header>

<div className="navbar">
   <p>Tic Tac Toe</p> 
   </div>
         <div>
         {pl1}
             </div>
             <div>
             {pl2}
             </div>
             <div>
                {draw}
             </div>
          


    </header>


)

}

export default Navbar;