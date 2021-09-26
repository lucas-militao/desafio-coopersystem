import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Routes } from './routes';

function App() {
  return (
    <Router>
      <Menu />
      <Routes />
    </Router>
  );
}

export default App;
