import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import * as jwt from 'jwt-simple'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_LEAVE_SUCCESS = "ACTION_LEAVE_SUCCESS"
export const ACTION_LEAVE_FAIL = "ACTION_LEAVE_FAIL"
export const ACTION_LEAVE_ERROR = "ACTION_LEAVE_ERROR"

export function leave_sucess( data ){
	return createAction( ACTION_LEAVE_SUCCESS )( data )
}

export function leave_fail( data ){
	return createAction( ACTION_LEAVE_FAIL )( 'Leave Apply Fail' )
}

export function leave_error( err ){
	return createAction( ACTION_LEAVE_ERROR )( 'Error Occurs !!' )
}

function async_apply_leave( from_date, to_date, no_of_days, reason ){
	return fireAjax( 'POST', '', {
		'action' : 'apply_leave',
		'from_date' : from_date,
		'to_date' : to_date,
		'no_of_days' : no_of_days,
		'reason' : reason
	})
}

export function apply_leave( from_date, to_date, no_of_days, reason ){

	
	return function (dispatch,getState){
		if(_.isEmpty(from_date)){
			return Promise.reject('From date is empty')
		}
		if(_.isEmpty(to_date)){
			return Promise.reject('To date is empty')
		}
		if(_.isEmpty(reason)){
			return Promise.reject('Reason is empty')
		}

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_apply_leave( from_date, to_date, no_of_days, reason ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( leave_sucess( json.data.message ) )
		 			}else{
		 				dispatch( leave_fail( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( leave_error( 'error occurs' ) )
				}
			)
			
		})

	}
    
}