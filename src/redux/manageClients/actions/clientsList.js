import { createAction } from 'redux-actions';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_clients_list (data) {
  return createAction(constants.ACTION_SUCCESS_CLIENTS_LIST)(data);
}
export function empty_clients_list (data) {
  return createAction(constants.ACTION_EMPTY_CLIENTS_LIST)(data);
}
export function error_clients_list (data) {
  return createAction(constants.ACTION_ERROR_CLIENTS_LIST)(data);
}
function async_get_clients_list () {
  return fireAjax('POST', '', {'action': 'get_all_clients'});
}
export function get_clients_list () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_get_clients_list().then(
				(json) => {
  dispatch(hide_loading());
  if (json.error === 0) {
    dispatch(success_clients_list(json.data));
  } else {
    dispatch(empty_clients_list([]));
  }
}, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_clients_list([]));
      }
			);
    });
  };
}
