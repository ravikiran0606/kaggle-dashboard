import { actionTypes } from './actions';

const initialState = {
  data: [],
  loading: false,
  error: null,
  stats: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DATA:
      return { ...state, loading: true, data: [], error: null };
    case actionTypes.GET_ALL_DATA_SUCCESS:
      return { ...state, data: [...action.data], loading: false };
    case actionTypes.GET_ALL_DATA_FAIL:
      return { ...state, error: {...action.error}, loading: false };
    case actionTypes.GET_STATS:
      return { ...state, stats: null };
    case actionTypes.GET_STATS_SUCCESS:
      return { ...state, stats: {...action.stats} };
    default:
      return { ...state };
  }
};
