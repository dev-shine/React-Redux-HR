import Immutable from 'immutable';

let initialState = {
  'status_message': '',
  'client_info': {},
  'client_invoices': []
};

export function manageClients (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_CLIENT_DETAILS') {
    return state.set('client_info', action.payload.client_info).set('client_invoices', action.payload.invoices);
  } else if (action.type === 'ACTION_EMPTY_CLIENT_DETAILS') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_CLIENT_DETAILS') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_ADD_NEW_CLIENT') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_ADD_NEW_CLIENT') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_INVOICE_DELETE') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_INVOICE_DELETE') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
