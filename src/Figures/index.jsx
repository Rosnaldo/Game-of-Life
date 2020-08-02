import React from 'react';
import { figure1, figure2, figure3 } from '../init';
import './style.css';

const figures = {
  '1': figure1,
  '2': figure2,
  '3': figure3,
};

const handleClick = (e, interval, setBoard) => {
  const number = e.target.getAttribute('class');
  clearInterval(interval.current);
  setBoard(figures[number]());
};

function Figures(props) {
  const { interval, setBoard } = props;
  return (
    <div className="figures">
      <img src="" className="1" onClick={(e) => handleClick(e, interval, setBoard)} />
      <img src="" className="2" onClick={(e) => handleClick(e, interval, setBoard)} />
      <img src="" className="3" onClick={(e) => handleClick(e, interval, setBoard)} />
    </div>
  )
}

export default Figures;
