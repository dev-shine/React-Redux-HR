import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_CLIENT_DETAILS = "ACTION_SUCCESS_CLIENT_DETAILS"
export const ACTION_EMPTY_CLIENT_DETAILS = "ACTION_EMPTY_CLIENT_DETAILS"
export const ACTION_ERROR_CLIENT_DETAILS = "ACTION_ERROR_CLIENT_DETAILS"

export function success_client_details( data ){
	return createAction( ACTION_SUCCESS_CLIENT_DETAILS )( data )
}
export function empty_client_details( data ){
	return createAction( ACTION_EMPTY_CLIENT_DETAILS )( data )
}
export function error_client_details( date ){
	return createAction( ACTION_ERROR_CLIENT_DETAILS )( data )
}

function async_get_client_details( clientid ){
	return fireAjax( 'POST', '', {
		'action' : 'get_client_detail',
		'client_id' : clientid
	})
}

export function get_client_details( clientid  ){
	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_client_details( clientid ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_client_details( json.data ) )
		 			}else{
		 				dispatch( empty_client_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_client_details( "error occurs!!!" ) )
				}
			)
		})
	}
}

///-----add new client

export const ACTION_SUCCESS_ADD_NEW_CLIENT = "ACTION_SUCCESS_ADD_NEW_CLIENT"
export const ACTION_ERROR_ADD_NEW_CLIENT = "ACTION_ERROR_ADD_NEW_CLIENT"

export function success_add_new_client( data ){
	return createAction( ACTION_SUCCESS_ADD_NEW_CLIENT )( data )
}
export function error_add_new_client( data ){
	return createAction( ACTION_ERROR_ADD_NEW_CLIENT )( data )
}

function async_add_new_client( n_client_name, n_client_address){
	return fireAjax( 'POST', '', {
		'action' : 'create_new_client',
		'name' : n_client_name,
		'address' : n_client_address
	})
}

export function add_new_client( new_client_details  ){
	return function (dispatch,getState){
		let n_client_name = ""
		let n_client_address = ""

		if( typeof new_client_details.client_name != 'undefined' ){ 
			n_client_name = new_client_details.client_name
		}
		if( typeof new_client_details.client_address != 'undefined' ){ 
			n_client_address = new_client_details.client_address
		}

		if( n_client_name === "" ){ return Promise.reject('Client name is empty') }
		if( n_client_address === "" ){ return Promise.reject('Client Address is empty') }

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_add_new_client( n_client_name, n_client_address ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_add_new_client( json.data.message ) )
						reslove(1)
		 			}else{
		 				dispatch( error_add_new_client( json.data.message ) )
		 				reslove(0)
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_add_new_client( "error occurs!!!" ) )
					reslove(0)
				}
			)
		})
	}
}


///-----create client new invoice

export const ACTION_SUCCESS_CREATE_CLIENT_INVOICE = "ACTION_SUCCESS_CREATE_CLIENT_INVOICE"
export const ACTION_ERROR_CREATE_CLIENT_INVOICE = "ACTION_ERROR_CREATE_CLIENT_INVOICE"

export function success_create_client_invoice( data ){
	return createAction( ACTION_SUCCESS_CREATE_CLIENT_INVOICE )( data )
}
export function error_create_client_invoice( data ){
	return createAction( ACTION_ERROR_CREATE_CLIENT_INVOICE )( data )
}

function async_create_client_invoice( n_client_id, n_client_name, n_client_address, n_currency, n_items, n_sub_total, n_service_tax, n_total_amount, n_due_date){
	return fireAjax( 'POST', '', {
 		'action' : 'create_client_invoice',
 		'client_id' : n_client_id,
      	'client_name' : n_client_name,
      	'client_address' : n_client_address,
      	'currency' : n_currency,
      	'items' : n_items,
      	'sub_total' : n_sub_total,
      	'service_tax' : n_service_tax,
      	'total_amount' : n_total_amount,
      	'due_date' : n_due_date
 	})
}

