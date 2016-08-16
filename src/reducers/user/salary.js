import Immutable from 'immutable'

let initialState = {
    "salary_details" : {},
    "salary_history" : []
}

export function salary( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_SALARY_DETAILS' ){

        return state.set( 'salary_details' , action.payload[0] )
        .set( 'salary_history' , action.payload )

    }else if( action.type == 'ACTION_EMPTY_SALARY_DETAILS' ){

        return state.set( 'salary_details' , [] )
        .set( 'salary_history' , [] )

    }else{
    	return state
    }
}