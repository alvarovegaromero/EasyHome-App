export type Expense = {
  id: number;
  name: string;
  amount: number;
  date_paid: Date;
  paid_by: User;
};

export type DetailedExpense = Expense & {
  debtors: User[];
  date_added: Date;
};

export type User = {
  id: number;
  //is_owner: boolean; //Also, this is not needed here
  username: string;
}; // same as in Group. TODO: refactor
