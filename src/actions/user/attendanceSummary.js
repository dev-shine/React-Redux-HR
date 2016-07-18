import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_ATTENDANCE_SUMMARY = "ACTION_SUCCESS_ATTENDANCE_SUMMARY"
export const ACTION_EMPTY_ATTENDANCE_SUMMARY = "ACTION_EMPTY_ATTENDANCE_SUMMARY"
export const ACTION_ERROR_ATTENDANCE_SUMMARY = "ACTION_ERROR_ATTENDANCE_SUMMARY"


export function success_attendance_summary( data ){
	return createAction( ACTION_SUCCESS_ATTENDANCE_SUMMARY )( data )
}

export function empty_attendance_summary( data ){
	return createAction( ACTION_EMPTY_ATTENDANCE_SUMMARY )( data )
}

export function error_attendance_summary( data ){
	return createAction( ACTION_ERROR_ATTENDANCE_SUMMARY )( data )
}

function async_get_attendance_summary( year, month ){
	return fireAjax( 'POST', '', {
		'action' : 'attendance_summary',
		'year' : year,
		'month' : month
	} )
}


export function get_attendance_summary( year, month ){

	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_attendance_summary( year, month ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
          			if( json.error == 0 ){
            			dispatch( success_attendance_summary( json.data ) )
          			}else{
            			dispatch( empty_attendance_summary( {} ) )
          			}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_attendance_summary( {}  ) )
				}
			)
		})
	}
}