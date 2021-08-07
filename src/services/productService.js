import { API, configFormData, configJson } from '../config';

export const addProduct = async ({ payload }) => {
  try {
    const response = await API.post(`product`, payload, configFormData);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getMyProducts = async ({ page }) => {
  try {
    const response = await API.get(`products/admin?page=${page}`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getProduct = async ({ id }) => {
  try {
    const newid = parseInt(id);
    const response = await API.get(`product/${newid}`, configJson);
    console.log(response);
    if (response.status !== 200) {
      throw response.data.message;
    }
    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateProduct = async ({ payload, id }) => {
  try {
    const newid = parseInt(id);
    const response = await API.patch(
      `product/${newid}/update`,
      payload,
      configFormData,
    );

    if (response.status !== 200) {
      throw response.data.message;
    }
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteProduct = async ({ id }) => {
  try {
    const newid = parseInt(id);
    const response = await API.delete(`product/${newid}`, configJson);

    if (response.status !== 200) {
      throw response.data.message;
    }
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
