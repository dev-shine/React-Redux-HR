import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_MY_PROFILE = "ACTION_SUCCESS_MY_PROFILE"
export const ACTION_EMPTY_MY_PROFILE = "ACTION_EMPTY_MY_PROFILE"
export const ACTION_ERROR_MY_PROFILE = "ACTION_ERROR_MY_PROFILE"

export function success_my_profile( data ){
	return createAction( ACTION_SUCCESS_MY_PROFILE )( data )
}
export function empty_my_profile( data ){
	return createAction( ACTION_EMPTY_MY_PROFILE )( data )
}
export function error_my_profile( data ){
	return createAction( ACTION_ERROR_MY_PROFILE )( data )
}

function async_getMyProfileDetails( ){
	return fireAjax( 'POST', '', {
		'action' : 'get_user_profile_detail'
	})
}

export function getMyProfileDetails(  ){

	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_getMyProfileDetails( ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_my_profile( json.data ) )
		 			}else{
		 				dispatch( empty_my_profile( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_my_profile( "error occurs!!!" ) )
				}
			)
			
		})

	}
    
}

//-------update profile details
export const ACTION_SUCCESS_UPDATE_PROFILE_DETAILS = "ACTION_SUCCESS_UPDATE_PROFILE_DETAILS"
export const ACTION_ERROR_UPDATE_PROFILE_DETAILS = "ACTION_ERROR_UPDATE_PROFILE_DETAILS"

export function success_update_profile_details( data ){
	return createAction( ACTION_SUCCESS_UPDATE_PROFILE_DETAILS )( data )
}
export function error_update_profile_details( data ){
	return createAction( ACTION_ERROR_UPDATE_PROFILE_DETAILS )( data )
}

function async_updateProfileDetails( n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_profile_detail',
		'other_email' : n_other_email,
		'home_ph' : n_home_phone,
		'mobile_ph' : n_mobile_phone,
		'country' : n_country,
		'zip_postal' : n_zip_postal,
		'state' : n_state,
		'city' : n_city,
		'address2' : n_address2,
		'address1' : n_address1,
		'marital_status' : n_marital_status
	})
}

export function updateProfileDetails( new_profile_details  ){
	return function (dispatch,getState){

		let n_marital_status = ""
		let n_address1 = ""
		let n_address2 = ""
		let n_city = ""
		let n_state = ""
		let n_zip_postal = ""
		let n_country = ""
		let n_home_phone = ""
		let n_mobile_phone = ""
		let n_other_email = ""
		
		if( typeof new_profile_details.marital_status != 'undefined' ){ 
			n_marital_status = new_profile_details.marital_status
		}		
		if( typeof new_profile_details.address1 != 'undefined' ){ 
			n_address1 = new_profile_details.address1
		}
		if( typeof new_profile_details.address2 != 'undefined' ){ 
			n_address2 = new_profile_details.address2
		}
		if( typeof new_profile_details.city != 'undefined' ){ 
			n_city = new_profile_details.city
		}
		if( typeof new_profile_details.state != 'undefined' ){ 
			n_state = new_profile_details.state
		}
		if( typeof new_profile_details.zip_postal != 'undefined' ){ 
			n_zip_postal = new_profile_details.zip_postal
		}
		if( typeof new_profile_details.country != 'undefined' ){ 
			n_country = new_profile_details.country
		}
		if( typeof new_profile_details.home_ph != 'undefined' ){ 
			n_home_phone = new_profile_details.home_ph
		}
		if( typeof new_profile_details.mobile_ph != 'undefined' ){ 
			n_mobile_phone = new_profile_details.mobile_ph
		}
		if( typeof new_profile_details.other_email != 'undefined' ){ 
			n_other_email = new_profile_details.other_email
		}

		if( n_marital_status === "" ){ return Promise.reject('Marital status is empty') }
		if( n_address1 === "" ){ return Promise.reject('Address1 is empty') }
		if( n_address2 === "" ){ return Promise.reject('Address2 is empty') }
		if( n_city === "" ){ return Promise.reject('City is empty') }
		if( n_state === "" ){ return Promise.reject('State is empty') }
		if( n_zip_postal === "" ){ return Promise.reject('Zip Code is empty') }
		if( n_country === "" ){ return Promise.reject('Country is empty') }
		if( n_home_phone === "" ){ return Promise.reject('Home Phone number is empty') }
		if( n_mobile_phone === "" ){ return Promise.reject('Mobile number is empty') }
		if( n_other_email === "" ){ return Promise.reject('Other email is empty') }
		
		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_updateProfileDetails( n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getMyProfileDetails(  ) )
						dispatch( success_update_profile_details( json.data.message ) )
		 			}else{
		 				dispatch( error_update_profile_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_profile_details( "error occurs!!!" ) )
				}
			)
		})
	}
}

