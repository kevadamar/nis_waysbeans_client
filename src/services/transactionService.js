import { API, configJson } from '../config';

export const getTransactions = async ({ page }) => {
  try {
    const response = await API.get(`transactions?page=${page}`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getDetailTransaction = async ({ order_id }) => {
  try {
    const response = await API.get(`transactions/${order_id}`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateStatusTransaction = async ({ order_id, payload }) => {
  try {
    const response = await API.patch(
      `transactions/${order_id}/update`,
      payload,
      configJson,
    );

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
