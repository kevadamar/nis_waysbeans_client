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
import {
  addProduct,
  getMyProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} from './productService';

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
  getMyProducts,
  deleteProduct,
  updateProduct,
  getProduct,
};
