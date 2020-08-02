import React, { useState, useEffect, useRef } from 'react';

import { zero, figure1, figure2, figure3 } from '../init';
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



const color = (column) => {
  return (column) ? 'black' : 'white';
};

const next = (board, setBoard) => {
  const board2 = [...zero()];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board2[i][j] = fload(board, i, j);
    }
  }
  setBoard(board2);
};

const useTimer = (interval, board, setBoard, on) => {
  useEffect(() => {
    if (on) {
      interval.current = setTimeout(() => {
        next(board, setBoard);
      }, 250);
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

function Board(props) {
  const { interval, board, setBoard } = props;
  const boardEl = useRef();
  const [on, setOn] = useState(false);

  useTimer(interval, board, setBoard, on);

  return (
    <div className="board_comp">
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
    </div>
  )
}

export default Board;
