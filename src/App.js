import React, { useRef, useState } from 'react';

import Figures from './Figures';
import Game from './Game';
import { figure1 } from './init';
import './App.css';

function App() {
  const interval = useRef();
  const [board, setBoard] = useState(figure1());

  return (
    <div className="App">
      <Figures setBoard={setBoard} interval={interval} />
      <Game interval={interval} board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
