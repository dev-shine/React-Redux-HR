import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

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
