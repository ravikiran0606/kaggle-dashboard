import { actionTypes } from './actions';

const initialState = {
  data: [],
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DATA:
      return { ...initialState, loading: true };
    case actionTypes.GET_ALL_DATA_SUCCESS:
      return { ...state, data: [...action.data], loading: false };
    case actionTypes.GET_ALL_DATA_FAIL:
      return { ...state, error: {...action.error}, loading: false };
    default:
      return { ...state };
  }
};
