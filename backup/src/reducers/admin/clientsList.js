import Immutable from 'immutable'

let initialState = {
    "clients" : [],
}

export function clientsList( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_CLIENTS_LIST' ){

        return state.set( 'clients' , action.payload )

    }else if( action.type == 'ACTION_EMPTY_CLIENTS_LIST' ){

        return state.set( 'clients' , action.payload )

    }else if( action.type == 'ACTION_ERROR_CLIENTS_LIST' ){

        return state.set( 'clients' , action.payload )

    }else{
    	return state
    }
}