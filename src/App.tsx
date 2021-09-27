import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Routes } from './routes';
import { Container } from './styles';

function App() {
  return (
    <Container>
      <Router>
        <Menu />
        <Routes />
      </Router>
    </Container>
  );
}

export default App;
