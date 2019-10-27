import axios from 'axios';
import config from './config';

export const getAllData = async () => {
  const { data } = await axios.get(`${config.API_HOST}/data`);
  return data;
};
