export type Task = {
  id: number;
  group: number; // group id
  title: string;
};

export type AssignableTask = {
  id: number;
  task: Task;
  assigned_user: string; // user id
  is_completed: boolean;
  date: Date;
};

export type User = {
  id: number;
  username: string;
}; // same as in Group. TODO: refactor
