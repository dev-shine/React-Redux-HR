import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_HOLIDAYSLIST = "ACTION_SUCCESS_HOLIDAYSLIST"
export const ACTION_EMPTY_HOLIDAYSLIST = "ACTION_EMPTY_HOLIDAYSLIST"
export const ACTION_ERROR_HOLIDAYSLIST = "ACTION_ERROR_HOLIDAYSLIST"


export function success_holidaysList( data ){
	return createAction( ACTION_SUCCESS_HOLIDAYSLIST )( data )
}

export function empty_holidaysList( data ){
	return createAction( ACTION_EMPTY_HOLIDAYSLIST )( data )
}

export function error_holidaysList( data ){
	return createAction( ACTION_ERROR_HOLIDAYSLIST )( data )
}

function async_get_holidays_list(  ){
	return fireAjax( 'POST', '', {
		'action' : 'get_holidays_list',
	} )
}


export function get_holidays_list( ){

	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_holidays_list(  ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
          			if( json.error == 0 ){
            			dispatch( success_holidaysList( json.data ) )
          			}else{
            			dispatch( empty_holidaysList( [] ) )
          			}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_holidaysList( []  ) )
				}
			)
		})
	}
}