import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { CATEGORIES, fmt } from '../data/constants';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {label && <div className="tooltip-label">{label}</div>}
        {payload.map((p, i) => (
          <div key={i} className="tooltip-row">
            <span className="tooltip-dot" style={{ background: p.color || p.fill }} />
            <span className="tooltip-name">{p.name}</span>
            <span className="tooltip-value">{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function EmptyChart({ message }) {
  return (
    <div className="chart-empty">
      <div className="chart-empty-icon">📊</div>
      <div className="chart-empty-text">{message}</div>
    </div>
  );
}

export default function Charts({ catData, barData }) {
  const hasExpenses = catData.length > 0;
  const hasBar = barData.length > 0;

  return (
    <div className="charts-section">
      <div className="charts-grid">

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Spending by Category</div>
            <div className="chart-card-sub">Where your money goes</div>
          </div>
          {!hasExpenses ? (
            <EmptyChart message="Add expenses to see category breakdown" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={catData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {catData.map((entry, i) => (
                    <Cell key={i} fill={CATEGORIES[entry.name]?.color || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: '12px', color: '#555' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Income vs Expenses</div>
            <div className="chart-card-sub">Monthly comparison</div>
          </div>
          {!hasBar ? (
            <EmptyChart message="Add transactions to see monthly comparison" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} barGap={4} barCategoryGap="35%">
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => v >= 1000 ? '₹' + (v / 1000).toFixed(0) + 'k' : '₹' + v}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: '12px', color: '#555' }}>{value}</span>
                  )}
                />
                <Bar dataKey="income" name="Income" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}