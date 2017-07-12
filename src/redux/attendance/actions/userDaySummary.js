import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import * as constants from 'appRedux/constants';

import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import {get_monthly_attendance} from './monthlyAttendance';

export function* getUserDaySummary (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'user_day_summary',
      'userid': action.payload.userid,
      'date':   action.payload.date
    });
    if (response.error === 0) {
      yield put(actions.successUserDaySummary(response.data));
    } else {
      yield put(actions.errorUserDaySummary(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserDaySummary('Error Occurs !!'));
    console.warn('Some error found in "user_day_summary" action\n', e);
  }
}

// export function success_user_day_summary (data) {
//   return createAction(constants.ACTION_SUCCESS_USER_DAY_SUMMARY)(data);
// }
//
// export function empty_user_day_summary (data) {
//   return createAction(constants.ACTION_EMPTY_USER_DAY_SUMMARY)(data);
// }
//
// export function error_user_day_summary (data) {
//   return createAction(constants.ACTION_ERROR_USER_DAY_SUMMARY)(data);
// }
//
// function async_getUserDaySummary (userid, date) {
//   return fireAjax('POST', '', {
//     'action': 'user_day_summary',
//     'userid': userid,
//     'date':   date
//   });
// }
//
// export function getUserDaySummary (userid, date) {
//   return function (dispatch, getState) {
//     return new Promise((resolve, reject) => {
//       dispatch(show_loading()); // show loading icon
//       async_getUserDaySummary(userid, date).then((json) => {
//         dispatch(hide_loading()); // hide loading icon
//         if (json.error == 0) {
//           dispatch(success_user_day_summary(json.data));
//         } else {
//           dispatch(empty_user_day_summary({}));
//         }
//       }, (error) => {
//         dispatch(hide_loading()); // hide loading icon
//         dispatch(error_user_day_summary({}));
//       });
//     });
//   };
// }

export function* updateUserDaySummary (action) {
  let {userid, date, entry_time, exit_time, reason, year, month} = action.payload;
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':     'update_user_day_summary',
      'userid':     userid,
      'date':       date,
      'entry_time': entry_time,
      'exit_time':  exit_time,
      'reason':     reason
    });
    if (response.error === 0) {
      yield put(actions.successUpdateUserDaySummary(response.data));
      yield put(actions.requestUserDaySummary({userid, date}));
      yield put(actions.requestUserAttendance({userid, year, month}));
    } else {
      yield put(actions.errorUpdateUserDaySummary(response.data.message));
      yield put(actions.requestUserDaySummary({userid, date}));
    }
  } catch (e) {
    yield put(actions.errorUpdateUserDaySummary('Error Occurs !!'));
    yield put(actions.requestUserDaySummary({userid, date}));
    console.warn('Some error found in "update_user_day_summary" action\n', e);
  }
}

// export function success_update_user_day_summary (data) {
//   return createAction(constants.ACTION_SUCCESS_UPDATE_USER_DAY_SUMMARY)(data);
// }
//
// export function empty_update_user_day_summary (data) {
//   return createAction(constants.ACTION_EMPTY_UPDATE_USER_DAY_SUMMARY)(data);
// }
//
// export function error_update_user_day_summary (data) {
//   return createAction(constants.ACTION_ERROR_UPDATE_USER_DAY_SUMMARY)(data);
// }
//
// function async_updateUserDaySummary (userid, date, entry_time, exit_time, reason) {
//   return fireAjax('POST', '', {
//     'action':     'update_user_day_summary',
//     'userid':     userid,
//     'date':       date,
//     'entry_time': entry_time,
//     'exit_time':  exit_time,
//     'reason':     reason
//   });
// }
//
// export function updateUserDaySummary (userid, date, entry_time, exit_time, reason, year, month) {
//   return function (dispatch, getState) {
//     if (_.isEmpty(userid)) {
//       return Promise.reject('User Id is empty');
//     }
//     if (_.isEmpty(date)) {
//       return Promise.reject('Date is empty');
//     }
//     if (_.isEmpty(entry_time)) {
//       return Promise.reject('Entry time is empty');
//     }
//     if (_.isEmpty(exit_time)) {
//       return Promise.reject('Exit time is empty');
//     }
//     if (_.isEmpty(reason)) {
//       return Promise.reject('Reason is empty');
//     }
//
//     return new Promise((resolve, reject) => {
//       dispatch(show_loading()); // show loading icon
//       async_updateUserDaySummary(userid, date, entry_time, exit_time, reason).then((json) => {
//         dispatch(hide_loading()); // hide loading icon
//         if (json.error == 0) {
//           dispatch(success_update_user_day_summary(json.data));
//           dispatch(getUserDaySummary(userid, date));
//           dispatch(get_monthly_attendance(userid, year, month));
//         } else {
//           dispatch(empty_update_user_day_summary(json.data.message));
//           dispatch(getUserDaySummary(userid, date));
//         }
//       }, (error) => {
//         dispatch(hide_loading()); // hide loading icon
//         dispatch(error_update_user_day_summary({}));
//         dispatch(getUserDaySummary(userid, date));
//       });
//     });
//   };
// }