export function create_client_invoice( new_client_invoice_details  ){


	console.log( new_client_invoice_details )

	return function (dispatch,getState){
		let n_client_id = ""
		let n_client_name = ""
		let n_client_address = ""
		let n_currency = ""
		let n_items = ""
		let n_sub_total = ""
		let n_service_tax = ""
		let n_total_amount = ""
		let n_due_date = ""

		if( typeof new_client_invoice_details.client_id != 'undefined' ){ 
			n_client_id = new_client_invoice_details.client_id
		}
		if( typeof new_client_invoice_details.client_name != 'undefined' ){ 
			n_client_name = new_client_invoice_details.client_name
		}
		if( typeof new_client_invoice_details.client_address != 'undefined' ){ 
			n_client_address = new_client_invoice_details.client_address
		}
		if( typeof new_client_invoice_details.currency != 'undefined' ){ 
			n_currency = new_client_invoice_details.currency
		}
		if( typeof new_client_invoice_details.items != 'undefined' ){ 
			n_items = new_client_invoice_details.items
		}
		if( typeof new_client_invoice_details.sub_total != 'undefined' ){ 
			n_sub_total = new_client_invoice_details.sub_total
		}
		if( typeof new_client_invoice_details.service_tax != 'undefined' ){ 
			n_service_tax = new_client_invoice_details.service_tax
		}
		if( typeof new_client_invoice_details.total_amount != 'undefined' ){ 
			n_total_amount = new_client_invoice_details.total_amount
		}
		if( typeof new_client_invoice_details.due_date != 'undefined' ){ 
			n_due_date = new_client_invoice_details.due_date
		}

		if( n_client_id === "" ){ return Promise.reject('Client id is empty') }
		if( n_client_name === "" ){ return Promise.reject('Client name is empty') }
		if( n_client_address === "" ){ return Promise.reject('Client Address is empty') }
		if( n_currency === "" ){ return Promise.reject('Currency is empty') }
		if( n_items === "" ){ return Promise.reject('Invoice Item is empty') }
		if( n_sub_total === "" ){ return Promise.reject('Sub total is empty') }
		if( n_service_tax === "" ){ return Promise.reject('Service tax is empty') }
		if( n_total_amount === "" ){ return Promise.reject('Total amount is empty') }
		if( n_due_date === "" ){ return Promise.reject('Due date is empty') }

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_create_client_invoice( n_client_id, n_client_name, n_client_address, n_currency, n_items, n_sub_total, n_service_tax, n_total_amount, n_due_date).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_add_new_client( json.data.message ) )
						reslove(1)
		 			}else{
		 				dispatch( error_add_new_client( json.data.message ) )
		 				reslove(0)
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_add_new_client( "error occurs!!!" ) )
					reslove(0)
				}
			)
		})
	}
}



// // //-------update profile details
// // export const ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS = "ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS"
// // export const ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS = "ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS"

// // export function success_update_user_profile_details( data ){
// // 	return createAction( ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS )( data )
// // }
// // export function error_update_user_profile_details( data ){
// // 	return createAction( ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS )( data )
// // }

// // function async_updateUserProfileDetails( n_user_id, n_name, n_jobtitle, n_dateofjoining, n_work_email, n_gender, n_dob, n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email){
// // 	return fireAjax( 'POST', '', {
// // 		'action' : 'update_user_profile_detail',
// // 		'user_id' : n_user_id,
// // 		'other_email' : n_other_email,
// // 		'home_ph' : n_home_phone,
// // 		'mobile_ph' : n_mobile_phone,
// // 		'country' : n_country,
// // 		'zip_postal' : n_zip_postal,
// // 		'state' : n_state,
// // 		'city' : n_city,
// // 		'address2' : n_address2,
// // 		'address1' : n_address1,
// // 		'marital_status' : n_marital_status,
// // 		'name' : n_name,
// // 		'jobtitle' : n_jobtitle,
// // 		'dateofjoining' : n_dateofjoining,
// // 		'work_email' : n_work_email,
// // 		'gender' : n_gender,
// // 		'dob' : n_dob,
// // 	})
// // }

// // export function updateUserProfileDetails( new_profile_details  ){
// // 	return function (dispatch,getState){
// // 		let n_user_id = ""

// // 		let n_name = ""
// // 		let n_jobtitle = ""
// // 		let n_dateofjoining = ""
// // 		let n_work_email = ""
// // 		let n_gender= ""
// // 		let n_dob = ""


// // 		let n_marital_status = ""
// // 		let n_address1 = ""
// // 		let n_address2 = ""
// // 		let n_city = ""
// // 		let n_state = ""
// // 		let n_zip_postal = ""
// // 		let n_country = ""
// // 		let n_home_phone = ""
// // 		let n_mobile_phone = ""
// // 		let n_other_email = ""
		
