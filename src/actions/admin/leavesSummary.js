import {createAction} from 'redux-actions'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_LEAVES_SUMMARY = "ACTION_SUCCESS_LEAVES_SUMMARY"
export const ACTION_EMPTY_LEAVES_SUMMARY = "ACTION_EMPTY_LEAVES_SUMMARY"
export const ACTION_ERROR_LEAVES_SUMMARY = "ACTION_ERROR_LEAVES_SUMMARY"

export function success_leaves_summary(data) {
  return createAction(ACTION_SUCCESS_LEAVES_SUMMARY)(data)
}

export function empty_leaves_summary(data) {
  return createAction(ACTION_EMPTY_LEAVES_SUMMARY)(data)
}

export function error_leaves_summary(data) {
  return createAction(ACTION_ERROR_LEAVES_SUMMARY)(data)
}

function async_get_users_leaves_summary(userid, year, month) {
  return fireAjax('POST', '', {
    action: 'get_users_leaves_summary',
    user_id: userid,
    year: year,
    month: month
  })
}

export function get_users_leaves_summary(userid, year, month) {
  console.log(userid, year, month);
  return function(dispatch, getState) {

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_users_leaves_summary(userid, year, month).then((json) => {
        resolve(json);
        //console.log(json);
        dispatch(hide_loading()) // hide loading icon
        if (json.error == 0) {
          dispatch(success_leaves_summary(json.data))
        } else {
          dispatch(empty_leaves_summary({}))
        }

      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_leaves_summary({}))
      })
    })
  }
}
