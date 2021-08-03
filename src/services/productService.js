import { API, configFormData } from '../config';

export const addProduct = async ({ payload }) => {
  try {
    const response = await API.post(`product`, payload, configFormData);
    console.log(response);
    if (response.status !== 200) {
      throw response.data.message;
    }

    return response.data.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
