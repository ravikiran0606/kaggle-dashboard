import { put, call, all, takeLatest } from 'redux-saga/effects';
import { getAllData, getStats } from './api';
import { actionTypes, getAllDataSuccess, getAllDataFail, getStatsSuccess, getStatsFail } from './actions';

function* fetchData(action) {
  try {
    const data = yield call(getAllData, action);
    yield put(getAllDataSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getAllDataFail(err));
  }
}

function* fetchStats(action) {
  try {
    const data = yield call(getStats);
    yield put(getStatsSuccess(data));
  } catch (err) {
    yield put(getStatsFail(err));
  }
}

function* dataSaga() {
  yield takeLatest(actionTypes.GET_ALL_DATA, fetchData);
  yield takeLatest(actionTypes.GET_STATS, fetchStats);
}

export default function* rootSaga() {
  yield all([
    dataSaga(),
  ]);
}
