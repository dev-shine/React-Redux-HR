import Immutable from 'immutable'

let initialState = {
    "users" : [],
}

export function usersList( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_USERSLIST' ){

        return state.set( 'users' , action.payload )

    }else if( action.type == 'ACTION_EMPTY_USERSLIST' ){

        return state.set( 'users' , action.payload )

    }else if( action.type == 'ACTION_ERROR_USERSLIST' ){

        return state.set( 'users' , action.payload )

    }else{
    	return state
    }
}