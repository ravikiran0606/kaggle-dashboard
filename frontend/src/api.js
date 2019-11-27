import axios from 'axios';
import config from './config';

export const getAllData = async (options = '') => {
  const { data } = await axios.get(`${config.API_HOST}/data${options}`);
  return data;
};
