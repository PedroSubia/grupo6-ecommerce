import axios from 'axios';
import { BASE_URL_BACK } from '../config';

export const getMyCart = async ( tokenUser ) => {
    try {
        const config = {
            headers: {'Authorization': `Bearer ${tokenUser}`},            
        }
        const { data } = await axios.get(`${BASE_URL_BACK}/myorders`, config);
        return data;
    } catch (error) {
        throw error;
    }
};

//  await axios.post(`${BASE_URL_BACK}/myorders`,{}, config);