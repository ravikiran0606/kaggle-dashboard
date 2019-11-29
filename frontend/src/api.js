import axios from 'axios';
import config from './config';

export const getAllData = async (options = {}) => {
  if (options.sort) {
    const { key, order } = options;
    const { data } = await axios.get(`${config.API_HOST}/getDataSorted?col=${key}&order=${order}`);
    return data;
  }
  if (options.filter) {
    const { col, colType, start, end, value } = options;
    if (colType === 'number') {
      const { data } = await axios.get(`${config.API_HOST}/getDataFiltered?filterCol=${col}&type=${colType}&startVal=${start}&endVal=${end}`);
      return data;
    } else if (colType === 'string') {
      const { data } = await axios.get(`${config.API_HOST}/getDataFiltered?filterCol=${col}&type=${colType}&matchString=${value}`);
      return data;
    }
  }
  const { data } = await axios.get(`${config.API_HOST}/getData`);
  return data;
};

export const getStats = async () => {
  const { data } = await axios.get(`${config.API_HOST}/getDataStatistics`);
  return data;
}
