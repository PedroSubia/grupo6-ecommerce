import axios from 'axios';
import { BASE_URL_BACK } from '../config';

export const getProducts = async (keyword, pageNumber) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL_BACK}/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL_BACK}/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};


export const deleteProduct1 = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.delete(
      `${BASE_URL_BACK}/products/${id}`,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerProduct = async (body, token) => {
  try {
    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }
    const { data } = await axios.post(`${BASE_URL_BACK}/products`, body, config);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const guardarImagen = async (token, file) => {
  try {
    const imagen = new FormData();
    imagen.append('file', file);

    console.log('DATA IMAGEN ', imagen);
    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    }
    const { data } = await axios.post(`${BASE_URL_BACK}/uploads/aws`, imagen, config);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};