import { createContext, useReducer } from 'react';
import { getDataLocalStorage, saveToLocalStorage } from '../../Helpers';
import {
  ADD_NEW_USER,
  HIDE_ALERT,
  HIDE_SIGN_IN,
  LOGIN,
  LOGOUT,
  SET_CART,
  SHOW_SIGN_IN,
  UPDATE_PHOTO,
} from './action';

export const UserContext = createContext();

const initialState = {
  showModalLogin: false,
  isLogin: false,
  isSignUp: false,
  countCart: 0,
  user: {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    address: '',
    gender: '',
  },
  tempUser: [],
};

const handleSignUp = ({ currentState, payload }) => {
  let newUser = [];
  let found = false;
  const checkUser = currentState.tempUser.find(
    (state) => state.email === payload.email,
  );
  if (checkUser) {
    newUser = currentState.tempUser;
    found = true;
    console.log('exist');
  } else {
    newUser = currentState.tempUser;
    newUser = newUser.concat(payload);
    found = false;
    console.log('new');
  }

  return {
    ...currentState,
    tempUser: newUser,
    isLogin: false,
    isSignUp: found,
  };
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        isLogin: true,
        isSignUp: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: {
          fullname: '',
          name: '',
          email: '',
          password: '',
          role: '',
        },
        isLogin: false,
        isSignUp: false,
      };
    case ADD_NEW_USER:
      return handleSignUp({ currentState: state, payload });
    case HIDE_ALERT:
      return {
        ...state,
        isSignUp: false,
      };
    case SHOW_SIGN_IN:
      return {
        ...state,
        showModalLogin: true,
      };
    case HIDE_SIGN_IN:
      return {
        ...state,
        showModalLogin: false,
      };
    case UPDATE_PHOTO:
      const userLocal = getDataLocalStorage({ key: 'user' });
      saveToLocalStorage({
        key: 'user',
        payload: { ...userLocal, image_profile: payload },
      });
      return {
        ...state,
        user: { ...state.user, image_profile: payload },
      };
    case SET_CART:
      return {
        ...state,
        countCart: payload.countCart,
        detailCarts: payload.detailCarts,
      };
    default:
      throw new Error('case unknown');
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
