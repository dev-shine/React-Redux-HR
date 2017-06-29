import {createAction} from 'redux-actions';
import * as constants from './constants';

export const userLoginRequest = createAction(constants.USER_LOGIN_REQUEST);
export const userLoginSuccess = createAction(constants.ACTION_LOGIN_SUCCESS);
export const userLoginFail = createAction(constants.ACTION_LOGIN_FAIL);
export const userLoginError = createAction(constants.ACTION_LOGIN_ERROR);
