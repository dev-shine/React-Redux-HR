import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    "status_message" : "",
    "variable" : []
}

export function variable( state = Immutable.fromJS(initialState), action ){

	if( action.type == 'ACTION_SUCCESS_VARIABLE_GET' ){
        return state.set( 'variable' , action.payload )

    }else if( action.type == 'ACTION_SUCCESS_ADD_VARIABLE' ){
		return state.set( 'status_message' , action.payload )

    }else if( action.type == 'ACTION_ERROR_ADD_VARIABLE'){

        return state.set( 'status_message', action.payload )

    }else{
    	return state.set( 'status_message' , '')
    }
}