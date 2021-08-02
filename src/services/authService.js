import { API, configJson } from '../config';

export const signIn = async ({ payload }) => {
  try {
    const response = await API.post('login', payload, configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const signUp = async ({ payload }) => {
  try {
    const response = await API.post('register', payload, configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getMe = async () => {
  try {
    const response = await API.get('user', configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
