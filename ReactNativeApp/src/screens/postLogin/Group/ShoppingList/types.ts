import {User} from '../Chores/types';

export type Product = {
  id: number;
  name: string;
  marked_to_buy: boolean;
};

export type BoughtProduct = {
  id: number;
  product: Product;
  user: User;
  price: number;
  date: string;
};
