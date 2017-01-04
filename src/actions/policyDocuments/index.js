import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

 export const ACTION_POLICY_DOCUMENT_SUCCESS = "ACTION_POLICY_DOCUMENT_SUCCESS"
 export const ACTION_POLICY_DOCUMENT_FAIL = "ACTION_POLICY_DOCUMENT_FAIL"
// export const ACTION_LOGIN_ERROR = "ACTION_LOGIN_ERROR"


//-----------isUserAcceptedDocumentPolicy-----------
export function success_fetch_policy_documents( data ){
	return createAction( ACTION_POLICY_DOCUMENT_SUCCESS )( data )
}
export function error_fetch_policy_documents( data ){
	return createAction( ACTION_POLICY_DOCUMENT_FAIL )( data )
}


function async_fetchPolicyDocument(){
	return fireAjax( 'POST', '', {
		action: 'get_policy_document'
	})
}

export function fetchPolicyDocument(){
	return function (dispatch, getState){
		return new Promise((resolve, reject) => {
			//resolve('true...')
			dispatch( show_loading() ); // show loading icon
			async_fetchPolicyDocument().then(
				( json ) => {
					console.log('====',json);
					dispatch( hide_loading()) // hide loading icon
					if( typeof json.error != 'undefined' && json.error == 0 ){
						dispatch( success_fetch_policy_documents( json.data ) )
						resolve( json.data.message )
					}else{
						dispatch( error_fetch_policy_documents( json.data.message ) )
						reject( json.data.message )
					}
				},
				( error ) =>{
					console.log('******',error);
					dispatch( hide_loading() ) // hide loading icon
					//dispatch( error_forgot_password( 'error occurs') )
					reject( 'error occurs' )
				}
			)
		})
	}
}

//-----------Submit policy document info-----------

function async_submitDocs(docs){
	return fireAjax( 'POST', '', {
		action: 'upload_doc',
		data:docs,
	})
}

export function submitDocs(docs){
	return function (dispatch, getState){
		return new Promise((resolve, reject) => {
			console.log('upload action called',docs)
			resolve('true...')
			// dispatch( show_loading() ); // show loading icon
			// async_submitDocs().then(
			// 	( json ) => {
			// 		console.log('====',json);
			// 		dispatch( hide_loading()) // hide loading icon
			// 		if( typeof json.error != 'undefined' && json.error == 0 ){
			// 			//dispatch( success_forgot_password( json.data.message ) )
			// 			resolve( json.data.message )
			// 		}else{
			// 			//dispatch( error_forgot_password( json.data.message ) )
			// 			reject( json.data.message )
			// 		}
			// 	},
			// 	( error ) =>{
			// 		console.log('******',error);
			// 		dispatch( hide_loading() ) // hide loading icon
			// 		//dispatch( error_forgot_password( 'error occurs') )
			// 		reject( 'error occurs' )
			// 	}
			// )
		})
	}
}
