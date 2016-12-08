import {createAction} from 'redux-actions'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_USERSLIST = "ACTION_SUCCESS_USERSLIST"
export const ACTION_EMPTY_USERSLIST = "ACTION_EMPTY_USERSLIST"
export const ACTION_ERROR_USERSLIST = "ACTION_ERROR_USERSLIST" 

export function success_usersList(data) {
  return createAction(ACTION_SUCCESS_USERSLIST)(data)
}

export function empty_usersList(data) {
  return createAction(ACTION_EMPTY_USERSLIST)(data)
}

export function error_usersList(data) {
  return createAction(ACTION_ERROR_USERSLIST)(data)
}

function async_get_users_list() {
  return fireAjax('POST', '', {'action': 'get_enable_user'})
}

export function get_users_list() {

  return function(dispatch, getState) {

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_users_list().then((json) => {
        dispatch(hide_loading()) // hide loading icon
        if (json.error == 0) {
          dispatch(success_usersList(json.data))
          resolve(json.data)
        } else {
          dispatch(empty_usersList([]))
        }
      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_usersList([]))
      })
    })
  }
}

//------get disabled user list

export function success_disabled_user_list(data) {
  return createAction("ACTION_SUCCESS_DISABLED_USERSLIST")(data)
}

export function error_disabled_users_list(data) {
  return createAction("ACTION_ERROR_DISABLED_USERSLIST")(data)
}

function async_getDisabledUsersList() {
  return fireAjax('POST', '', {'action': 'show_disabled_users'})
}

export function getDisabledUsersList() {

  return function(dispatch, getState) {

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getDisabledUsersList().then((json) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(success_disabled_user_list(json))
      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_disabled_users_list([]))
      })
    })
  }
}
