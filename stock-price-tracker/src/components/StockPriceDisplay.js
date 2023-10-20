import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddStockModal from './AddStockModal';
import { Button, Col, Row } from 'react-bootstrap';
import './StockPriceDisplay.css';
import StockTable from './StockTable';

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
      <Row>
        <Col xs={12}>
          <Button className='app-button add-stock-button' variant="primary" onClick={() => setIsModalOpen(true)}>Add Stock</Button>
        </Col>
      </Row>

      {availableStocks.length > 0 && <Select
        options={availableStocks}
        onChange={(selectedOption) => setSelectedStock(selectedOption)}
      />}
      {selectedStock && (
        <div>
          <StockTable
            stockName={selectedStock.label}
            stockPrice={price}
          />
        </div>
      )}

    <AddStockModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} refetchList={setRefetchToggle} />

    </div>
  );
};

export default StockPriceDisplay;