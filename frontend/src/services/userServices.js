import axios from 'axios';
import { BASE_URL_BACK } from '../config';

export const loginServices = async ( dataLogin ) => {
    try {
        // const config = {
        //     headers: {'Content-Type': 'application/json'},            
        // }
        //console.log( dataLogin );
        //const { data } = await axios.post(`${ BASE_URL_BACK}/users/login`, config, { dataLogin });
        const { data } = await axios.post(`${ BASE_URL_BACK}/users/login`, dataLogin);
        //console.log('respuesta del axios en loginservices: ', data);
        return data;
    } catch (error) {
        throw error;
    }
};

export const postUser = async ( newUser ) => {
    try {
        const { data } = await axios.post(`${ BASE_URL_BACK}/users`, newUser);
        return data;
    } catch (error) {
        throw error;
    }
};