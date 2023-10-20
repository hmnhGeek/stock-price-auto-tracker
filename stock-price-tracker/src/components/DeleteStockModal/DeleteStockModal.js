import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import axios from 'axios';

const DeleteStockModal = ({ show, onHide, stocks, onDelete }) => {
  const [selectedStock, setSelectedStock] = useState(null);

  const handleDelete = () => {
    if (selectedStock) {
      const symbol = selectedStock.value;

      axios.delete(`http://127.0.0.1:3000/api/delete_stock/${symbol}`)
        .then(() => {
          onDelete(symbol); // Notify the parent component that a stock has been deleted
        })
        .catch((error) => {
          console.error('Error deleting stock:', error);
        });
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          options={stocks}
          onChange={selectedOption => setSelectedStock(selectedOption)}
          placeholder="Select a stock to delete"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStockModal;