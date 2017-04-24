import Immutable from 'immutable'

let initialState = {
  'status_message': '',
  'user_profile_detail': {},
  'user_assign_machine': [],
  'user_bank_detail': {},
  'user_documents': [],
  'username': ''
}

export function manageUsers (state = Immutable.fromJS(initialState), action) {
  if (action.type == 'ACTION_SUCCESS_USER_PROFILE') {
    return state
    .set('user_profile_detail', action.payload.user_profile_detail)
    .set('user_bank_detail', action.payload.user_bank_detail)
    .set('username', action.username)
    .set('user_assign_machine', action.payload.user_assign_machine)
  } else if (action.type == 'empty_user_profile') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'error_user_profile') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS') {
    return state.set('status_message', action.payload)
  } else if (action.type == 'ACTION_SUCCESS_USER_DOCUMENT') {
    return state.set('user_documents', action.payload.user_document_info)
  } else if (action.type == 'ACTION_ERROR_USER_DOCUMENT') {
    return state.set('status_message', action.payload).set('user_documents', [])
  } else {
    return state.set('status_message', '')
  }
}
