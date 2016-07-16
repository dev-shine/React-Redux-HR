import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'


//get user day summary
export const ACTION_SUCCESS_USER_DAY_SUMMARY = "ACTION_SUCCESS_USER_DAY_SUMMARY"
export const ACTION_ERROR_USER_DAY_SUMMARY = "ACTION_ERROR_USER_DAY_SUMMARY"
export const ACTION_EMPTY_USER_DAY_SUMMARY = "ACTION_EMPTY_USER_DAY_SUMMARY"

export function success_user_day_summary( data ){
	return createAction( ACTION_SUCCESS_USER_DAY_SUMMARY )( data )
}

export function empty_user_day_summary( data ){
	return createAction( ACTION_EMPTY_USER_DAY_SUMMARY )( data )
}

export function error_user_day_summary( data ){
	return createAction( ACTION_ERROR_USER_DAY_SUMMARY )( data )
}

function async_getUserDaySummary( userid, date ){
	return fireAjax( 'POST', '', {
		'action' : 'user_day_summary',
		'userid' : userid,
		'date' : date
	})
}


export function getUserDaySummary( userid, date ){
	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			async_getUserDaySummary( userid, date ).then(
				( json ) => {
          			if( json.error == 0 ){
            			dispatch( success_user_day_summary( json.data ) )
          			}else{
            			dispatch( empty_user_day_summary( {} ) )
          			}
				},
				( error ) =>{
					dispatch( error_user_day_summary( {}  ) )
				}
			)
		})
	}
}

/////update user day summary
export const ACTION_SUCCESS_UPDATE_USER_DAY_SUMMARY = "ACTION_SUCCESS_UPDATE_USER_DAY_SUMMARY"
export const ACTION_ERROR_UPDATE_USER_DAY_SUMMARY = "ACTION_ERROR_UPDATE_USER_DAY_SUMMARY"
export const ACTION_EMPTY_UPDATE_USER_DAY_SUMMARY = "ACTION_EMPTY_UPDATE_USER_DAY_SUMMARY"

export function success_update_user_day_summary( data ){
	return createAction( ACTION_SUCCESS_UPDATE_USER_DAY_SUMMARY )( data )
}

export function empty_update_user_day_summary( data ){
	return createAction( ACTION_ERROR_UPDATE_USER_DAY_SUMMARY )( data )
}

export function error_update_user_day_summary( data ){
	return createAction( ACTION_EMPTY_UPDATE_USER_DAY_SUMMARY )( data )
}

function async_updateUserDaySummary(  userid, date, entry_time, exit_time ){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_day_summary',
		'userid' : userid,
		'date' : date,
		'entry_time' : entry_time,
		'exit_time' : exit_time
	} )
}


export function updateUserDaySummary( userid, date, entry_time, exit_time ){
	return function ( dispatch, getState ){
		if( _.isEmpty( userid ) ){
			return Promise.reject('User Id is empty')
		}
		if( _.isEmpty( date ) ){
			return Promise.reject('Date is empty')
		}
		if( _.isEmpty( entry_time ) ){
			return Promise.reject('Entry time is empty')
		}
		if( _.isEmpty( exit_time ) ){
			return Promise.reject('Exit time is empty')
		}


		return new Promise(( resolve, reject ) => {
			async_updateUserDaySummary( userid, date, entry_time, exit_time ).then(
				( json ) => {
          			if( json.error == 0 ){
            			dispatch( success_update_user_day_summary( json.data ) )
            			dispatch( getUserDaySummary( userid, date ) )
          			}else{
            			dispatch( empty_update_user_day_summary( {} ) )
          			}
				},
				( error ) =>{
					dispatch( error_update_user_day_summary( {}  ) )
				}
			)
		})
	}

}