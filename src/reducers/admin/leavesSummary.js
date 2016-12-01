import Immutable from 'immutable'

let initialState = {
  "year": "",
  "month": "",
  "monthName": "",
  "nextMonth": {},
  "previousMonth": {},
  "leavesSummary": [],
  "username": ''
}
const leaves = [];
export function leavesSummary(state = Immutable.fromJS(initialState), action) {

  if (action.type == 'ACTION_SUCCESS_LEAVES_SUMMARY') {
    leaves.push(action.payload.leavesSummary);
    return (state.set('leavesSummary', leaves).set('year', action.payload.year).set('month', action.payload.month).set('monthName', action.payload.monthName).set('username', action.username).set('nextMonth', action.payload.nextMonth).set('previousMonth', action.payload.previousMonth))

  } else if (action.type == 'ACTION_EMPTY_LEAVES_SUMMARY') {
    leaves.splice(0, leaves.length)
    return state.set('leavesSummary', leaves)

  } else if (action.type == 'ACTION_ERROR_LEAVES_SUMMARY') {

    return state.set('leavesSummary', action.payload)

  } else {
    return state
  }
}
