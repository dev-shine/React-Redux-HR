import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import * as jwt from 'jwt-simple'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_LOGIN_SUCCESS = "ACTION_LOGIN_SUCCESS"
export const ACTION_LOGIN_FAIL = "ACTION_LOGIN_FAIL"
export const ACTION_LOGIN_ERROR = "ACTION_LOGIN_ERROR"

export function login_sucess( data ){
	return createAction( ACTION_LOGIN_SUCCESS )( data )
}

export function login_fail( data ){
	return createAction( ACTION_LOGIN_FAIL )( 'Invalid Login' )
}

export function login_error( err ){
	return createAction( ACTION_LOGIN_ERROR )( 'Error Occurs !!' )
}

function loginAsync( username, password ){
	return fireAjax( 'POST', '', {
		'action' : 'login',
		'username' : username,
		'password' : password
	})
}

export function doLogin( d ){
	return function (dispatch,getState){
		dispatch( login_sucess( d ) )
	}
}

export function isAlreadyLogin(){
	return function (dispatch,getState){
		let token = localStorage.getItem('hr_logged_user')
		if( typeof token != 'undefined' && token != null &&  token != '' ){
			let  tokenData = jwt.decode( token, 'HR_APP' );
			dispatch( login_sucess( tokenData ) )
			return token
		}else{
			return false
		}
	}
}

export function login( username, password ){

	
	return function (dispatch,getState){
		if(_.isEmpty(username)){
			return Promise.reject('Username is empty')
		}
		if( _.isEmpty( password) ){
			return Promise.reject('Password is empty')
		}

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			loginAsync( username, password ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						let token = json.data.token;
						localStorage.setItem( 'hr_logged_user', token );
						let  tokenData = jwt.decode( token, CONFIG.jwt_secret_key );
						dispatch( login_sucess( tokenData ) )
						
		 			}else{
		 				dispatch( login_fail( {} ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( login_error( error ) )
				}
			)
			
		})

	}
    
}

//logout
export const ACTION_LOGOUT = "ACTION_LOGOUT"

export function logout_sucess(  ){
	return createAction( ACTION_LOGOUT )(  )
}

function asyncLogout(){
	return fireAjax( 'POST', '', {
		'action' : 'logout'
	})
}


export function logout(){
	return function (dispatch,getState){
		
		return new Promise(( resolve, conflict ) => {
			asyncLogout().then(
				(json) => {
					localStorage.setItem( 'hr_logged_user', '' );
					dispatch( logout_sucess(  ) )
				},
				( error ) => {
					localStorage.setItem( 'hr_logged_user', '' );
					dispatch( logout_sucess(  ) )
				}
			)
		})
		
	}
}
