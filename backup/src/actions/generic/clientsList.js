import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_CLIENTS_LIST = "ACTION_SUCCESS_CLIENTS_LIST"
export const ACTION_EMPTY_CLIENTS_LIST = "ACTION_EMPTY_CLIENTS_LIST"
export const ACTION_ERROR_CLIENTS_LIST = "ACTION_ERROR_CLIENTS_LIST"


export function success_clients_list( data ){
	return createAction( ACTION_SUCCESS_CLIENTS_LIST )( data )
}

export function empty_clients_list( data ){
	return createAction( ACTION_EMPTY_CLIENTS_LIST )( data )
}

export function error_clients_list( data ){
	return createAction( ACTION_ERROR_CLIENTS_LIST )( data )
}

function async_get_clients_list(  ){
	return fireAjax( 'POST', '', {
		'action' : 'get_all_clients',
	} )
}


export function get_clients_list( ){

	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_clients_list(  ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
          			if( json.error == 0 ){
            			dispatch( success_clients_list( json.data ) )
          			}else{
            			dispatch( empty_clients_list( [] ) )
          			}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_clients_list( []  ) )
				}
			)
		})
	}
}