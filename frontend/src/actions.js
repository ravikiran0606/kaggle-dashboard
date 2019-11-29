export const actionTypes = {
  GET_ALL_DATA: 'GET_ALL_DATA',
  GET_ALL_DATA_SUCCESS: 'GET_ALL_DATA_SUCCESS',
  GET_ALL_DATA_FAIL: 'GET_ALL_DATA_FAIL',
  GET_STATS: 'GET_STATS',
  GET_STATS_SUCCESS: 'GET_STATS_SUCCESS',
  GET_STATS_FAIL: 'GET_STATS_FAIL',
};

export const getAllData = options => ({
  type: actionTypes.GET_ALL_DATA,
  ...options,
});

export const getAllDataSuccess = data => ({
  type: actionTypes.GET_ALL_DATA_SUCCESS,
  data,
});

export const getAllDataFail = error => ({
  type: actionTypes.GET_ALL_DATA_FAIL,
  error,
});

export const getStats = () => ({
  type: actionTypes.GET_STATS,
});

export const getStatsSuccess = stats => ({
  type: actionTypes.GET_STATS_SUCCESS,
  stats,
});

export const getStatsFail = error => ({
  type: actionTypes.GET_STATS_FAIL,
  error,
});