//-------update bank details
export const ACTION_SUCCESS_UPDATE_BANK_DETAILS = "ACTION_SUCCESS_UPDATE_BANK_DETAILS"
export const ACTION_ERROR_UPDATE_BANK_DETAILS = "ACTION_ERROR_UPDATE_BANK_DETAILS"

export function success_update_bank_details( data ){
	return createAction( ACTION_SUCCESS_UPDATE_BANK_DETAILS )( data )
}
export function error_update_bank_details( data ){
	return createAction( ACTION_ERROR_UPDATE_BANK_DETAILS )( data )
}

function async_updateBankDetails( n_bank_account_no, n_bank_name, n_bank_address, n_ifsc ){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_bank_detail',
		'bank_account_no' : n_bank_account_no,
		'bank_name' : n_bank_name,
		'bank_address' : n_bank_address,
		'ifsc' : n_ifsc
	})
}

export function updateBankDetails( new_bank_details  ){
	return function (dispatch,getState){
		let n_bank_name = ""
		let n_bank_address = ""
		let n_bank_account_no = ""
		let n_ifsc = ""

		if( typeof new_bank_details.bank_account_no != 'undefined' ){ 
			n_bank_account_no = new_bank_details.bank_account_no 
		}
		if( typeof new_bank_details.bank_name != 'undefined' ){ 
			n_bank_name = new_bank_details.bank_name 
		}
		if( typeof new_bank_details.bank_address != 'undefined' ){ 
			n_bank_address = new_bank_details.bank_address 
		}
		if( typeof new_bank_details.ifsc != 'undefined' ){ 
			n_ifsc = new_bank_details.ifsc 
		}
		if( n_bank_account_no === "" ){ return Promise.reject('Account number is empty') }
		if( n_bank_name === "" ){ return Promise.reject('Bank name is empty') }
		if( n_bank_address === "" ){ return Promise.reject('Bank address is empty') }
		if( n_ifsc === "" ){ return Promise.reject('IFSC is empty') }
		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_updateBankDetails(  n_bank_account_no, n_bank_name, n_bank_address, n_ifsc).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getMyProfileDetails(  ) )
						dispatch( success_update_bank_details( json.data.message ) )
		 			}else{
		 				dispatch( error_update_bank_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_bank_details( "error occurs!!!" ) )
				}
			)
		})
	}
}





//-------update password
export const ACTION_SUCCESS_UPDATE_PASSWORD = "ACTION_SUCCESS_UPDATE_PASSWORD"
export const ACTION_ERROR_UPDATE_PASSWORD = "ACTION_ERROR_UPDATE_PASSWORD"

export function success_update_password( data ){
	return createAction( ACTION_SUCCESS_UPDATE_PASSWORD )( data )
}
export function error_update_password( data ){
	return createAction( ACTION_ERROR_UPDATE_PASSWORD )( data )
}

function async_updatePassword( n_new_password ){
	return fireAjax( 'POST', '', {
		'action' : 'update_new_password',
		'password' : n_new_password
	})
}

export function updatePassword( new_password  ){
	return function (dispatch,getState){
		
		let n_new_password = ""
		
		if( typeof new_password != 'undefined' && new_password != "" ){ 
			n_new_password = new_password
		}		
		
		if( n_new_password === "" ){ return Promise.reject('New Password is empty!!') }
		
		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_updatePassword( n_new_password ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon

					if( typeof json.error != 'undefined' && json.error == 0 ){
						dispatch( success_update_password( json.data.message ) )
						resolve( json.data.message )
					}else{
						dispatch( error_update_password( json.data.message ) )
						reject( json.data.message )
					}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_password( "error occurs!!!" ) )
					reject( "error occurs!!!" )
				}
			)
		})
	}
}

//------update document
function async_updateDocument( document_type, document_link, declearation ){
	let data = {
		'action' : 'insert_user_document',
		'document_type' : document_type, 
		'document_link' : document_link,
		'declearation'	: declearation
	}
	return fireAjax( 'POST', '', data)
}

export function updateDocument( documents_link ){
	return function (dispatch,getState){
		let document_type = ""
		let document_link = ""
		let declearation = documents_link.declearation

		if( typeof documents_link.doc_type == 'undefined' || documents_link.doc_type == '' ){ 
			return Promise.reject('Select document type')
 		}else{
 			document_type = documents_link.doc_type 
 		}
 		if( typeof documents_link.doc_link == 'undefined' || documents_link.doc_link.length == 0 ){ 
			return Promise.reject('Enter document link')
 		}else{
 			document_link = documents_link.doc_link 
 		}
		return new Promise((reslove, reject)=>{
			_.map(document_link,(link)=>{
				async_updateDocument(document_type, link, declearation).then(
				( json ) => {
					if( json.error == 0 ){
						resolve('Document updated successfully')
		 			}else{
		 				reject( 'Response with error 1')
		 			}
				},
				( error ) => {
					reject(  "error occurs!!!" )
				}
				)
			})
		})
	}
}