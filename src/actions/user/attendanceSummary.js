import { createAction } from 'redux-actions';
import * as _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';

import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_attendance_summary (data) {
  return createAction(constants.ACTION_SUCCESS_ATTENDANCE_SUMMARY)(data);
}

export function empty_attendance_summary (data) {
  return createAction(constants.ACTION_EMPTY_ATTENDANCE_SUMMARY)(data);
}

export function error_attendance_summary (data) {
  return createAction(constants.ACTION_ERROR_ATTENDANCE_SUMMARY)(data);
}

function async_get_attendance_summary (year, month) {
  return fireAjax('POST', '', {
    'action': 'attendance_summary',
    'year': year,
    'month': month
  });
}

export function get_attendance_summary (year, month) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_attendance_summary(year, month).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error === 0) {
    dispatch(success_attendance_summary(json.data));
  } else {
    dispatch(empty_attendance_summary({}));
  }
},
				(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(error_attendance_summary({}));
}
			);
    });
  };
}
