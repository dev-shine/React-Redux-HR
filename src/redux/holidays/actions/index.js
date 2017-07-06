import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';
// import {createAction} from 'redux-actions';
// import * as _ from 'lodash';
// import {CONFIG} from 'src/config/index';
// import * as constants from 'appRedux/constants';
// import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
//
// import {fireAjax} from 'src/services/index';
//
// export function success_holidaysList (data) {
//   return createAction(constants.ACTION_SUCCESS_HOLIDAYSLIST)(data);
// }
//
// export function empty_holidaysList (data) {
//   return createAction(constants.ACTION_EMPTY_HOLIDAYSLIST)(data);
// }
//
// export function error_holidaysList (data) {
//   return createAction(constants.ACTION_ERROR_HOLIDAYSLIST)(data);
// }
//
// function async_get_holidays_list () {
//   return fireAjax('POST', '', {
//     'action': 'get_holidays_list'
//   });
// }
//
// export function get_holidays_list () {
//   return function (dispatch, getState) {
//     return new Promise((resolve, reject) => {
//       dispatch(show_loading()); // show loading icon
//       async_get_holidays_list().then(
// 				(json) => {
//   dispatch(hide_loading()); // hide loading icon
//   if (json.error === 0) {
//     dispatch(success_holidaysList(json.data));
//   } else {
//     dispatch(empty_holidaysList([]));
//   }
// },
//         				(error) => {
//           dispatch(hide_loading()); // hide loading icon
//           dispatch(error_holidaysList([]));
//         }
// 			);
//     });
//   };
// }

export function* requestHolidayList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_holidays_list'
    });
    if (response.error === 0) {
      yield put(actions.successHolidayList(response.data));
    } else if (response.error === 1) {
      yield put(actions.failedHolidayList('API response error.'));
    }
  } catch (e) {
    yield put(actions.errorHolidayList('Error Occurs !!'));
    console.warn('Some error found in requestHolidayList action\n', e);
  }
}
