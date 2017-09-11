import Immutable from 'immutable';

let initialState = {
  'message':       '',
  'name':          '',
  'profileImage':  '',
  'userid':        '',
  'year':          '',
  'month':         '',
  'monthName':     '',
  'date':          '',
  'day':           '',
  'entry_time':    '',
  'exit_time':     '',
  'total_working': ''
};

export function empDaySummary (state = Immutable.fromJS(initialState), action) {
  // console.log(action, action.payload, 'fffffffffff');
  if (action.type === 'SUCCESS_UPDATE_EMP_DAY_SUMMARY') {
    return state.set('message', action.payload);
  } else if (action.type === 'ACTION_EMPTY_EMP_DAY_SUMMARY') {
    return state.set('message', '');
  } else if (action.type === 'ACTION_ERROR_EMP_DAY_SUMMARY') {
    return state.set('message', '');
  } else if (action.type === 'ACTION_EMPTY_UPDATE_EMP_DAY_SUMMARY') {
    return state.set('message', action.payload);
  } else if (action.type === 'ACTION_ERROR_UPDATE_EMP_DAY_SUMMARY') {
    return state.set('message', '');
  } else {
    return state.set('message', '');
  }
}
