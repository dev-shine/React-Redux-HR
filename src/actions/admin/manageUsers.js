import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_USER_PROFILE = "ACTION_SUCCESS_USER_PROFILE"
export const ACTION_EMPTY_USER_PROFILE = "ACTION_EMPTY_USER_PROFILE"
export const ACTION_ERROR_USER_PROFILE = "ACTION_ERROR_USER_PROFILE"

export function success_user_profile( data ){
	return createAction( ACTION_SUCCESS_USER_PROFILE )( data )
}
export function empty_user_profile( data ){
	return createAction( ACTION_EMPTY_USER_PROFILE )( data )
}
export function error_user_profile( ACTION_ERROR_USER_PROFILE ){
	return createAction( ACTION_ERROR_MY_PROFILE )( data )
}

function async_getUserProfileDetails( userid ){
	return fireAjax( 'POST', '', {
		'action' : 'get_user_profile_detail',
		'user_id' : userid
	})
}

export function getUserProfileDetails( userid  ){
	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_getUserProfileDetails( userid ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_user_profile( json.data ) )
		 			}else{
		 				dispatch( empty_user_profile( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_user_profile( "error occurs!!!" ) )
				}
			)
		})
	}
}

//-------update profile details
export const ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS = "ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS"
export const ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS = "ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS"

export function success_update_user_profile_details( data ){
	return createAction( ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS )( data )
}
export function error_update_user_profile_details( data ){
	return createAction( ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS )( data )
}

function async_updateUserProfileDetails( n_user_id, n_name, n_jobtitle, n_dateofjoining, n_work_email, n_gender, n_dob, n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_profile_detail',
		'user_id' : n_user_id,
		'other_email' : n_other_email,
		'home_ph' : n_home_phone,
		'mobile_ph' : n_mobile_phone,
		'country' : n_country,
		'zip_postal' : n_zip_postal,
		'state' : n_state,
		'city' : n_city,
		'address2' : n_address2,
		'address1' : n_address1,
		'marital_status' : n_marital_status,
		'name' : n_name,
		'jobtitle' : n_jobtitle,
		'dateofjoining' : n_dateofjoining,
		'work_email' : n_work_email,
		'gender' : n_gender,
		'dob' : n_dob,
	})
}

export function updateUserProfileDetails( new_profile_details  ){
	return function (dispatch,getState){
		let n_user_id = ""

		let n_name = ""
		let n_jobtitle = ""
		let n_dateofjoining = ""
		let n_work_email = ""
		let n_gender= ""
		let n_dob = ""


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
		
		if( typeof new_profile_details.user_id != 'undefined' ){ 
			n_user_id = new_profile_details.user_id
		}
		if( typeof new_profile_details.name != 'undefined' ){ 
			n_name = new_profile_details.name
		}
		if( typeof new_profile_details.jobtitle != 'undefined' ){ 
			n_jobtitle = new_profile_details.n_jobtitle
		}
		if( typeof new_profile_details.dateofjoining != 'undefined' ){ 
			n_dateofjoining = new_profile_details.dateofjoining
		}
		if( typeof new_profile_details.work_email != 'undefined' ){ 
			n_work_email = new_profile_details.work_email
		}
		if( typeof new_profile_details.gender != 'undefined' ){ 
			n_gender = new_profile_details.gender
		}
		if( typeof new_profile_details.dob != 'undefined' ){ 
			n_dob = new_profile_details.dob
		}

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

		
		if( n_user_id === "" ){ return Promise.reject('User id is empty') }
		if( n_name === "" ){ return Promise.reject('Name is empty') }
		if( n_jobtitle === "" ){ return Promise.reject('Jobtitle is empty') }
		if( n_dateofjoining === "" ){ return Promise.reject('Joining date is empty') }
		if( n_work_email === "" ){ return Promise.reject('Work email is empty') }
		if( n_gender === "" ){ return Promise.reject('Gender is empty') }
		if( n_dob === "" ){ return Promise.reject('Date of birth is empty') }
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
			async_updateUserProfileDetails( n_user_id, n_name, n_jobtitle, n_dateofjoining, n_work_email, n_gender, n_dob, n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getUserProfileDetails( n_user_id  ) )
						dispatch( success_update_user_profile_details( json.data.message ) )
		 			}else{
		 				dispatch( error_update_user_profile_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_user_profile_details( "error occurs!!!" ) )
				}
			)
		})
	}
}