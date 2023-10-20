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
