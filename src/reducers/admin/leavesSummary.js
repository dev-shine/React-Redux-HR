import Immutable from 'immutable'

let initialState = {
    "year" : "",
    "month" : "",
    "monthName" : "",
    "nextMonth" : {},
    "previousMonth" : {},
    "leavesSummary" : [],
}

export function leavesSummary( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_SUCCESS_LEAVES_SUMMARY' ){

        return state.set( 'leavesSummary' , action.payload.leavesSummary )
        .set( 'year' , action.payload.year )
        .set( 'month' , action.payload.month )
        .set( 'monthName' , action.payload.monthName )
        .set( 'nextMonth' , action.payload.nextMonth )
        .set( 'previousMonth' , action.payload.previousMonth )

    }else if( action.type == 'ACTION_EMPTY_LEAVES_SUMMARY' ){

        return state.set( 'leavesSummary' , action.payload )

    }else if( action.type == 'ACTION_ERROR_LEAVES_SUMMARY' ){

        return state.set( 'leavesSummary' , action.payload )

    }else{
    	return state
    }
}