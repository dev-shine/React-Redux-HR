import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
    "status_message" : "",
    "user_data_for_payslip" : {},
    "user_payslip_history" : []
}

export function managePayslips( state = Immutable.fromJS(initialState), action ){

	if( action.type == 'ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA' ){
        return state.set( 'user_data_for_payslip' , action.payload.user_data_for_payslip )
        .set( 'user_payslip_history' , action.payload.user_payslip_history )

    }else if( action.type == 'ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA'){

        return state.set( 'status_message', action.payload )

    }else{
    	return state.set( 'status_message' , '')
    }
}