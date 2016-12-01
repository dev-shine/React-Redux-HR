import { createAction } from 'redux-actions'
import * as _ from 'lodash'
import {show_loading, hide_loading} from '../generic/frontend'
import {fireAjax} from '../../services/index'

//export const ACTION_SUCCESS_FETCH_VARIABLE = "ACTION_SUCCESS_FETCH_VARIABLE"
export const ACTION_SUCCESS_ADD_VARIABLE = "ACTION_SUCCESS_ADD_VARIABLE"
export const ACTION_ERROR_ADD_VARIABLE = "ACTION_ERROR_ADD_VARIABLE"
export const ACTION_SUCCESS_VARIABLE_GET = "ACTION_SUCCESS_VARIABLE_GET"
//export const ACTION_UPDATE_PROGRESS_STATUS = "ACTION_UPDATE_PROGRESS_STATUS"
//export const UPDATE_TAGID = "UPDATE_TAGID"
export function success_add_variable( data ){
	return createAction( ACTION_SUCCESS_ADD_VARIABLE )( data )
}
export function error_add_varaible( data ){
	return createAction( ACTION_ERROR_ADD_VARIABLE )( data )
}

function async_saveVariable( id,variable ){
		return fireAjax( 'POST', '', {
		action : 'create_template_variable',
		name : variable.varCode,
        value : variable.varValue
	    })
}

function async_editVariable( id,variable ){
		return fireAjax( 'POST', '', {
		action : 'update_template_variable',
		id:id,
		name : variable.varCode,
        value : variable.varValue
	    })
}

export function saveVariable(id,variable){
	return (dispatch,getState) => {
		return new Promise( (resolve,reject) => {
			dispatch( show_loading() );
			if(id==""){
				async_saveVariable(  id,variable ).then(
				( json ) => {
		        		dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
		        		dispatch( success_add_variable( json.data ) )
		        		dispatch( get_variable( ) )
		        		resolve(json.data)
		          	}else{
		          		dispatch( error_add_varaible( json.error[0] ) )
		          	}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_add_varaible( 'error occurs'  ) )
				}
				)
			}else{
				async_editVariable(id,variable).then(
				( json ) => {
		        		dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
		        		dispatch( success_add_variable( json.data ) )
		        		dispatch( get_variable( ) )
		        		resolve(json.data)
		          	}else{
		          		dispatch( error_add_varaible( json.error[0] ) )
		          	}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_add_varaible( 'error occurs'  ) )
				}
				)
			}
			
		})
	}
}

function async_get_variable(  ){
	return fireAjax( 'POST', '', {
		action : 'get_template_variable'
	})
}

export function success_variable_get( data ){
	return createAction( ACTION_SUCCESS_VARIABLE_GET )( data )
}

export function get_variable( ){
	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_variable( ).then(
				( json ) => {
					dispatch( hide_loading() )
					if( typeof json != 'undefined' && json.length > 0 ){
						let data = json
						dispatch( success_variable_get( data ) )
						resolve(data)
					}else{
						dispatch( success_variable_get( [] ) )
					}
					
				},
				( error ) =>{
					dispatch( hide_loading() )// hide loading icon
					dispatch( success_variable_get( []  ) )
				}
			)
		})
	}
}

function async_delete_variable( id ){
	return fireAjax( 'POST', '', {
		action : 'delete_template_variable',
		id:id
	})
}

export function deleteVariable(id){
	return function ( dispatch, getState ){
		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_delete_variable(id).then(
				( json ) => {
						dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( get_variable( ) )
		        		resolve(json.data.message)
					}else{
						dispatch( get_variable( ) )
						resolve(json.data.message)
					}
					
				},
				( error ) =>{
					dispatch( hide_loading() )// hide loading icon
					reject('error occurs!!')
				}
			)
		})
	}
}

/*export function fetchVariable(){
	return (dispatch,getState)=>{
		return new Promise((resolve,reject)=>{
			Meteor.call('fetchAllVariable',(err,data)=>{
				if(err){
					reject(err)
				}else{
					if(data.length > 0){
						dispatch(success_fetch_variable(data))
						resolve('variable loading completed')
					}else{
						dispatch(success_fetch_variable(data))
						resolve('No variable in database')
					}
				}
			})
		})
	}
}

export function deleteVariable( id ){
	return (dispatch,getState) => {
		return new Promise( (resolve,reject) => {
			Meteor.call('deleteVariable', id , (err, data) => {
				if(err){
					reject(err)
				}else{
					dispatch ( fetchVariable(data) )
					resolve(data)
				}
			})
		})
	}
}


export function success_fetch_variable( data ){
	return createAction( ACTION_SUCCESS_FETCH_VARIABLE )( data )
}*/


