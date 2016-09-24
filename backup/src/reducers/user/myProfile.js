import Immutable from 'immutable'

let initialState = {
	"status_message" : "",
    "user_profile_detail" : {},
    "user_bank_detail" : {}
}

export function myProfile( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_MY_PROFILE' ){
        
        return state.set( 'user_profile_detail' , action.payload.user_profile_detail )
        .set( 'user_bank_detail' , action.payload.user_bank_detail )

    }else if( action.type == 'ACTION_SUCCESS_UPDATE_BANK_DETAILS' ){
        
        return state.set( 'status_message' , action.payload )

    }else if( action.type == 'ACTION_ERROR_UPDATE_BANK_DETAILS' ){
        
        return state.set( 'status_message' , action.payload )

    }else if( action.type == 'ACTION_SUCCESS_UPDATE_PROFILE_DETAILS'){
    	return state.set( 'status_message' , action.payload )
    }else if( action.type == 'ACTION_ERROR_UPDATE_PROFILE_DETAILS'){
    	return state.set( 'status_message' , action.payload )
    }else{
    	return state.set( 'status_message' , "")
    }
}