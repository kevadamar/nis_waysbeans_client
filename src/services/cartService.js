import { API, configFormData, configJson } from '../config';

export const checkoutProcess = async ({ payload }) => {
  try {
    const response = await API.post('checkout', payload, configFormData);

    if (response.status !== 200) {
      throw response.data.status;
    }
  } catch (error) {
    throw error.response.data.message;
  }
};

export const countCart = async () => {
  try {
    const response = await API.get('count-cart', configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addCart = async ({ product_id }) => {
  try {
    const response = await API.post(`add-cart/${product_id}`, configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const minCart = async ({ product_id }) => {
  try {
    const response = await API.post(`minus-cart/${product_id}`, configJson);

    if (response.status !== 200) {
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getDetailCart = async () => {
  try {
    const response = await API.get('detail-cart', configJson);

    if (response.status !== 200) {
      throw response.data.status;
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
      throw response.data.status;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
