import {createAction} from 'redux-actions';
import * as constants from './constants';

export const userLoginRequest = createAction(constants.USER_LOGIN_REQUEST);
export const userLoginSuccess = createAction(constants.USER_LOGIN_SUCCESS);
export const userLoginFail = createAction(constants.USER_LOGIN_FAIL);
export const userLoginError = createAction(constants.USER_LOGIN_ERROR);
export const isAlreadyLogin = createAction(constants.IS_ALREADY_LOGGED_IN);

export const forgotPassword = createAction(constants.FORGOT_PASSWORD);
export const forgotPasswordSuccess = createAction(constants.ACTION_SUCCESS_FORGOT_PASSWORD);
export const requestLogout = createAction(constants.REQUEST_LOGOUT);
export const logoutSuccess = createAction(constants.LOGOUT_SUCCESS);
//
// export const isAlreadyLogin = createAction(constants.IS_ALREADY_LOGGED_IN);
// export const isAlreadyLogin = createAction(constants.IS_ALREADY_LOGGED_IN);
// export const isAlreadyLogin = createAction(constants.IS_ALREADY_LOGGED_IN);
// export const isAlreadyLogin = createAction(constants.IS_ALREADY_LOGGED_IN);
