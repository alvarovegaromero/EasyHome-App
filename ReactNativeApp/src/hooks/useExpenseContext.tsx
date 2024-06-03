import {useState} from 'react';

interface UseExpenseHook {
  expenseId: string;
  setExpenseId: (id: string) => void;
}

const useExpense = (): UseExpenseHook => {
  const [expenseId, setExpenseId] = useState('');

  return {expenseId, setExpenseId};
};

export default useExpense;
