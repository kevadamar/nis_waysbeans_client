import { signIn, signUp, getMe } from './authService';
import {
  countCart,
  addCart,
  minCart,
  getDetailCart,
  deleteCart,
  checkoutProcess,
} from './cartService';
import { getTransactions } from './transactionService';

export const services = {
  signIn,
  signUp,
  getMe,
  countCart,
  addCart,
  minCart,
  getDetailCart,
  deleteCart,
  checkoutProcess,
  getTransactions,
};
