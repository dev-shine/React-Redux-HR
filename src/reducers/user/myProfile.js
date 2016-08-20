import Immutable from 'immutable'

let initialState = {
    "user_profile_detail" : {},
    "user_bank_detail" : {}
}

export function myProfile( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_MY_PROFILE' ){

        
        return state.set( 'user_profile_detail' , action.payload.user_profile_detail )
        .set( 'user_bank_detail' , action.payload.user_bank_detail )

    }else{
    	return state
    }
}