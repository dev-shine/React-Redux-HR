import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import 'whatwg-fetch';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

// -------------get policy documents for admin section-------------
function asyncFetchPolicyDocument () {
  return fireAjax('POST', '', {
    action: 'get_policy_document'
  });
}

export function* fetchPolicyDocument () {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'get_policy_document'
    });
    if (typeof response.error !== 'undefined' || response.error === 0) {
      let data = _.isNull(response.data) ? [] : response.data;
      yield put(actions.successFetchPolicyDocuments(data));
    } else {
      yield put(actions.errorFetchPolicyDocuments(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorFetchPolicyDocuments('Error Occurs !!'));
    console.warn('Some error found in "get_policy_document" Request action\n', e);
  }
  // return function (dispatch, getState) {
  //   return new Promise((resolve, reject) => {
  //     asyncFetchPolicyDocument().then(
  //       (json) => {
  //         if (!_.isUndefined(json.error) && json.error === 0) {
  //           let data = _.isNull(json.data) ? [] : json.data;
  //           dispatch(actions.successFetchPolicyDocuments(data));
  //           resolve();
  //         } else {
  //           dispatch(actions.errorFetchPolicyDocuments(json.data.message));
  //           reject(json.data.message);
  //         }
  //       }, (error) => {
  //       reject('error occurs');
  //     }
  //     );
  //   });
  // };
}

// -----------get policy documents for user-----------------
// function asyncFetchUserPolicyDocument () {return fireAjax('POST', '', {action: 'get_user_policy_document'});}

export function* fetchUserPolicyDocument () {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'get_user_policy_document'
    });
    if (typeof response.error !== 'undefined' || response.error === 0) {
      yield put(actions.successFetchPolicyDocuments(response.data));
    } else {
      yield put(actions.errorFetchPolicyDocuments(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorFetchPolicyDocuments('Error Occurs !!'));
    console.warn('Some error found in "get_user_policy_document" Request action\n', e);
  }
}
// export function fetchUserPolicyDocument () {
  // return function (dispatch, getState) {
  //   return new Promise((resolve, reject) => {
  //     asyncFetchUserPolicyDocument().then(
  //       (json) => {
  //         if (typeof json.error !== 'undefined' || json.error == 0) {
  //           dispatch(actions.successFetchPolicyDocuments(json.data));
  //           resolve(json.data);
  //         } else {
  //           dispatch(actions.errorFetchPolicyDocuments(json.data.message));
  //           reject(json.data.message);
  //         }
  //       },
  //       (error) => {
  //         // reject( 'error occurs' )
  //       }
  //     );
  //   });
  // };
// }

// -----------Submit policy document info-----------
// function asyncSubmitDocs(docs){return fireAjax('POST','',{action:'save_policy_document',type:'policy_document',value:JSON.stringify(docs)});}

export function* submitDocs (docs) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'save_policy_document',
      type:   'policy_document',
      value:  JSON.stringify(docs)
    });
    if (typeof response.error !== 'undefined' && response.error === 0) {
      yield put(fetchPolicyDocument());
    } else {
      yield put(actions.errorSubmitDocs(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorSubmitDocs('Error Occurs !!'));
    console.warn('Some error found in "save_policy_document" Request action\n', e);
  }
  // return function (dispatch, getState) {
  //   return new Promise((resolve, reject) => {
  //     asyncSubmitDocs(docs).then(
  //       (json) => {
  //         if (typeof json.error !== 'undefined' && json.error == 0) {
  //           dispatch(fetchPolicyDocument());
  //           resolve(json.data.message);
  //         } else {
  //           reject(json.data.message);
  //         }
  //       },
  //       (error) => {
  //         reject('error occurs');
  //       }
  //     );
  //   });
  // };
}

// -----------update Read Status of policy document-----------
// function asyncUpdateReadStatus(updateDoc){return fireAjax('POST','',{action:'update_user_policy_document',policy_document:JSON.stringify(updateDoc)});}

export function* updateReadStatus (updateDoc) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action:          'update_user_policy_document',
      policy_document: JSON.stringify(updateDoc)
    });
    if (typeof response.error !== 'undefined' && response.error === 0) {
      let token = json.data.new_token;
      localStorage.setItem('hr_logged_user', token);
      let tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
      yield put(actions.requestfetchUserPolicyDocument());
      yield put(actions.successUpdateReadStatus(tokenData));
    } else {
      yield put(actions.errorUpdateReadStatus(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorUpdateReadStatus('Error Occurs !!'));
    console.warn('Some error found in "update_user_policy_document" Request action\n', e);
  }
  // return function (dispatch, getState) {
  //   return new Promise((resolve, reject) => {
  //     asyncUpdateReadStatus(updateDoc).then(
  //       (json) => {
  //         if (typeof json.error !== 'undefined' && json.error == 0) {
  //           dispatch(actions.fetchUserPolicyDocument());
  //           dispatch(actions.userDataUpdated(tokenData));
  //           resolve(json.data.message);
  //         } else {
  //           reject(json.data.message);
  //         }
  //       },
  //       (error) => {
  //         reject('error occurs');
  //       }
  //     );
  //   });
  // };
}
