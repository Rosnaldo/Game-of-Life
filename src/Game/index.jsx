import React, { useState, useEffect, useRef } from 'react';

import './style.css';

const populated = (count) => {
  if (count === 2 || count === 3) return 1;
  return 0;
};

const unpopulated = (count) => {
  return (count === 3) ? 1 : 0;
};

const fload = (board, x, y) => {
  const exist = board[x][y];
  let count = 0;
  if (board[x - 1]?.[y - 1]) count++;
  if (board[x]?.[y - 1]) count++;
  if (board[x + 1]?.[y - 1]) count++;

  if (board[x - 1]?.[y]) count++;
  if (board[x + 1]?.[y]) count++;

  if (board[x - 1]?.[y + 1]) count++;
  if (board[x]?.[y + 1]) count++;
  if (board[x + 1]?.[y + 1]) count++;

  if (exist) {
    return populated(count);
  }
  return unpopulated(count);
};

const boardZero = () => {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
};

const boardInit = () => {
  return [
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
};

const color = (column) => {
  return (column) ? 'black' : 'white';
};

const next = (board, setBoard) => {
  const zero = [...boardZero()];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      zero[i][j] = fload(board, i, j);
    }
  }
  setBoard(zero);
};

const useTimer = (interval, board, setBoard, on) => {
  useEffect(() => {
    if (on) {
      interval.current = setTimeout(() => {
        next(board, setBoard);
      }, 1000);
    }
  }, [on, board]);
};

const start = (setOn) => {
  setOn(true);
};

const stop = (setOn, interval) => {
  clearInterval(interval.current);
  setOn(false);
};

function Board() {
  const boardEl = useRef();
  const interval = useRef();
  const [board, setBoard] = useState(boardInit);
  const [on, setOn] = useState(false);

  useTimer(interval, board, setBoard, on);

  return (
    <React.Fragment>
      <h1>Game of life</h1>
      <div className="board" ref={boardEl}>
        {board.map((line,i) => (
          <div key={`${line}-${i}`} className="line">
            {line.map((column, j) => (
              <div
                key={`${column}-${j}`}
                className="square"
                style={{ backgroundColor: color(column) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="container">
        <button type="button" onClick={() => next(board, setBoard)}>Next</button>
        {on ? 
          <button type="button" onClick={() => stop(setOn, interval)}>Stop</button> :
          <button type="button" onClick={() => start(setOn)}>Start</button>}
      </div>
    </React.Fragment>
  )
}

export default Board;
