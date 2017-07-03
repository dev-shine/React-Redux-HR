import Immutable from 'immutable';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';

let initialState = {
  userLogin: {
    data:       {},
    isLoggedIn: false,
    isLoading:  false,
    isError:    false,
    isSuccess:  false,
    message:    ''
  },
  forgotPassword: {
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const userLoginRequest = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const userLoginSuccess = (state, action) => update(state, {
  userLogin: {
    data:       {$set: action.payload},
    isLoggedIn: {$set: true},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const userLoginFail = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});
const userLoginError = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});
const userLogout = (state, action) => update(state, {
  userLogin: {$set: initialState}
});
const requestForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: true,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
});
const successForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: false,
    isError:   false,
    isSuccess: true,
    message:   {$set: action.payload}
  }
});
const errorForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: false,
    isError:   true,
    isSuccess: false,
    message:   {$set: action.payload}
  }
});
export default handleActions({
  [constants.USER_LOGIN_REQUEST]: userLoginRequest,
  [constants.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [constants.USER_LOGIN_FAIL]:    userLoginFail,
  [constants.USER_LOGIN_ERROR]:   userLoginError,
  [constants.LOGOUT_SUCCESS]:     userLogout,

  [constants.REQUEST_FORGOT_PASSWORD]: requestForgotPassword,
  [constants.SUCCESS_FORGOT_PASSWORD]: successForgotPassword,
  [constants.ERROR_FORGOT_PASSWORD]:   errorForgotPassword

}, initialState);

// let initialState1 = {
//   login_status_message: '',
//   logged_in:            0,
//   userid:               '-1',
//   username:             '-1',
//   role:                 '-1',
//   rolePages:            {},
//   name:                 '-1',
//   jobtitle:             '-1',
//   profileImage:         ''
// };
//
// export function logged_user (state = Immutable.Map(initialState1), action) {
//   let d = new Date();
//   let timestamp = d.getTime();
//   console.log('action.payload', action.payload);
//   if (action.type === 'ACTION_LOGIN_SUCCESS') {
//     return state.set('logged_in', 1)
//         .set('userid', action.payload.id)
//         .set('username', action.payload.username)
//         .set('role', action.payload.role)
//         .set('rolePages', action.payload.role_pages)
//         .set('name', action.payload.name)
//         .set('jobtitle', action.payload.jobtitle)
//         .set('profileImage', action.payload.profileImage)
//         .set('login_status_message', 'Success Login');
//   } else if (action.type === 'ACTION_LOGIN_FAIL') {
//     return state.set('logged_in', -1)
//         .set('login_status_message', action.payload);
//   } else if (action.type === 'ACTION_LOGIN_ERROR') {
//     return state.set('logged_in', -1)
//         .set('login_status_message', action.payload)
//         .set('stateTimestamp', timestamp);
//   } else if (action.type === 'LOGOUT_SUCCESS') {
//     return state.set('logged_in', 0)
//         .set('userid', '-1')
//         .set('username', '-1')
//         .set('role', '-1')
//         .set('rolePages', {})
//         .set('name', '-1')
//         .set('jobtitle', '-1')
//         .set('profileImage', '')
//         .set('login_status_message', '');
//   } else if (action.type === 'ACTION_SUCCESS_FORGOT_PASSWORD') {
//     return state.set('forgotPasswordMessage', action.payload);
//   } else {
//     return state.set('login_status_message', '')
//       .set('forgotPasswordMessage', '');
//   }
// }
