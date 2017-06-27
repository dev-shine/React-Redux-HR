import {createAction} from 'redux-actions';
import _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function pendingLeaveSucess (data) {
  return createAction(constants.ACTION_PENDING_LEAVE_SUCCESS)(data);
}

export function pendingLeaveFail (data) {
  return createAction(constants.ACTION_PENDING_LEAVE_FAIL)('Leave Apply Fail');
}

export function pendingLeaveError (err) {
  return createAction(constants.ACTION_PENDING_LEAVE_ERROR)('Error Occurs !!');
}

function asyncApplyEmployeLeave (from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason) {
  return fireAjax('POST', '', {
    'action': 'admin_user_apply_leave',
    'from_date': from_date,
    'to_date': to_date,
    'no_of_days': no_of_days,
    'reason': reason,
    'user_id': userId,
    'day_status': day_status,
    'leave_type': leaveType,
    'late_reason': late_reason
  });
}

export function applyPendingLeave (from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason) {
  return function (dispatch, getState) {
    if (_.isEmpty(from_date)) {
      return Promise.reject('From date is empty');
    }
    if (_.isEmpty(to_date)) {
      return Promise.reject('To date is empty');
    }
    if (no_of_days == '') {
      return Promise.reject('No of days is empty');
    }
    if (_.isEmpty(reason)) {
      return Promise.reject('Reason is empty');
    }

    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncApplyEmployeLeave(
        from_date,
        to_date,
        no_of_days,
        reason,
        userId,
        day_status,
        leaveType,
        late_reason).then((json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(pendingLeaveSucess(json.data.message));
            reslove(json.data.message);
          } else {
            dispatch(pendingLeaveFail(json.data.message));
            reject(json.data.message);
          }
        }, (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(pendingLeaveError('error occurs'));
          reject('error occurs');
        }
      );
    });
  };
}

// ------get days between leaves

export function days_between_leaves_sucess (data) {
  return createAction(constants.ACTION_DAYS_BETWEEN_PENDING_LEAVES_SUCCESS)(data);
}

export function days_between_leaves_fail (data) {
  return createAction(constants.ACTION_DAYS_BETWEEN_PENDING_LEAVES_FAIL)(data);
}

export function days_between_leaves_error (data) {
  return createAction(constants.ACTION_DAYS_BETWEEN_PENDING_LEAVES_ERROR)(data);
}

function async_getDaysBetweenLeaves (startDate, endDate) {
  return fireAjax('POST', '', {
    'action': 'get_days_between_leaves',
    'start_date': startDate,
    'end_date': endDate
  });
}

export function getDaysBetweenLeaves (startDate, endDate) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getDaysBetweenLeaves(startDate, endDate).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(days_between_leaves_sucess(json.data));
  } else {
    dispatch(days_between_leaves_fail(json.data));
  }
},
				(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(days_between_leaves_error('error occurs'));
}
			);
    });
  };
}
