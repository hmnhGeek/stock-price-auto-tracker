const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;

const RATE_UPDATE_FREQ_IN_SECONDS = 5;

// Use the cors middleware to enable CORS
app.use(cors());

// Set up MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/stock_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for stocks
const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
});

const Stock = mongoose.model('Stock', stockSchema);

// Create a function to update stock prices (mocked in this example)
function updateStockPrices() {
  // Replace this with logic to fetch updated stock prices from a real API
  Stock.find({}).exec().then(stocks => {
    const stocksArray = stocks.map(stock => stock.toObject());

    stocksArray.forEach(async (stock) => {
        try {
            const newPrice = Math.random() * 100;
            await Stock.findOneAndUpdate({ _id: stock._id }, { price: newPrice });
        } catch (err) {
            console.error('Error updating stock:', err);
        }
    });
    }).catch(err => console.log(err));
}

// Schedule the function to run every 30 seconds
cron.schedule(`*/${RATE_UPDATE_FREQ_IN_SECONDS} * * * * *`, () => {
    updateStockPrices();
});
  

// Mock API Endpoint: Get stock price for a given symbol
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol }).exec();
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }
    res.json({ symbol: stock.symbol, price: stock.price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/stock_names', async (req, res) => {
    try {
        Stock.find({}).exec().then(stocks => {
            const stocksArray = stocks.map(stock => stock.toObject());
            const stockNames = stocksArray.map(stock => stock.name);
            res.json(stockNames);            
        }).catch(err => console.log(err));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});