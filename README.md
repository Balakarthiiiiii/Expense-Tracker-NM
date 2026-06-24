# ExpenseIQ - Daily Expense Analytics Dashboard

A React-based personal finance tracker that helps users monitor income, expenses, and spending habits through interactive charts and analytics.

## Features

- Add income and expense transactions
- Category-wise tracking with icons
- Total income, expense, and net balance summary
- Pie chart — spending breakdown by category
- Bar chart — monthly income vs expense comparison
- Filter transactions by All / Income / Expense
- Delete transactions
- Clean empty state for new users

## Tech Stack

- React 18
- Vite
- Recharts
- CSS3

## Getting Started

### Install dependencies
npm install

### Run the app
npm run dev

Open http://localhost:5173 in your browser.

## Project Structure

src/
├── components/
│   ├── SummaryCards.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionList.jsx
│   └── Charts.jsx
├── data/
│   └── constants.js
├── App.jsx
└── App.css
