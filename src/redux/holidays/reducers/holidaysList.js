import Immutable from 'immutable'

let initialState = {
  'holidays': []
}

export function holidaysList (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_HOLIDAYSLIST') {
    return state.set('holidays', action.payload.holidays)
  } else if (action.type === 'ACTION_EMPTY_HOLIDAYSLIST') {
    return state.set('holidays', action.payload)
  } else if (action.type === 'ACTION_ERROR_HOLIDAYSLIST') {
    return state.set('holidays', action.payload)
  } else {
    return state
  }
}
