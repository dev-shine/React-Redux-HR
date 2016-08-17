import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    "status_message" : "",
    "salary_history" : []
}

export function manageSalary( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_USER_SALARY_DETAILS' ){

        return state.set( 'salary_history' , action.payload )

    }else if( action.type == 'ACTION_EMPTY_USER_SALARY_DETAILS'){

        return state.set( 'salary_history', action.payload )

    }else{
        return state
    }
}