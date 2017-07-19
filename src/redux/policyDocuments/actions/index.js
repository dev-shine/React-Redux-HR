import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import 'whatwg-fetch';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';
import * as actions from 'appRedux/actions';

// -----------isUserAcceptedDocumentPolicy-----------
export function successFetchPolicyDocuments (data) {
  return createAction(constants.POLICY_DOCUMENT_SUCCESS)(data);
}
export function errorFetchPolicyDocuments (data) {
  return createAction(constants.ACTION_POLICY_DOCUMENT_FAIL)(data);
}

// -------------get policy documents for admin section-------------
function asyncFetchPolicyDocument () {
  return fireAjax('POST', '', {
    action: 'get_policy_document'
  });
}

export function fetchPolicyDocument () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncFetchPolicyDocument().then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (!_.isUndefined(json.error) && json.error == 0) {
            let data = _.isNull(json.data) ? [] : json.data;
            dispatch(successFetchPolicyDocuments(data));
            resolve();
          } else {
            dispatch(errorFetchPolicyDocuments(json.data.message));
            reject(json.data.message);
          }
        }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        reject('error occurs');
      }
      );
    });
  };
}
// -----------get policy documents for user-----------------
function asyncFetchUserPolicyDocument () {
  return fireAjax('POST', '', {
    action: 'get_user_policy_document'
  });
}

export function fetchUserPolicyDocument () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncFetchUserPolicyDocument().then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (typeof json.error !== 'undefined' || json.error == 0) {
            dispatch(successFetchPolicyDocuments(json.data));
            resolve(json.data);
          } else {
            dispatch(errorFetchPolicyDocuments(json.data.message));
            reject(json.data.message);
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          // reject( 'error occurs' )
        }
      );
    });
  };
}

// -----------Submit policy document info-----------
function asyncSubmitDocs (docs) {
  return fireAjax('POST', '', {
    action: 'save_policy_document',
    type:   'policy_document',
    value:  JSON.stringify(docs)
  });
}

export function submitDocs (docs) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncSubmitDocs(docs).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (typeof json.error !== 'undefined' && json.error == 0) {
            dispatch(actions.requestFetchPolicyDocuments());
            resolve(json.data.message);
          } else {
            reject(json.data.message);
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          reject('error occurs');
        }
      );
    });
  };
}

// -----------update Read Status of policy document-----------

export function userDataUpdated (data) {
  return createAction(constants.ACTION_LOGIN_SUCCESS)(data);
}

function asyncUpdateReadStatus (updateDoc) {
  return fireAjax('POST', '', {
    action:          'update_user_policy_document',
    policy_document: JSON.stringify(updateDoc)
  });
}

export function updateReadStatus (updateDoc) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncUpdateReadStatus(updateDoc).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (typeof json.error !== 'undefined' && json.error == 0) {
            let token = json.data.new_token;
            localStorage.setItem('hr_logged_user', token);
            let tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
            dispatch(fetchUserPolicyDocument());
            dispatch(userDataUpdated(tokenData));
            resolve(json.data.message);
          } else {
            reject(json.data.message);
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          reject('error occurs');
        }
      );
    });
  };
}
