import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_MY_PROFILE = "ACTION_SUCCESS_MY_PROFILE"
export const ACTION_EMPTY_MY_PROFILE = "ACTION_EMPTY_MY_PROFILE"
export const ACTION_ERROR_MY_PROFILE = "ACTION_ERROR_MY_PROFILE"

export function success_my_profile( data ){
	return createAction( ACTION_SUCCESS_MY_PROFILE )( data )
}
export function empty_my_profile( data ){
	return createAction( ACTION_EMPTY_MY_PROFILE )( data )
}
export function error_my_profile( data ){
	return createAction( ACTION_ERROR_MY_PROFILE )( data )
}

function async_getMyProfileDetails( ){
	return fireAjax( 'POST', '', {
		'action' : 'get_user_profile_detail'
	})
}

export function getMyProfileDetails(  ){

	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_getMyProfileDetails( ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_my_profile( json.data ) )
		 			}else{
		 				dispatch( empty_my_profile( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_my_profile( "error occurs!!!" ) )
				}
			)
			
		})

	}
    
}