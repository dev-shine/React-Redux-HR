import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    all_leaves : [],
    leaves : [],
    selectedLeave : {}
}

export function listLeaves( state = Immutable.fromJS(initialState), action ){

    if( action.type == 'ACTION_LIST_LEAVES_SUCCESS' ){
        let selectedLeave = action.payload.leaves[0]

        let leavesList = action.payload.leaves;

        let newLeavesList = _.filter( leavesList, { 'status': 'Pending'  } )

        return state.set( 'leaves' , newLeavesList )
        .set( 'selectedLeave' , selectedLeave )
        .set( 'all_leaves' , leavesList )

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
    }else if( action.type == 'ACTION_LEAVE_FILTER' ){
        let appliedFilter = action.payload
        let leavesList = state.get('all_leaves');
        let newLeavesList = _.filter( leavesList, { 'status': appliedFilter  } )

        let selectedLeave = newLeavesList[0]


        return state.set( 'leaves' , newLeavesList )
        .set( 'selectedLeave' , selectedLeave )
           
    }else{
        return state
    }
}