// // 		if( typeof new_profile_details.user_id != 'undefined' ){ 
// // 			n_user_id = new_profile_details.user_id
// // 		}
// // 		if( typeof new_profile_details.name != 'undefined' ){ 
// // 			n_name = new_profile_details.name
// // 		}
// // 		if( typeof new_profile_details.jobtitle != 'undefined' ){ 
// // 			n_jobtitle = new_profile_details.n_jobtitle
// // 		}
// // 		if( typeof new_profile_details.dateofjoining != 'undefined' ){ 
// // 			n_dateofjoining = new_profile_details.dateofjoining
// // 		}
// // 		if( typeof new_profile_details.work_email != 'undefined' ){ 
// // 			n_work_email = new_profile_details.work_email
// // 		}
// // 		if( typeof new_profile_details.gender != 'undefined' ){ 
// // 			n_gender = new_profile_details.gender
// // 		}
// // 		if( typeof new_profile_details.dob != 'undefined' ){ 
// // 			n_dob = new_profile_details.dob
// // 		}

// // 		if( typeof new_profile_details.marital_status != 'undefined' ){ 
// // 			n_marital_status = new_profile_details.marital_status
// // 		}		
// // 		if( typeof new_profile_details.address1 != 'undefined' ){ 
// // 			n_address1 = new_profile_details.address1
// // 		}
// // 		if( typeof new_profile_details.address2 != 'undefined' ){ 
// // 			n_address2 = new_profile_details.address2
// // 		}
// // 		if( typeof new_profile_details.city != 'undefined' ){ 
// // 			n_city = new_profile_details.city
// // 		}
// // 		if( typeof new_profile_details.state != 'undefined' ){ 
// // 			n_state = new_profile_details.state
// // 		}
// // 		if( typeof new_profile_details.zip_postal != 'undefined' ){ 
// // 			n_zip_postal = new_profile_details.zip_postal
// // 		}
// // 		if( typeof new_profile_details.country != 'undefined' ){ 
// // 			n_country = new_profile_details.country
// // 		}
// // 		if( typeof new_profile_details.home_ph != 'undefined' ){ 
// // 			n_home_phone = new_profile_details.home_ph
// // 		}
// // 		if( typeof new_profile_details.mobile_ph != 'undefined' ){ 
// // 			n_mobile_phone = new_profile_details.mobile_ph
// // 		}
// // 		if( typeof new_profile_details.other_email != 'undefined' ){ 
// // 			n_other_email = new_profile_details.other_email
// // 		}

		
// // 		if( n_user_id === "" ){ return Promise.reject('User id is empty') }
// // 		if( n_name === "" ){ return Promise.reject('Name is empty') }
// // 		if( n_jobtitle === "" ){ return Promise.reject('Jobtitle is empty') }
// // 		if( n_dateofjoining === "" ){ return Promise.reject('Joining date is empty') }
// // 		if( n_work_email === "" ){ return Promise.reject('Work email is empty') }
// // 		if( n_gender === "" ){ return Promise.reject('Gender is empty') }
// // 		if( n_dob === "" ){ return Promise.reject('Date of birth is empty') }
// // 		if( n_marital_status === "" ){ return Promise.reject('Marital status is empty') }
// // 		if( n_address1 === "" ){ return Promise.reject('Address1 is empty') }
// // 		if( n_address2 === "" ){ return Promise.reject('Address2 is empty') }
// // 		if( n_city === "" ){ return Promise.reject('City is empty') }
// // 		if( n_state === "" ){ return Promise.reject('State is empty') }
// // 		if( n_zip_postal === "" ){ return Promise.reject('Zip Code is empty') }
// // 		if( n_country === "" ){ return Promise.reject('Country is empty') }
// // 		if( n_home_phone === "" ){ return Promise.reject('Home Phone number is empty') }
// // 		if( n_mobile_phone === "" ){ return Promise.reject('Mobile number is empty') }
// // 		if( n_other_email === "" ){ return Promise.reject('Other email is empty') }
		
// // 		return new Promise(( reslove, reject ) => {
// // 			dispatch( show_loading() ); // show loading icon
// // 			async_updateUserProfileDetails( n_user_id, n_name, n_jobtitle, n_dateofjoining, n_work_email, n_gender, n_dob, n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email).then(
// // 				( json ) => {
// // 					dispatch( hide_loading() ) // hide loading icon
// // 					if( json.error == 0 ){
// // 						dispatch( getUserProfileDetails( n_user_id  ) )
// // 						dispatch( success_update_user_profile_details( json.data.message ) )
// // 		 			}else{
// // 		 				dispatch( error_update_user_profile_details( json.data.message ) )
// // 		 			}
// // 				},
// // 				( error ) => {
// // 					dispatch( hide_loading() ) // hide loading icon
// // 					dispatch( error_update_user_profile_details( "error occurs!!!" ) )
// // 				}
// // 			)
// // 		})
// // 	}
// // }