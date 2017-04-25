import Immutable from 'immutable'

let initialState = {
  'device': [],
  'status_message': '',
  'deviceList': []
}

export function manageDevice (state = Immutable.fromJS(initialState), action) {
  if (action.type == 'ACTION_SUCCESS_DEVICE_LIST') {
    return state.set('device', action.payload)
  } else if (action.type == 'ACTION_EMPTY_DEVICE_LIST') {
    return state.set('device', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_ADD_NEW_MACHINE') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_ERROR_ADD_NEW_MACHINE') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_UPDATE_DEVICELIST') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_DEVICE_TYPE') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_ASSIGN_DEVICE') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_ERRORR_ASSIGN_DEVICE') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_DELETE_DEVICELIST') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_GET_DEVICE_TYPE_LIST') {
    return state.set('deviceList', action.payload)
  } else {
    return state
  }
}
