import { createAction } from 'redux-actions';
import * as _ from 'lodash';
import { CONFIG } from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_holidaysList (data) {
  return createAction(constants.ACTION_SUCCESS_HOLIDAYSLIST)(data)
}

export function empty_holidaysList (data) {
  return createAction(constants.ACTION_EMPTY_HOLIDAYSLIST)(data)
}

export function error_holidaysList (data) {
  return createAction(constants.ACTION_ERROR_HOLIDAYSLIST)(data)
}

function async_get_holidays_list () {
  return fireAjax('POST', '', {
    'action': 'get_holidays_list'
  })
}

export function get_holidays_list () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_get_holidays_list().then(
				(json) => {
          dispatch(hide_loading()) // hide loading icon
          if (json.error === 0) {
            dispatch(success_holidaysList(json.data))
          } else {
            dispatch(empty_holidaysList([]))
          }
        },
        				(error) => {
          dispatch(hide_loading()) // hide loading icon
          dispatch(error_holidaysList([]))
        }
			)
    })
  }
}
