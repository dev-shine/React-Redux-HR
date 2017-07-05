import {takeLatest} from 'redux-saga/effects';
import * as constants from 'appRedux/constants';
import {loginRequest, isAlreadyLoggedIn, forgotPassword, logout} from 'appRedux/auth/actions';
import {requestHolidayList} from 'appRedux/holidays/actions';

export function* watchCreateLesson () {
  yield takeLatest(constants.USER_LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.IS_ALREADY_LOGGED_IN, isAlreadyLoggedIn);
  yield takeLatest(constants.REQUEST_FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(constants.REQUEST_LOGOUT, logout);

  yield takeLatest(constants.REQUEST_HOLIDAYSLIST, requestHolidayList);
}

export default function* rootSaga () {
  yield [
    watchCreateLesson()
  ];
}
