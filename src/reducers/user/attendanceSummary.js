import Immutable from 'immutable'

let initialState = {
  month: '',
  monthName: '',
  nextMonth: {},
  previousMonth: {},
  usersAttendance: []
}

export function attendanceSummary (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_ATTENDANCE_SUMMARY') {
    return state.set('month', action.payload.month)
        .set('monthName', action.payload.monthName)
        .set('nextMonth', action.payload.nextMonth)
        .set('previousMonth', action.payload.previousMonth)
        .set('usersAttendance', action.payload.usersAttendance)
  } else if (action.type === 'ACTION_EMPTY_ATTENDANCE_SUMMARY') {
    return state
  } else if (action.type === 'ACTION_ERROR_ATTENDANCE_SUMMARY') {
    return state
  } else {
    return state
  }
}
