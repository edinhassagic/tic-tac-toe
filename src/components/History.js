import React from 'react';
import { useState, useEffect } from 'react';


// let date = new Date().toString()


export default function History() {

   
    
    const result = {
        name: "Edin",
      };
    
      const [results, setResults] = useState([]);
    
      useEffect(() => {
        if (localStorage.getItem("tic-tac-toe")) {
          setResults(JSON.parse(localStorage.getItem("tic-tac-toe")));
        }
      }, []);
    
      const saveData = () => {
        results.push(result);
        localStorage.setItem("todos", JSON.stringify(results));
      };
}
