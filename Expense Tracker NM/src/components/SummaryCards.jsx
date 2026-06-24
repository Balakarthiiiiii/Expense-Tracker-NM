import React from 'react';
import { fmt } from '../data/constants';

export default function SummaryCards({ totalIncome, totalExpense, balance }) {
  return (
    <div className="summary-cards">
      <div className="summary-card income-card">
        <div className="card-top">
          <div className="card-icon income-icon">↑</div>
          <span className="card-tag">Total Income</span>
        </div>
        <div className="card-amount income-amount">{fmt(totalIncome)}</div>
        <div className="card-bar"><div className="card-bar-fill income-fill" /></div>
      </div>

      <div className="summary-card balance-card">
        <div className="card-top">
          <div className="card-icon balance-icon">◈</div>
          <span className="card-tag">Net Balance</span>
        </div>
        <div className="card-amount balance-amount" style={{ color: balance >= 0 ? '#16a34a' : '#dc2626' }}>
          {fmt(balance)}
        </div>
        <div className="card-sub">{balance >= 0 ? '✓ You are in profit' : '⚠ Expenses exceed income'}</div>
      </div>

      <div className="summary-card expense-card">
        <div className="card-top">
          <div className="card-icon expense-icon">↓</div>
          <span className="card-tag">Total Expenses</span>
        </div>
        <div className="card-amount expense-amount">{fmt(totalExpense)}</div>
        <div className="card-bar"><div className="card-bar-fill expense-fill" /></div>
      </div>
    </div>
  );
}