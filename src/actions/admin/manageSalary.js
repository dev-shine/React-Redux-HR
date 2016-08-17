import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_USER_SALARY_DETAILS = "ACTION_SUCCESS_USER_SALARY_DETAILS"
export const ACTION_EMPTY_USER_SALARY_DETAILS = "ACTION_EMPTY_USER_SALARY_DETAILS"


export function success_user_salary_details( data ){
	return createAction( ACTION_SUCCESS_USER_SALARY_DETAILS )( data )
}

export function empty_user_salary_details( data ){
	return createAction( ACTION_EMPTY_USER_SALARY_DETAILS )( data )
}

function async_get_user_salary_details( userid ){
	return fireAjax( 'GET', '', {
		action : 'get_user_salary_details',
		userid : userid
	})
}

export function get_user_salary_details( userid ){
	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_user_salary_details( userid ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( typeof json.data != 'undefined' && typeof json.data.salary_details != 'undefind' && json.data.salary_details.length > 0 ){
						let data = json.data.salary_details.reverse()
						dispatch( success_user_salary_details( data ) )
					}else{
						dispatch( success_user_salary_details( [] ) )
					}
					
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( success_user_salary_details( []  ) )
				}
			)
		})
	}
}

///-------------------


// export const ACTION_SUCCESS_ADD_USER_WORKING_HOURS = "ACTION_SUCCESS_ADD_USER_WORKING_HOURS"
// export const ACTION_ERROR_ADD_USER_WORKING_HOURS = "ACTION_ERROR_ADD_USER_WORKING_HOURS"

// export function success_add_user_working_hours( data ){
// 	return createAction( ACTION_SUCCESS_ADD_USER_WORKING_HOURS )( data )
// }
// export function error_add_user_working_hours( data ){
// 	return createAction( ACTION_ERROR_ADD_USER_WORKING_HOURS )( data )
// }


// function async_add_user_working_hours( userid, date, working_hours, reason ){
// 	return fireAjax( 'POST', '', {
// 		action : 'add_user_working_hours',
// 		userid : userid,
// 		date : date,
// 		working_hours : working_hours,
// 		reason : reason
// 	})
// }

// export function add_user_working_hours(  userid, date, working_hours, reason ){
// 	return function ( dispatch, getState ){

// 		if(_.isEmpty(date)){
// 			return Promise.reject('date is empty')
// 		}
// 		if( _.isEmpty( working_hours) ){
// 			return Promise.reject('Time is empty')
// 		}
// 		if( _.isEmpty( reason) ){
// 			return Promise.reject('Reason is empty')
// 		}

// 		return new Promise(( resolve, reject ) => {
// 			dispatch( show_loading() ); // show loading icon
// 			async_add_user_working_hours(  userid, date, working_hours, reason ).then(
// 				( json ) => {
// 					dispatch( hide_loading() ) // hide loading icon
// 			        if( json.error == 0 ){
// 			        	dispatch( success_add_user_working_hours( json.data.message ) )
// 			            dispatch( get_managed_user_working_hours( userid ) )
// 			          }else{
// 			            dispatch( error_add_user_working_hours( json.data.message ) )
// 			          }
					
// 				},
// 				( error ) =>{
// 					dispatch( hide_loading() ) // hide loading icon
// 					dispatch( error_add_user_working_hours( 'error occurs'  ) )
// 				}
// 			)
// 		})
// 	}
// }

