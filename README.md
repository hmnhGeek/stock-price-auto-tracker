# Mini Stock Price Tracker

The Mini Stock Price Tracker is a simple web application designed to help users monitor and track stock prices in real-time. This application includes a frontend developed with React and a backend built with Express and Node.js. It provides users with the ability to view and manage a list of stocks in the database, with stock prices updated every minute.

## Features

- **Frontend (React):**
  - **Stock Selector:** A dropdown where users can select a stock from a list of available stocks to track.
  - **Price Display:** Real-time display of the current price of the selected stock, updating every minute without a full page refresh.

- **Backend (Express and Node):**
  - **Mock API Endpoint:** A mock API endpoint that returns random stock prices for predefined stocks.
  - **Database (MongoDB):** A simplified database to store the list of stocks with their current prices.

## Challenge Elements

- **Data Handling:** Utilizes a simple polling mechanism to fetch stock price updates every minute.
- **State Management:** Manages user's stock selection and displays relevant data.

## Add-Ons

In addition to the core features of the Mini Stock Price Tracker, I've implemented several add-ons to enhance your experience.

### Adding a Stock

Users can add new stocks to their watchlist by providing the stock symbol, name, and its initial price. The application ensures that the symbol is in uppercase for consistency. Newly added stocks will be displayed in the stock selector, and their prices will be updated every minute just like the existing stocks.

### Deleting a Stock

If you no longer wish to track a particular stock, the Mini Stock Price Tracker allows you to easily remove it from your watchlist. This can be done via a simple user interface. Deleted stocks will no longer appear in the stock selector, and their prices will no longer be updated.

### Live Stock Rate Display with Chart.js

The Mini Stock Price Tracker incorporates Chart.js to provide a visual representation of stock price trends. A line chart is used to display the live stock rates of the selected stock, allowing users to observe fluctuations and changes over time. This chart updates automatically every minute to reflect the latest stock prices.

We've added these features to make the Mini Stock Price Tracker a more comprehensive tool for tracking and managing stock investments. Feel free to explore and utilize these functionalities as part of your stock monitoring experience.

## Setting up MongoDB Database and Collection

The Mini Stock Price Tracker uses a MongoDB database to store the list of predefined stocks with their current prices. To set up the database and collection, follow these steps:

### 1. Install and Start MongoDB

If you haven't already, you'll need to install MongoDB on your local machine or use a cloud-based MongoDB service. You can download MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community).

### 2. Start MongoDB Service

After installation, start the MongoDB service. The specific steps may vary depending on your operating system. **Please ensure that your service is running on port 27017, i.e., the URI should be `mongodb://127.0.0.1:27017`.**

### 3. Create a Database

Inside your mongodb instance, create a database called `stock_tracker` and a collection inside it called `stocks`.

## Setting Up Backend and Frontend Projects

The Mini Stock Price Tracker consists of both a backend and a frontend application. Here's how you can set up and run both projects:

### Backend Setup

1. Navigate to the "/backend" folder by `cd /backend`.
2. Then do `npm install` and let it finish.

### Frontend Setup
1. Navigate to the "/stock-price-tracker" by `cd /stock-price-tracker`.
2. Then do `npm install` and let it finish.

### Starting the project
1. Navigate to the "/stock-price-tracker" by `cd /stock-price-tracker`.
2. Then use `npm start` to start the project.

**The backend project will start automatically once you start the frontend project**.

## Changing the update frequency

You can change the time it takes to refresh the stock prices on screen by changing the value of `REACT_APP_UPDATE_SECONDS` in `.env` file of the frontend project. However, please note that you will need to restart the application to view the effects of this change.

## Product Images

### Homepage

!["Homepage"](./product_images/home.png)

### Searching stocks

!["Search Stocks"](./product_images/search.png)

### Loading stock price

!["Loading Stock Price"](./product_images/progress.png)

### Live stock prices

!["Live Stock Prices"](./product_images/chart.png)

### Add new stock

!["Add Stocks"](./product_images/add.png)

### Delete stocks

!["Delete Stocks"](./product_images/delete.png)
