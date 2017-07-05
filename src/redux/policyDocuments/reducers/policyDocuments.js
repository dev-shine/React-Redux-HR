import Immutable from 'immutable';

let initialState = {
  'status_message':  '',
  'policyDocuments': []
};

export function policyDocuments (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_POLICY_DOCUMENT_SUCCESS') {
    return state.set('policyDocuments', action.payload);
  } else if (action.type === 'ACTION_POLICY_DOCUMENT_FAIL') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_LOGOUT') {
    return Immutable.fromJS(initialState);
  } else {
    return state.set('status_message', '');
  }
}
