import React, { useState, useMemo } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);

  const totalIncome = useMemo(() =>
    entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0), [entries]);
  const totalExpense = useMemo(() =>
    entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0), [entries]);
  const balance = totalIncome - totalExpense;

  const catData = useMemo(() => {
    const map = {};
    entries.filter(e => e.type === 'expense').forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [entries]);

  const barData = useMemo(() => {
    const map = {};
    entries.forEach(e => {
      const month = e.date.slice(0, 7);
      if (!map[month]) map[month] = { month, income: 0, expense: 0 };
      map[month][e.type] += e.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [entries]);

  function addEntry(entry) {
    setEntries(prev => [...prev, { ...entry, id: Date.now() }]);
  }

  function deleteEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  const hasEntries = entries.length > 0;

  return (
    <div className="app">

      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <span className="app-logo-icon">💰</span>
            <div>
              <div className="app-logo-title">ExpenseIQ</div>
              <div className="app-logo-sub">Personal Finance Tracker</div>
            </div>
          </div>
          {hasEntries && (
            <div className="header-balance">
              <div className="header-balance-label">Net Balance</div>
              <div
                className="header-balance-amount"
                style={{ color: balance >= 0 ? '#16a34a' : '#ef4444' }}
              >
                {balance >= 0 ? '+' : ''}
                {'₹' + Number(Math.abs(balance)).toLocaleString('en-IN')}
              </div>
            </div>
          )}
        </div>
      </header>

      {!hasEntries && (
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-emoji">👋</div>
            <h2 className="welcome-title">Welcome to ExpenseIQ</h2>
            <p className="welcome-text">
              Start by adding your first income or expense.<br />
              Your charts and analytics will appear automatically.
            </p>
            <div className="welcome-steps">
              <div className="welcome-step">
                <span className="step-num">1</span>
                <span>Choose Income or Expense</span>
              </div>
              <div className="welcome-step">
                <span className="step-num">2</span>
                <span>Fill in the amount and category</span>
              </div>
              <div className="welcome-step">
                <span className="step-num">3</span>
                <span>Watch your analytics build up</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasEntries && (
        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />
      )}

      <div className="main-grid">
        <TransactionForm onSubmit={addEntry} />
        <TransactionList entries={entries} onDelete={deleteEntry} />
      </div>

      {hasEntries && (
        <Charts catData={catData} barData={barData} />
      )}

    </div>
  );
}