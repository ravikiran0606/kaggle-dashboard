export const actionTypes = {
  GET_ALL_DATA: 'GET_ALL_DATA',
  GET_ALL_DATA_SUCCESS: 'GET_ALL_DATA_SUCCESS',
  GET_ALL_DATA_FAIL: 'GET_ALL_DATA_FAIL',
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
