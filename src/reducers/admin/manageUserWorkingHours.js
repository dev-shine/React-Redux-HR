import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    displayData : [],
    userInfo : {}
}

export function manageUserWorkingHours( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_USER_WORKING_HOURS' ){

        return state.set( 'displayData' , action.payload.list )
        .set( 'userInfo' , action.payload.userInfo )

    }else if( action.type == 'ACTION_EMPTY_USER_WORKING_HOURS'){

        return state.set( 'displayData' , action.payload.list )
        .set( 'userInfo' , action.payload.userInfo )

    }else if( action.type == 'ACTION_ERROR_USER_WORKING_HOURS' ){

        return state

    }else{
        return state
    }
}