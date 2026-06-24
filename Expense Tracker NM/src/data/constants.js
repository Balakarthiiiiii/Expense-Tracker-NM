export const CATEGORIES = {
  Food:          { icon: '🍔', color: '#f97316' },
  Travel:        { icon: '🚗', color: '#8b5cf6' },
  Shopping:      { icon: '🛍️', color: '#ec4899' },
  Bills:         { icon: '📄', color: '#64748b' },
  Entertainment: { icon: '🎬', color: '#06b6d4' },
  Health:        { icon: '💊', color: '#10b981' },
  Salary:        { icon: '💼', color: '#2563eb' },
  Freelance:     { icon: '💻', color: '#7c3aed' },
  Investment:    { icon: '📈', color: '#0891b2' },
  Other:         { icon: '📦', color: '#94a3b8' },
};

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Other'];
export const EXPENSE_CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export function fmt(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

export function getCategories(type) {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}