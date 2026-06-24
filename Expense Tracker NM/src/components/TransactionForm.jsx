import React, { useState } from 'react';
import { CATEGORIES, getCategories, fmt } from '../data/constants';

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({
    type: 'expense',
    category: 'Food',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleTypeChange(type) {
    const cats = getCategories(type);
    setForm(f => ({ ...f, type, category: cats[0] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm(f => ({
      type: f.type,
      category: getCategories(f.type)[0],
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  const categories = getCategories(form.type);

  return (
    <div className="form-panel">
      <div className="form-header">
        <h2>Add Transaction</h2>
        <p>Record your income or expense</p>
      </div>

      <div className="type-toggle">
        <button
          type="button"
          className={`type-btn ${form.type === 'expense' ? 'type-expense-active' : ''}`}
          onClick={() => handleTypeChange('expense')}
        >
          <span>↓</span> Expense
        </button>
        <button
          type="button"
          className={`type-btn ${form.type === 'income' ? 'type-income-active' : ''}`}
          onClick={() => handleTypeChange('income')}
        >
          <span>↑</span> Income
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Amount</label>
          <div className="amount-input-wrap">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              min="1"
              onChange={e => { setForm(f => ({ ...f, amount: e.target.value })); setError(''); }}
              className="amount-input"
            />
          </div>
          {error && <div className="input-error">{error}</div>}
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {categories.map(c => (
                <option key={c}>{CATEGORIES[c]?.icon} {c}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Note <span className="optional">(optional)</span></label>
          <input
            type="text"
            placeholder="What was this for?"
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          />
        </div>

        <button type="submit" className={`submit-btn ${success ? 'submit-success' : ''}`}>
          {success ? '✓ Added Successfully' : `Add ${form.type === 'income' ? 'Income' : 'Expense'}`}
        </button>
      </form>
    </div>
  );
}