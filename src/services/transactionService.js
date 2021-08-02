import { API, configJson } from '../config';

export const getTransactions = async () => {
  try {
    const response = await API.get('transactions', configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
