import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    leaves : [],
    selectedLeave : {}
}

export function listLeaves( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_LIST_LEAVES_SUCCESS' ){
        let selectedLeave = action.payload.leaves[0]

        let leavesList = action.payload.leaves;
        return state.set( 'leaves' , leavesList )
        .set( 'selectedLeave' , selectedLeave )

    }else if( action.type == 'ACTION_LIST_LEAVES_EMPTY'){

        return state

    }else if( action.type == 'ACTION_LIST_LEAVES_ERROR' ){

        return state

    }else if( action.type == 'ACTION_SELECT_LEAVE' ){
        let leavesList = state.get('leaves');
        let newSelect  = _.find( leavesList, { id : action.payload } )

        let newLeavesList = _.map( leavesList, ( d, k  ) => {
            if( action.payload == d.id ){
                d.option_select = 1
            }else{
                d.option_select = 0
            }
            return d
        })

        return state.set( 'selectedLeave' , newSelect )
        .set( 'leaves' , newLeavesList )
    }else{
        return state
    }
}