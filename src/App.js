import React from 'react';
import { Route } from 'react-router-dom';

import Game from './Game';

import './App.css';

function App() {
  return (
    <Route exact path="/" component={Game} />
  );
}

export default App;
