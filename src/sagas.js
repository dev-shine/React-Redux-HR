import {takeLatest} from 'redux-saga/effects';
import * as constants from 'appRedux/constants';
import {logingRequest} from 'appRedux/auth/actions';

export function* watchCreateLesson () {
  yield takeLatest(constants.USER_LOGIN_REQUEST, logingRequest);
}

export default function* rootSaga () {
  yield [
    watchCreateLesson()
  ];
}
