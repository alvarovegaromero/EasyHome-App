import React from 'react';

interface ExpenseContextProps {
  expenseId: string;
  setExpenseId: (id: string) => void;
}

export const ExpenseContext = React.createContext<ExpenseContextProps>({
  expenseId: '',
  setExpenseId: () => {},
});
