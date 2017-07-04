import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_user_attendance (data) {
  return createAction(constants.ACTION_SUCCESS_USER_ATTENDANCE)(data);
}

export function empty_user_attendance (data) {
  return createAction(constants.ACTION_EMPTY_USER_ATTENDANCE)(data);
}

export function error_user_attendance (data) {
  return createAction(constants.ACTION_ERROR_USER_ATTENDANCE)(data);
}

function async_get_monthly_attendance (userid, year, month) {
  return fireAjax('POST', '', {
    action: 'month_attendance',
    userid: userid,
    year:   year,
    month:  month
  });
}

export function get_monthly_attendance (userid, year, month) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_monthly_attendance(userid, year, month).then((json) => {
        resolve(json);
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_user_attendance(json.data));
          // dispatch(success_leaves_summary(json.data))
        } else {
          dispatch(error_user_attendance({}));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_attendance({}));
      });
    });
  };
}
