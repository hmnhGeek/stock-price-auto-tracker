import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddStockModal from '../AddStocksModal/AddStockModal';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';
import './StockPriceDisplay.css';
import StockTable from '../StockTable/StockTable';
import logo from '../../images/logo.png';
import StockChart from '../StockChart/StockChart';

const StockPriceDisplay = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableStocks, setAvailableStocks] = useState([]);
  const [refetchToggle, setRefetchToggle] = useState(false);
  const [chartData, setChartData] = useState({labels: [], priceHistory: []});
  const MAX_DATA_POINTS_ALLOWED = useMemo(() => 20, []);
  const SHOW_CHART_AT = useMemo(() => parseInt(MAX_DATA_POINTS_ALLOWED * 0.2), []);

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

  useEffect(() => {
    if(chartData.labels.length === MAX_DATA_POINTS_ALLOWED) {
      const updatedLabels = chartData.labels.slice(1);
      const updatedPriceHistory = chartData.priceHistory.slice(1);

      const newData = {
        labels: updatedLabels,
        priceHistory: updatedPriceHistory,
      };

      setChartData(newData);
    }
  }, [chartData]);

  const fetchStockPrice = async (symbol) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/stock/${symbol}`);
      setPrice(response.data.price);

      setChartData(c => ({...c, 
        labels: [...c.labels, new Date().valueOf()], 
        priceHistory: [...c.priceHistory, response.data.price]
      }));
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
      <Row className='logo-row'>
        <img className='logo-image' src={logo} />
      </Row>

      <Row>
        <Col xs={12}>
          <Button className='app-button add-stock-button' variant="primary" onClick={() => setIsModalOpen(true)}>Add Stock</Button>
        </Col>
      </Row>

      {availableStocks.length > 0 && <Select
        options={availableStocks}
        onChange={(selectedOption) => {
          setSelectedStock(selectedOption);
          setChartData({labels: [], priceHistory: []});
        }}
      />}
      {selectedStock && (
        <div>
          <StockTable
            stockName={selectedStock.label}
            stockPrice={price}
          />
        </div>
      )}

      {
        chartData.labels.length >= SHOW_CHART_AT ? 
        <StockChart data={chartData} /> : 
        selectedStock && <ProgressBar 
          now={(chartData.labels.length / SHOW_CHART_AT)*100} 
          label={`Gathering enough data points to show chart, ${(chartData.labels.length / SHOW_CHART_AT)*100}% done`} 
        />
      }
      <AddStockModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} refetchList={setRefetchToggle} />
    </div>
  );
};

export default StockPriceDisplay;