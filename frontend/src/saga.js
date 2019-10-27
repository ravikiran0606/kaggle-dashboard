import { put, call, all, takeLatest } from 'redux-saga/effects';
import { getAllData } from './api';
import { actionTypes, getAllDataSuccess, getAllDataFail } from './actions';

function* fetchData() {
  try {
    const data = yield call(getAllData);
    yield put(getAllDataSuccess(data));
  } catch (err) {
    yield put(getAllDataFail(err));
  }
}

function* dataSaga() {
  yield takeLatest(actionTypes.GET_ALL_DATA, fetchData);
}

export default function* rootSaga() {
  yield all([
    dataSaga(),
  ]);
}
