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
			dispatch( show_loading() ); // show loading icon
			async_fetchPolicyDocument().then(
				( json ) => {
					dispatch( hide_loading()) // hide loading icon
					if( typeof json.error != 'undefined' && json.error == 0 ){
						dispatch( success_fetch_policy_documents( json.data ) )
						resolve()
					}else{
						dispatch( error_fetch_policy_documents( json.data.message ) )
						reject( json.data.message )
					}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					reject( 'error occurs' )
				}
			)
		})
	}
}

//-----------Submit policy document info-----------

function async_submitDocs(docs){
	return fireAjax( 'POST', '', {
		action: 'save_policy_document',
		type: 'policy_document',
		value: JSON.stringify(docs),
	})
}

export function submitDocs(docs){
	return function (dispatch, getState){
		return new Promise((resolve, reject) => {
			dispatch( show_loading() ); // show loading icon
			async_submitDocs(docs).then(
				( json ) => {
					dispatch( hide_loading()) // hide loading icon
					if( typeof json.error != 'undefined' && json.error == 0 ){
						dispatch( fetchPolicyDocument() )
						resolve( json.data.message )
					}else{
						reject( json.data.message )
					}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					reject( 'error occurs' )
				}
			)
		})
	}
}

//-----------update Read Status of policy document-----------

function async_updateReadStatus(docs){
	return fireAjax( 'POST', '', {
		action: 'updateReadStatus',
		data:docs,
	})
}

export function updateReadStatus(docs){
	return function (dispatch, getState){
		return new Promise((resolve, reject) => {
			console.log('updateReadStatus',docs)
			resolve('true...')
			// dispatch( show_loading() ); // show loading icon
			// async_updateReadStatus().then(
			// 	( json ) => {
			// 		dispatch( hide_loading()) // hide loading icon
			// 		if( typeof json.error != 'undefined' && json.error == 0 ){
			// 			resolve( json.data.message )
			// 		}else{
			// 			reject( json.data.message )
			// 		}
			// 	},
			// 	( error ) =>{
			// 		console.log('******',error);
			// 		dispatch( hide_loading() ) // hide loading icon
			// 		reject( 'error occurs' )
			// 	}
			// )
		})
	}
}
