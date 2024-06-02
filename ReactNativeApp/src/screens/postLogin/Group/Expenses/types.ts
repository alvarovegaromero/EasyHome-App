export type Expense = {
  id: number;
  name: string;
  amount: number;
  date_paid: Date;
  paid_by_username: string;
};

export type User = {
  id: number;
  is_owner: boolean; //Also, this is not needed here
  username: string;
}; // same as in Group. TODO: refactor
