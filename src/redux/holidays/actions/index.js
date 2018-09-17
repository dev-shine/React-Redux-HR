import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';
import * as constants from 'appRedux/constants';

export function* holidayList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_holidays_list'
    });
    if (response.error === 0) {
      yield put(actions.successHolidayList(response.data));
    } else if (response.error === 1) {
      yield put(actions.errorHolidayList('API response error.'));
    }
  } catch (e) {
    yield put(actions.errorHolidayList('Error Occurs !!'));
    console.warn('Some error found in requestHolidayList action\n', e);
  }
}

export function* addHoliday (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'add_holiday',
       "holiday_date" : action.payload.data.date,
       "token":action.payload.token,
       "holiday_name":action.payload.data.holidayName,
       "holiday_type":action.payload.data.type
    });
    if (response.error === 0) {
      yield put(actions.successAddHoliday(response.data));
      holidayList();
    } else if (response.error === 1) {
      yield put(actions.errorAddHoliday('API response error.'));
    }
  } catch (e) {
    yield put(actions.errorAddHoliday('Error Occurs !!'));
    console.warn('Some error found in addHolidayList action\n', e);
  }
}