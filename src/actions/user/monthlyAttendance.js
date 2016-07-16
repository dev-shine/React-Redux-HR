import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

export const ACTION_SUCCESS_USER_ATTENDANCE = "ACTION_SUCCESS_USER_ATTENDANCE"
export const ACTION_EMPTY_USER_ATTENDANCE = "ACTION_EMPTY_USER_ATTENDANCE"
export const ACTION_ERROR_USER_ATTENDANCE = "ACTION_ERROR_USER_ATTENDANCE"


export function success_user_attendance( data ){
	return createAction( ACTION_SUCCESS_USER_ATTENDANCE )( data )
}

export function empty_user_attendance( data ){
	return createAction( ACTION_EMPTY_USER_ATTENDANCE )( data )
}

export function error_user_attendance( data ){
	return createAction( ACTION_ERROR_USER_ATTENDANCE )( data )
}

function async_get_monthly_attendance( userid, year, month ){
	return fireAjax( 'POST', '', {
		action : 'month_attendance',
		userid : userid,
		year : year,
		month : month
	})
}


export function get_monthly_attendance( userid, year, month ){



	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			async_get_monthly_attendance( userid, year, month ).then(
				( json ) => {
          if( json.error == 0 ){
            dispatch( success_user_attendance( json.data ) )
          }else{
            dispatch( error_user_attendance( {} ) )
          }
					
				},
				( error ) =>{
					dispatch( error_user_attendance( {}  ) )
				}
			)
		})
	}
}