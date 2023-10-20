// StockModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddStockModal = ({ isOpen, closeModal, addStock }) => {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    // Create a new stock object from the form data
    const newStock = {
      symbol,
      name,
      price: parseFloat(price), // Convert to a number
    };

    // Make the API call to add the new stock using Axios
    axios.post('http://127.0.0.1:3000/api/add_stock', newStock)
      .then(response => {
        // Handle the API response here if needed
        console.log('API response:', response.data);
      })
      .catch(error => {
        // Handle any API call errors here
        console.error('API error:', error);
      });

    // Clear form fields and close the modal
    setSymbol('');
    setName('');
    setPrice('');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <h2>Add New Stock</h2>
      <form>
        <label>Symbol:</label>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button type="button" onClick={handleSubmit}>Add Stock</button>
      </form>
    </Modal>
  );
};

export default AddStockModal;