import { createAction } from 'redux-actions'
import { CONFIG } from 'src/config/index'
import * as _ from 'lodash'
import {fireAjax} from 'src/services/index'
import * as constants from 'src/actions/constants'

import * as jwt from 'jwt-simple'

import {show_loading, hide_loading} from 'src/actions/generic/frontend'

export function list_leaves_sucess (data) {
  return createAction(constants.ACTION_LIST_LEAVES_SUCCESS)(data)
}

export function list_leaves_empty (data) {
  return createAction(constants.ACTION_LIST_LEAVES_EMPTY)([])
}

export function list_leaves_error (err) {
  return createAction(constants.ACTION_LIST_LEAVES_ERROR)('Error Occurs !!')
}

function async_getAllLeaves (from_date, to_date, no_of_days, reason) {
  return fireAjax('POST', '', {
    'action': 'get_all_leaves'
  })
}

export function getAllLeaves (role) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_getAllLeaves().then(
				(json) => {
          dispatch(hide_loading()) // hide loading icon
          if (json.error == 0) {
            dispatch(list_leaves_sucess(json.data))
            resolve();
          } else {
            dispatch(list_leaves_error(json.data.message))
          }
        },
				(error) => {
          dispatch(hide_loading()) // hide loading icon
          dispatch(list_leaves_error(json.data.message))
        }
			)
    })
  }
}
