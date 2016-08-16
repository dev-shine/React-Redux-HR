import Immutable from 'immutable'

let initialState = {
    "salary_history" : []
}

export function salary( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_SALARY_DETAILS' ){

        
        return state.set( 'salary_history' , action.payload )

    }else if( action.type == 'ACTION_EMPTY_SALARY_DETAILS' ){

        return state.set( 'salary_history' , [] )

    }else{
    	return state
    }
}