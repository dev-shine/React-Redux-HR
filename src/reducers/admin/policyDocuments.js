import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    "status_message" : "",
    "policyDocuments" : []
}

export function policyDocuments( state = Immutable.fromJS(initialState), action ){

	if( action.type == 'ACTION_POLICY_DOCUMENT_SUCCESS' ){
    console.log('action.payload',action.payload);
        return state.set( 'policyDocuments' , action.payload )

    }else if( action.type == 'ACTION_POLICY_DOCUMENT_FAIL' ){
		    return state.set( 'status_message' , action.payload )

    }else{
    	return state.set( 'status_message' , '')
    }
}
