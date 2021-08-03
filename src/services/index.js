import { signIn, signUp, getMe, updateUser } from './authService';
import {
  countCart,
  addCart,
  minCart,
  getDetailCart,
  deleteCart,
  checkoutProcess,
} from './cartService';
import {
  getTransactions,
  getDetailTransaction,
  updateStatusTransaction,
} from './transactionService';
import { addProduct } from './productService';

export const services = {
  signIn,
  signUp,
  getMe,
  updateUser,
  countCart,
  addCart,
  minCart,
  getDetailCart,
  deleteCart,
  checkoutProcess,
  getTransactions,
  getDetailTransaction,
  updateStatusTransaction,
  addProduct,
};
