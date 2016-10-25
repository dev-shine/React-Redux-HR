import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import * as jwt from 'jwt-simple'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_LIST_MY_LEAVES_SUCCESS = "ACTION_LIST_MY_LEAVES_SUCCESS"
export const ACTION_LIST_MY_LEAVES_EMPTY = "ACTION_LIST_MY_LEAVES_EMPTY"
export const ACTION_LIST_MY_LEAVES_ERROR = "ACTION_LIST_MY_LEAVES_ERROR"

export function list_my_leaves_sucess( data ){
	return createAction( ACTION_LIST_MY_LEAVES_SUCCESS )( data )
}

export function list_my_leaves_empty( data ){
	return createAction( ACTION_LIST_MY_LEAVES_EMPTY )( [] )
}

export function list_my_leaves_error( err ){
	return createAction( ACTION_LIST_MY_LEAVES_ERROR )( 'Error Occurs !!' )
}

function async_getMyLeaves(  ){
	return fireAjax( 'POST', '', {
		'action' : 'get_my_leaves'
	})
}

export function getMyLeaves(  ){

	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_getMyLeaves( ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( list_my_leaves_sucess( json.data ) )
		 			}else{
		 				dispatch( list_my_leaves_empty( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( list_my_leaves_error( json.data.message ) )
				}
			)

		})

	}

}

function async_cancelLeave(userId, from_date){
		return fireAjax( 'POST', '', {
		'action' : 'cancel_applied_leave',
		'user_id':userId,
 		'date':from_date,
	})
}

export function cancelLeave(userId, from_date){

	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_cancelLeave(userId, from_date).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getMyLeaves( ) )
		 			}else{
						reject(json.data.message)
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					reject(json.data.message)
				}
			)

		})

	}

}
