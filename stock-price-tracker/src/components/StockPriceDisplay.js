import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const StockPriceDisplay = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [price, setPrice] = useState(null);

  // Define the list of predefined stocks
  const stockOptions = [
    { value: 'AAPL', label: 'Apple Inc.' },
    { value: 'GOOG', label: 'Alphabet Inc.' },
    { value: 'MSFT', label: 'Microsoft Corporation' },
    // Add more stocks as needed
  ];

  const fetchStockPrice = async (symbol) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/stock/${symbol}`);
      setPrice(response.data.price);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchStockPrice(selectedStock.value);

      const intervalId = setInterval(() => {
        fetchStockPrice(selectedStock.value);
      }, 3000); // Fetch every minute

      return () => clearInterval(intervalId);
    }
  }, [selectedStock]);

  return (
    <div>
      <h2>Stock Price Tracker</h2>
      <Select
        options={stockOptions}
        onChange={(selectedOption) => setSelectedStock(selectedOption)}
      />
      {selectedStock && (
        <div>
          <p>Selected Stock: {selectedStock.label}</p>
          <p>Current Price: {price}</p>
        </div>
      )}
    </div>
  );
};

export default StockPriceDisplay;