import {createAction} from 'redux-actions'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_LEAVES_SUMMARY = "ACTION_SUCCESS_LEAVES_SUMMARY"
export const ACTION_EMPTY_LEAVES_SUMMARY = "ACTION_EMPTY_LEAVES_SUMMARY"
export const ACTION_ERROR_LEAVES_SUMMARY = "ACTION_ERROR_LEAVES_SUMMARY"

export function success_leaves_summary(data, username) {
  return {type: ACTION_SUCCESS_LEAVES_SUMMARY, payload: data, username: username}
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

function async_get_users_list() {
  return fireAjax('POST', '', {'action': 'get_enable_user'})
}
export function select_month_leaves_summary(u, y, m) {
  return function(dispatch, getState) {
    dispatch(empty_leaves_summary({}))
    dispatch(get_users_leaves_summary(u, y, m));
  }
}
export function get_users_leaves_summary(u, year, month) {
  console.log(u, year, month, "///////");

  return function(dispatch, getState) {
    //i = start
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_get_users_leaves_summary(u, year, month).then((json) => {
        dispatch(hide_loading()) // hide loading icon
        if (json.error == 0) {
          //console.log(json.data);
          dispatch(success_leaves_summary(json.data))
        } else {
          dispatch(empty_leaves_summary({}))
        }

      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_leaves_summary({}))
      }) // show loading icon

    })

  }
}
