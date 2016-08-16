import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_SALARY_DETAILS = "ACTION_SUCCESS_SALARY_DETAILS"
export const ACTION_EMPTY_SALARY_DETAILS = "ACTION_EMPTY_SALARY_DETAILS"

export function success_salary_details( data ){
	return createAction( ACTION_SUCCESS_SALARY_DETAILS )( data )
}

export function empty_salary_details( data ){
	return createAction( ACTION_EMPTY_SALARY_DETAILS )( data )
}


function async_get_salary_details(  ){
	return fireAjax( 'GET', '', {
		'action' : 'get_salary_details',
	} )
}


export function getSalaryDetails( ){

	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_salary_details(  ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( typeof json.data != 'undefined' && typeof json.data.salary_details != 'undefind' && json.data.salary_details.length > 0 ){
						let data = json.data.salary_details.reverse()
						dispatch( success_salary_details( data ) )
					}else{
						dispatch( success_salary_details( [] ) )
					}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( success_salary_details( [] ) )
				}
			)
		})
	}
}