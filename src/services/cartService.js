import { API, configFormData, configJson } from '../config';

export const checkoutProcess = async ({ payload }) => {
  try {
    const response = await API.post('checkout', payload, configFormData);

    if (response.status !== 200) {
      throw response.data.message;
    }
    return response.data.message;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const countCart = async () => {
  try {
    const response = await API.get('cart/count', configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addCart = async ({ product_id }) => {
  try {
    const response = await API.post(`cart/${product_id}/add`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const minCart = async ({ product_id }) => {
  try {
    const response = await API.post(`cart/${product_id}/min`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getDetailCart = async () => {
  try {
    const response = await API.get('cart/detail', configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteCart = async ({ cart_id }) => {
  try {
    const response = await API.delete(`cart/${cart_id}/delete`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.message;
  } catch (error) {
    throw error.response.data.message;
  }
};
