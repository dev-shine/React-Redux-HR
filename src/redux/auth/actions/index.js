import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* loginRequest (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':   'login',
      'username': action.payload.username,
      'password': action.payload.password
    });
    if (response.error === 0) {
      let token = response.data.token;
      localStorage.setItem('hr_logged_user', token);
      localStorage.setItem('userid', response.data.userid);
      let tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
      yield put(actions.userLoginSuccess(tokenData));
    } else if (response.error === 1) {
      yield put(actions.userLoginFail('Invalid Login'));
    }
  } catch (e) {
    yield put(actions.userLoginError('Error Occurs !!'));
    console.warn('Some error found in logingRequest action\n', e);
  }
}

export function* isAlreadyLoggedIn (action) {
  let token = localStorage.getItem('hr_logged_user');
  if (typeof token !== 'undefined' && token !== null && token !== '') {
    let tokenData = jwt.decode(token, 'HR_APP');
    localStorage.setItem('userid', tokenData.id);
    yield put(actions.userLoginSuccess(tokenData));
  } else {
    yield put(actions.requestLogout());
  }
}

export function* forgotPassword (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':   'forgot_password',
      'username': action.payload.username
    });
    yield put(actions.forgotPasswordSuccess(response.data.message));
  } catch (e) {
    yield put(actions.forgotPasswordSuccess('Error Occurs !!'));
    console.warn('Some error found in forgotPassword action\n', e);
  }
}

export function* logout (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'logout'
    });
    localStorage.clear();
    yield put(actions.logoutSuccess());
  } catch (e) {
    console.warn('Some error found in logout action\n', e);
  }
}
// ------------====================
export function login_sucess (data) {
  return createAction(constants.USER_LOGIN_SUCCESS)(data);
}

export function login_fail (data) {
  return createAction(constants.USER_LOGIN_FAIL)('Invalid Login');
}

export function login_error (err) {
  return createAction(constants.USER_LOGIN_ERROR)('Error Occurs !!');
}

export function doLogin (d) {
  return function (dispatch, getState) {
    dispatch(login_sucess(d));
  };
}

export function isAlreadyLogin () {
  return function (dispatch, getState) {
    let token = localStorage.getItem('hr_logged_user');
    if (typeof token !== 'undefined' && token != null && token !== '') {
      let tokenData = jwt.decode(token, 'HR_APP');
      localStorage.setItem('userid', tokenData.id);
      dispatch(login_sucess(tokenData));
			// return token
    } else {
			// dispatch( login_fail( {} ) )
			// return false
    }
  };
}

// logout
//
// export function logout_sucess () {
//   return createAction(constants.ACTION_LOGOUT)();
// }
//
// function asyncLogout () {
//   return fireAjax('POST', '', {
//     'action': 'logout'
//   });
// }
//
// export function logout () {
//   return function (dispatch, getState) {
//     return new Promise((resolve, conflict) => {
//       asyncLogout().then(
//         (json) => {
//           // localStorage.setItem('hr_logged_user', '')
//           // localStorage.setItem('userid', '')
//           localStorage.clear();
//           dispatch(logout_sucess());
//         },
//         (error) => {
//           // localStorage.setItem('hr_logged_user', '')
//           // localStorage.setItem('userid', '')
//           localStorage.clear();
//           dispatch(logout_sucess());
//         }
//       );
//     });
//   };
// }
