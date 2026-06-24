import React, { useState } from 'react';
import { CATEGORIES, fmt } from '../data/constants';

export default function TransactionList({ entries, onDelete }) {
  const [tab, setTab] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = (() => {
    const list = tab === 'all' ? entries : entries.filter(e => e.type === tab);
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  })();

  function confirmDelete(id) {
    setDeleteId(id);
    setTimeout(() => {
      onDelete(id);
      setDeleteId(null);
    }, 300);
  }

  return (
    <div className="list-panel">
      <div className="list-header">
        <h2>Transactions</h2>
        <div className="tabs">
          {['all', 'income', 'expense'].map(t => (
            <button
              key={t}
              className={`tab ${tab === t ? 'tab-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="txn-list">
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              {tab === 'all' ? '📋' : tab === 'income' ? '💰' : '💸'}
            </div>
            <div className="empty-title">No {tab === 'all' ? '' : tab} transactions yet</div>
            <div className="empty-sub">
              {tab === 'all'
                ? 'Add your first transaction using the form'
                : `Add a ${tab} entry to see it here`}
            </div>
          </div>
        )}

        {filtered.map(e => (
          <div
            key={e.id}
            className={`txn-item ${e.type} ${deleteId === e.id ? 'txn-deleting' : ''}`}
          >
            <div className="txn-icon-wrap" style={{ background: (CATEGORIES[e.category]?.color || '#94a3b8') + '18' }}>
              <span>{CATEGORIES[e.category]?.icon || '📦'}</span>
            </div>
            <div className="txn-details">
              <div className="txn-category">{e.category}</div>
              <div className="txn-meta">
                {new Date(e.date).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
                {e.note && <span className="txn-note"> · {e.note}</span>}
              </div>
            </div>
            <div className="txn-right">
              <div className={`txn-amount ${e.type}`}>
                {e.type === 'income' ? '+' : '-'}{fmt(e.amount)}
              </div>
              <button className="txn-del" onClick={() => confirmDelete(e.id)} title="Delete">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}