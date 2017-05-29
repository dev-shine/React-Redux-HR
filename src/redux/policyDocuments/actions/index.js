import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import 'whatwg-fetch';
import {show_loading, hide_loading} from 'src/actions/generic/frontend';
import * as constants from 'src/actions/constants';

// -----------isUserAcceptedDocumentPolicy-----------
export function success_fetch_policy_documents (data) {
  return createAction(constants.ACTION_POLICY_DOCUMENT_SUCCESS)(data)
}
export function error_fetch_policy_documents (data) {
  return createAction(constants.ACTION_POLICY_DOCUMENT_FAIL)(data)
}

// -------------get policy documents for admin section-------------
function async_fetchPolicyDocument () {
  return fireAjax('POST', '', {
    action: 'get_policy_document'
  })
}

export function fetchPolicyDocument () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_fetchPolicyDocument().then(
        (json) => {
          dispatch(hide_loading()) // hide loading icon
          if (!_.isUndefined(json.error) && json.error == 0) {
            let data = _.isNull(json.data) ? [] : json.data;
            dispatch(success_fetch_policy_documents(data))
            resolve()
          } else {
            dispatch(error_fetch_policy_documents(json.data.message))
            reject(json.data.message)
          }
        },
        (error) => {
          dispatch(hide_loading()) // hide loading icon
          reject('error occurs')
        }
      )
    })
  }
}
// -----------get policy documents for user-----------------
function async_fetchUserPolicyDocument () {
  return fireAjax('POST', '', {
    action: 'get_user_policy_document'
  })
}

export function fetchUserPolicyDocument () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_fetchUserPolicyDocument().then(
        (json) => {
          dispatch(hide_loading()) // hide loading icon
          if (typeof json.error !== 'undefined' || json.error == 0) {
            dispatch(success_fetch_policy_documents(json.data))
            resolve()
          } else {
            dispatch(error_fetch_policy_documents(json.data.message))
            reject(json.data.message)
          }
        },
        (error) => {
          dispatch(hide_loading()) // hide loading icon
          // reject( 'error occurs' )
        }
      )
    })
  }
}

// -----------Submit policy document info-----------

function async_submitDocs (docs) {
  return fireAjax('POST', '', {
    action: 'save_policy_document',
    type: 'policy_document',
    value: JSON.stringify(docs)
  })
}

export function submitDocs (docs) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_submitDocs(docs).then(
        (json) => {
          dispatch(hide_loading()) // hide loading icon
          if (typeof json.error !== 'undefined' && json.error == 0) {
            dispatch(fetchPolicyDocument())
            resolve(json.data.message)
          } else {
            reject(json.data.message)
          }
        },
        (error) => {
          dispatch(hide_loading()) // hide loading icon
          reject('error occurs')
        }
      )
    })
  }
}

// -----------update Read Status of policy document-----------

function async_updateReadStatus (updateDoc) {
  return fireAjax('POST', '', {
    action: 'update_user_policy_document',
    policy_document: JSON.stringify(updateDoc)
  })
}

export function updateReadStatus (updateDoc) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_updateReadStatus(updateDoc).then(
        (json) => {
          dispatch(hide_loading()) // hide loading icon
          if (typeof json.error !== 'undefined' && json.error == 0) {
            dispatch(fetchUserPolicyDocument())
            resolve(json.data.message)
          } else {
            reject(json.data.message)
          }
        },
        (error) => {
          dispatch(hide_loading()) // hide loading icon
          reject('error occurs')
        }
      )
    })
  }
}
