import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getTeamStats (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_team_stats'
    });
    if (response.error === 0) {
      yield put(actions.successTeamStats(response.data));
    } else {
      yield put(actions.errorTeamStats(response.message));
    }
  } catch (e) {
    yield put(actions.errorTeamStats('Error Occurs !!'));
    console.warn('Some error found in "get_team_stats" Request action\n', e);
  }
}

export function* getEmployeLifeCycle (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':    'get_termination_joining_stats',
      'startYear': action.payload.start_year,
      'endYear':   action.payload.end_year
    });
    if (response.error === 0) {
      yield put(actions.successEmployeLifeCycle(response.data));
    } else {
      yield put(actions.errorEmployeLifeCycle(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeLifeCycle('Error Occurs !!'));
    console.warn('Some error found in "get_termination_joining_stats" Request action\n', e);
  }
}

export function* getEmployeeHours (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':  'get_employee_hours',
      'user_id': action.payload.id,
      'month':   action.payload.month,
      'year':    action.payload.year
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeHours(response.data));
    } else {
      yield put(actions.errorEmployeeHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeeMonthlyHours (action) {
  console.log(action);
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':  'get_employee_monthly_hours',
      'user_id': action.payload.id,
      'month':   action.payload.month,
      'year':    action.payload.year
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeMonthlyHours(response.data));
    } else {
      yield put(actions.errorEmployeeMonthlyHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeePerformance (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':  'get_monthly_performance',
      'user_id': action.payload.id,
      'month':   action.payload.month,
      'year':    action.payload.year
    });
    if (response.error === 0) {
      yield put(actions.successEmployeePerformance(response.data));
    } else {
      yield put(actions.errorEmployeePerformance(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}
