import React from 'react';
import StockPriceDisplay from './components/StockPriceDisplay';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <StockPriceDisplay />
      </Container>
    </div>
  );
}

export default App;
