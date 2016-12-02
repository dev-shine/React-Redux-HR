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

      var i = 0,
        len,
        userlist,
        m,
        y;

      function userMap(u, year, month, dispatch) {
        if (i < len) {
          async_get_users_leaves_summary(u.user_Id, year, month).then((json) => {
            dispatch(hide_loading()) // hide loading icon
            if (json.error == 0) {
              //console.log(m, y);
              //console.log(month, year);
              if (json.data.leavesSummary.attendance != null && json.data.month == m && json.data.year == y) {
                //  console.log(json.data);

                dispatch(success_leaves_summary(json.data))
                if (i != len) {
                  userMap(userlist[++i], y, m, dispatch);
                }
              } else {
                i = 0;
                userMap(userlist[i], y, m, dispatch);
              }
              //console.log(i, "----");

            } else {
              dispatch(empty_leaves_summary({}))
            }

          }, (error) => {
            dispatch(hide_loading()) // hide loading icon
            dispatch(error_leaves_summary({}))
          })

        }
      }
      function async_get_users_list() {
        return fireAjax('POST', '', {'action': 'get_enable_user'})
      }
      export function get_users_leaves_summary(year, month) {

        return function(dispatch, getState) {
          dispatch(empty_leaves_summary({}))
          return new Promise((resolve, reject) => {
            dispatch(show_loading()); // show loading icon
            async_get_users_list().then((val) => {
              userlist = val.data;
              //console.log(userlist);
              len = userlist.length;
              m = month;
              y = year;
              //console.log(m, y);
              dispatch(empty_leaves_summary({}))
              //  i = 0
              userMap(userlist[i], year, month, dispatch)
            })
          })
        }
      }
