import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddStockModal from './AddStockModal';

const StockPriceDisplay = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableStocks, setAvailableStocks] = useState([]);
  const [refetchToggle, setRefetchToggle] = useState(false);

  const fetchAvailableStocks = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/api/stock_names`)
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchAvailableStocks().then(response => setAvailableStocks(response)).catch(err => console.error(err));
  }, [refetchToggle]);

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
      <button onClick={() => setIsModalOpen(true)}>Add Stock</button>

      {availableStocks.length > 0 && <Select
        options={availableStocks}
        onChange={(selectedOption) => setSelectedStock(selectedOption)}
      />}
      {selectedStock && (
        <div>
          <p>Selected Stock: {selectedStock.label}</p>
          <p>Current Price: {price}</p>
        </div>
      )}

    <AddStockModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} refetchList={setRefetchToggle} />

    </div>
  );
};

export default StockPriceDisplay;