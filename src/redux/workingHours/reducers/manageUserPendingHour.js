import Immutable from 'immutable';

let initialState = {
  status_message: '',
  displayData: []

};

export function manageUserPendingHours (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_PENDING_HOURS') {
    return state.set('displayData', action.payload)

        .set('status_message', action.payload.message);
  } else if (action.type === 'ACTION_EMPTY_USER_PENDING_HOURS') {
    return state.set('displayData', action.payload)

        .set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_USER_PENDING_HOURS') {
    return state.set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_ADD_USER_PENDING_HOURS') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
