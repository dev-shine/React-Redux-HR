import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import 'whatwg-fetch';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* fetchPolicyDocument (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'get_policy_document'
    });
    if (response.error === 0) {
      let data = _.isNull(response.data) ? [] : response.data;
      yield put(actions.successFetchPolicyDocuments(data));
    } else {
      yield put(actions.errorFetchPolicyDocuments(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorFetchPolicyDocuments('Error Occurs !!'));
    console.warn('Some error found in "get_policy_document" Request action\n', e);
  }
}

export function* fetchUserPolicyDocument (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'get_user_policy_document'
    });
    if (response.error === 0) {
      yield put(actions.successFetchPolicyDocuments(response.data));
    } else {
      yield put(actions.errorFetchPolicyDocuments(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorFetchPolicyDocuments('Error Occurs !!'));
    console.warn('Some error found in "get_user_policy_document" Request action\n', e);
  }
}

export function* submitDocs (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'save_policy_document',
      type:   'policy_document',
      value:  JSON.stringify(action.payload)
    });
    if (response.error === 0) {
      yield put(actions.successSubmitDocs(response.data.message));
      yield put(actions.requestfetchPolicyDocument());
    } else {
      yield put(actions.errorSubmitDocs(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorSubmitDocs('Error Occurs !!'));
    console.warn('Some error found in "save_policy_document" Request action\n', e);
  }
}

export function* updateReadStatus (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action:          'update_user_policy_document',
      policy_document: JSON.stringify(action.payload)
    });
    if (response.error === 0) {
      let token = response.data.new_token;
      localStorage.setItem('hr_logged_user', token);
      let tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
      yield put(actions.requestfetchUserPolicyDocument());
      yield put(actions.successUpdateReadStatus(response.data.message));
      yield put(actions.userDataUpdated(tokenData));
    } else {
      yield put(actions.errorUpdateReadStatus(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorUpdateReadStatus('Error Occurs !!'));
    console.warn('Some error found in "update_user_policy_document" Request action\n', e);
  }
}
