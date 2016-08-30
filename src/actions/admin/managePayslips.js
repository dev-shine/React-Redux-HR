import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA = "ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA"
export const ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA = "ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA"


export function success_user_manage_payslips_data( data ){
	return createAction( ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA )( data )
}

export function error_user_manage_payslips_data( data ){
	return createAction( ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA )( data )
}

function async_get_user_manage_payslips_data( userid ){
	return fireAjax( 'GET', '', {
		action : 'get_user_manage_payslips_data',
		user_id : userid
	})
}

export function get_user_manage_payslips_data( userid ){
	return function ( dispatch, getState ){

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_get_user_manage_payslips_data( userid ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( typeof json.data != 'undefined' ){
						//let data = json.data.salary_details.reverse()
						let data = json.data
						dispatch( success_user_manage_payslips_data( data ) )
					}else{
						dispatch( success_user_manage_payslips_data( [] ) )
					}
					
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA( []  ) )
				}
			)
		})
	}
}

///-------------------
//create user payslip
export const ACTION_SUCCESS_CREATE_USER_SALARY_SLIP = "ACTION_SUCCESS_CREATE_USER_SALARY_SLIP"
export const ACTION_ERROR_CREATE_USER_SALARY_SLIP = "ACTION_ERROR_CREATE_USER_SALARY_SLIP"

export function success_create_user_salary_slip( data ){
	return createAction( ACTION_SUCCESS_CREATE_USER_SALARY_SLIP )( data )
}
export function error_create_user_salary_slip( data ){
	return createAction( ACTION_ERROR_CREATE_USER_SALARY_SLIP )( data )
}


function async_create_user_payslip( n_userid,n_year,n_month,n_name,n_designation,n_joining_date,n_total_working_days,n_days_present,n_paid_leaves,n_unpaid_leaves,n_total_leave_taken,
        n_allocated_leaves,n_leave_balance,n_final_leave_balance,n_basic,n_epf,n_hra,n_loan,n_conveyance,n_advance,n_medical_allowance,n_misc_deduction,
        n_special_allowance,n_tds,n_arrear,n_bonus,n_total_earning,n_total_deduction,n_net_salary ){
	return fireAjax( 'POST', '', {
		action : 'create_employee_salary_slip',
		user_id : n_userid,
		year : n_year,
		month : n_month,
		name : n_name,
		designation : n_designation,
		joining_date : n_joining_date,
		total_working_days : n_total_working_days,
		days_present : n_days_present,
		paid_leaves : n_paid_leaves,
		unpaid_leaves : n_unpaid_leaves,
		total_leave_taken : n_total_leave_taken,
		allocated_leaves : n_allocated_leaves,
		leave_balance : n_leave_balance,
		final_leave_balance : n_final_leave_balance,
		basic : n_basic,
		epf : n_epf,
		hra : n_hra,
		loan : n_loan,
		conveyance : n_conveyance,
		advance : n_advance,
		medical_allowance : n_medical_allowance,
		misc_deduction : n_misc_deduction,
		special_allowance : n_special_allowance,
		tds : n_tds,
		arrear : n_arrear,
		bonus : n_bonus,
		total_earning : n_total_earning,
		total_deduction : n_total_deduction,
		net_salary : n_net_salary
	})
}

export function create_user_payslip(  new_salary_slip_data ){
	return function ( dispatch, getState ){
		let n_userid = ""
		let n_year = ""
		let n_month = ""
		let n_name = ""
		let n_designation = ""
        let n_joining_date = ""
        let n_total_working_days = ""
        let n_days_present = ""
        let n_paid_leaves = ""
        let n_unpaid_leaves = ""
        let n_total_leave_taken = ""
        let n_allocated_leaves = ""
        let n_leave_balance = ""
        let n_final_leave_balance = ""
        let n_basic = ""
        let n_epf = ""
        let n_hra = ""
        let n_loan = ""
        let n_conveyance = ""
        let n_advance = ""
        let n_medical_allowance = ""
        let n_misc_deduction = ""
        let n_special_allowance = ""
        let n_tds = ""
        let n_arrear = ""
        let n_bonus = ""
        let n_total_earning = ""
        let n_total_deduction = ""
        let n_net_salary = ""


		if( typeof new_salary_slip_data.user_id == 'undefined' || new_salary_slip_data.user_id == '' ){ 
			return Promise.reject('User Id is empty')
 		}else{
 			n_userid = new_salary_slip_data.user_id 
 		}

 		if( typeof new_salary_slip_data.name == 'undefined' || new_salary_slip_data.name == '' ){ 
			return Promise.reject('Name is empty')
 		}else{
 			n_name = new_salary_slip_data.name
 		}

 		if( typeof new_salary_slip_data.year == 'undefined' || new_salary_slip_data.year == '' ){ 
			return Promise.reject('Year is empty')
 		}else{
 			n_year = new_salary_slip_data.year 
 		}

 		if( typeof new_salary_slip_data.month == 'undefined' || new_salary_slip_data.month == '' ){ 
			return Promise.reject('Month is empty')
 		}else{
 			n_month = new_salary_slip_data.month 
 		}

 		if( typeof new_salary_slip_data.designation == 'undefined' || new_salary_slip_data.designation == '' ){ 
			return Promise.reject('Designation is empty')
 		}else{
 			n_designation = new_salary_slip_data.designation 
 		}

 		if( typeof new_salary_slip_data.joining_date == 'undefined' || new_salary_slip_data.joining_date == '' ){ 
			return Promise.reject('Joining date is empty')
 		}else{
 			n_joining_date = new_salary_slip_data.joining_date 
 		}

 		if( typeof new_salary_slip_data.total_working_days == 'undefined' || new_salary_slip_data.total_working_days == '' ){ 
			return Promise.reject('Total working days is empty')
 		}else{
 			n_total_working_days = new_salary_slip_data.total_working_days 
 		}

 		if( typeof new_salary_slip_data.days_present == 'undefined' || new_salary_slip_data.days_present == '' ){ 
			return Promise.reject('Days present is empty')
 		}else{
 			n_days_present = new_salary_slip_data.days_present 
 		}

 		if( typeof new_salary_slip_data.paid_leaves == 'undefined' || new_salary_slip_data.paid_leaves == '' ){ 
			return Promise.reject('Paid leaves is empty')
 		}else{
 			n_paid_leaves = new_salary_slip_data.paid_leaves 
 		}

 		if( typeof new_salary_slip_data.unpaid_leaves == 'undefined' || new_salary_slip_data.unpaid_leaves == '' ){ 
			return Promise.reject('Unpaid leaves is empty')
 		}else{
 			n_unpaid_leaves = new_salary_slip_data.unpaid_leaves 
 		}

 		if( typeof new_salary_slip_data.total_leave_taken == 'undefined' || new_salary_slip_data.total_leave_taken == '' ){ 
			return Promise.reject('Total leave taken is empty')
 		}else{
 			n_total_leave_taken = new_salary_slip_data.total_leave_taken 
 		}

 		if( typeof new_salary_slip_data.allocated_leaves == 'undefined' || new_salary_slip_data.allocated_leaves == '' ){ 
			return Promise.reject('Allocated leaves is empty')
 		}else{
 			n_allocated_leaves = new_salary_slip_data.allocated_leaves 
 		}

 		if( typeof new_salary_slip_data.leave_balance == 'undefined' || new_salary_slip_data.leave_balance == '' ){ 
			return Promise.reject('Leave balance is empty')
 		}else{
 			n_leave_balance = new_salary_slip_data.leave_balance 
 		}

 		if( typeof new_salary_slip_data.final_leave_balance == 'undefined' || new_salary_slip_data.final_leave_balance == '' ){ 
			return Promise.reject('Final leave balance is empty')
 		}else{
 			n_final_leave_balance = new_salary_slip_data.final_leave_balance 
 		}

 		if( typeof new_salary_slip_data.basic == 'undefined' || new_salary_slip_data.basic == '' ){ 
			return Promise.reject('Basic is empty')
 		}else{
 			n_basic = new_salary_slip_data.basic 
 		}

 		if( typeof new_salary_slip_data.epf == 'undefined' || new_salary_slip_data.epf == '' ){ 
			return Promise.reject('EPF is empty')
 		}else{
 			n_epf = new_salary_slip_data.epf
 		}

 		if( typeof new_salary_slip_data.hra == 'undefined' || new_salary_slip_data.hra == '' ){ 
			return Promise.reject('HRA is empty')
 		}else{
 			n_hra = new_salary_slip_data.hra
 		}

 		if( typeof new_salary_slip_data.loan == 'undefined' || new_salary_slip_data.loan == '' ){ 
			return Promise.reject('Loan is empty')
 		}else{
 			n_loan = new_salary_slip_data.loan 
 		}

 		if( typeof new_salary_slip_data.conveyance == 'undefined' || new_salary_slip_data.conveyance == '' ){ 
			return Promise.reject('Conveyance is empty')
 		}else{
 			n_conveyance = new_salary_slip_data.conveyance 
 		}

 		if( typeof new_salary_slip_data.advance == 'undefined' || new_salary_slip_data.advance == '' ){ 
			return Promise.reject('Advance is empty')
 		}else{
 			n_advance = new_salary_slip_data.advance 
 		}
 		
		if( typeof new_salary_slip_data.medical_allowance == 'undefined' || new_salary_slip_data.medical_allowance == '' ){ 
			return Promise.reject('Medical allowance is empty')
 		}else{
 			n_medical_allowance = new_salary_slip_data.medical_allowance 
 		}

        if( typeof new_salary_slip_data.misc_deduction == 'undefined' || new_salary_slip_data.misc_deduction == '' ){ 
			return Promise.reject('Advance is empty')
 		}else{
 			n_misc_deduction = new_salary_slip_data.misc_deduction 
 		}

        if( typeof new_salary_slip_data.special_allowance == 'undefined' || new_salary_slip_data.special_allowance == '' ){ 
			return Promise.reject('Special allowance is empty')
 		}else{
 			n_special_allowance = new_salary_slip_data.special_allowance 
 		}

        if( typeof new_salary_slip_data.tds == 'undefined' || new_salary_slip_data.tds == '' ){ 
			return Promise.reject('TDS is empty')
 		}else{
 			n_tds = new_salary_slip_data.tds 
 		}

        if( typeof new_salary_slip_data.arrear == 'undefined' || new_salary_slip_data.arrear == '' ){ 
			return Promise.reject('Advance is empty')
 		}else{
 			n_arrear = new_salary_slip_data.arrear 
 		}

 		if( typeof new_salary_slip_data.bonus == 'undefined' || new_salary_slip_data.bonus == '' ){ 
			return Promise.reject('Bonus is empty')
 		}else{
 			n_bonus = new_salary_slip_data.bonus 
 		}

	        
        if( typeof new_salary_slip_data.total_earning == 'undefined' || new_salary_slip_data.total_earning == '' ){ 
			return Promise.reject('Total earning is empty')
 		}else{
 			n_total_earning = new_salary_slip_data.total_earning 
 		}
        
        if( typeof new_salary_slip_data.total_deduction == 'undefined' || new_salary_slip_data.total_deduction == '' ){ 
			return Promise.reject('Total deduction is empty')
 		}else{
 			n_total_deduction = new_salary_slip_data.n_total_deduction 
 		}

        if( typeof new_salary_slip_data.net_salary == 'undefined' || new_salary_slip_data.net_salary == '' ){ 
			return Promise.reject('Net salary is empty')
 		}else{
 			n_net_salary = new_salary_slip_data.net_salary 
 		}

		return new Promise(( resolve, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_create_user_payslip(  n_userid,n_year,n_month,n_name,n_designation,n_joining_date,n_total_working_days,n_days_present,n_paid_leaves,n_unpaid_leaves,n_total_leave_taken,
        n_allocated_leaves,n_leave_balance,n_final_leave_balance,n_basic,n_epf,n_hra,n_loan,n_conveyance,n_advance,n_medical_allowance,n_misc_deduction,
        n_special_allowance,n_tds,n_arrear,n_bonus,n_total_earning,n_total_deduction,n_net_salary ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon

					if( json.error == 0 ){
						dispatch( success_create_user_salary_slip( json.data ) )
		        		resolve(1)
		          	}else{
			            dispatch( error_create_user_salary_slip( json.error[0] ) )
			            resolve(0)
		          	}
				},
				( error ) =>{
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_create_user_salary_slip( 'error occurs'  ) )
					resolve(0)
				}
			)
		})
	}
}


// function async_add_user_new_salary( n_userid,n_applicable_from,n_applicable_till,n_total_salary,n_leave,n_basic,n_hra,n_conveyance,n_medical_allowance,n_special_allowance,n_arrear,n_epf,n_loan,n_advance,n_misc_deduction,n_tds ){
// 	return fireAjax( 'POST', '', {
// 		action : 'add_user_salary',
// 		user_id : n_userid,
// 		applicable_from : n_applicable_from,
// 		applicable_till : n_applicable_till,
// 		total_salary : n_total_salary,
// 		leave : n_leave,
// 		basic : n_basic,
// 		hra : n_hra,
// 		conveyance : n_conveyance,
// 		medical_allowance : n_medical_allowance,
// 		special_allowance : n_special_allowance,
// 		arrear : n_arrear,
// 		epf : n_epf,
// 		loan : n_loan,
// 		advance : n_advance,
// 		misc_deduction : n_misc_deduction,
// 		tds : n_tds
// 	})
// }

// export function add_user_new_salary(  new_salary_data ){
// 	return function ( dispatch, getState ){

// 		//n_userid,n_applicable_from,n_total_salary,n_leave,n_basic,n_hra,n_conveyance,n_medical_allowance,n_special_allowance,n_arrear,n_epf,n_loan,n_advance,n_misc_deduction,n_tds
		
// 		let n_userid = ""
// 		let n_applicable_from = ""
// 		let n_applicable_till = ""
// 		let n_total_salary = ""
// 		let n_leave = ""
// 		let n_basic = ""
// 		let n_hra = ""
// 		let n_conveyance = ""
// 		let n_medical_allowance = ""
// 		let n_special_allowance = ""
// 		let n_arrear = ""
// 		let n_epf = ""
// 		let n_loan = ""
// 		let n_advance = ""
// 		let n_misc_deduction = ""
// 		let n_tds = ""
		


// 		if( typeof new_salary_data.user_id != 'undefined' ){ 
// 			n_userid = new_salary_data.user_id 
// 		}
// 		if( typeof new_salary_data.applicable_from != 'undefined' ){ 
// 			n_applicable_from = new_salary_data.applicable_from 
// 		}
// 		if( typeof new_salary_data.applicable_till != 'undefined' ){ 
// 			n_applicable_till = new_salary_data.applicable_till 
// 		}
// 		if( typeof new_salary_data.total_salary != 'undefined' ){ 
// 			n_total_salary = new_salary_data.total_salary 
// 		}
// 		if( typeof new_salary_data.leave != 'undefined' ){ 
// 			n_leave = new_salary_data.leave 
// 		}
// 		if( typeof new_salary_data.basic != 'undefined' ){ 
// 			n_basic = new_salary_data.basic 
// 		}
// 		if( typeof new_salary_data.hra != 'undefined' ){ 
// 			n_hra = new_salary_data.hra 
// 		}
// 		if( typeof new_salary_data.conveyance != 'undefined' ){ 
// 			n_conveyance = new_salary_data.conveyance 
// 		}
// 		if( typeof new_salary_data.medical_allowance != 'undefined' ){ 
// 			n_medical_allowance = new_salary_data.medical_allowance 
// 		}
// 		if( typeof new_salary_data.special_allowance != 'undefined' ){ 
// 			n_special_allowance = new_salary_data.special_allowance 
// 		}
// 		if( typeof new_salary_data.arrear != 'undefined' ){ 
// 			n_arrear = new_salary_data.arrear 
// 		}
// 		if( typeof new_salary_data.epf != 'undefined' ){ 
// 			n_epf = new_salary_data.epf 
// 		}
// 		if( typeof new_salary_data.loan != 'undefined' ){ 
// 			n_loan = new_salary_data.loan 
// 		}
// 		if( typeof new_salary_data.advance != 'undefined' ){ 
// 			n_advance = new_salary_data.advance 
// 		}
// 		if( typeof new_salary_data.misc_deduction != 'undefined' ){ 
// 			n_misc_deduction = new_salary_data.misc_deduction 
// 		}
// 		if( typeof new_salary_data.tds != 'undefined' ){ 
// 			n_tds = new_salary_data.tds 
// 		}
		
// 		if( n_userid === "" ){ return Promise.reject('User Id is empty') }
// 		if( n_applicable_from === ""){ return Promise.reject('Applicable from date is empty') }
// 		if( n_applicable_till === ""){ return Promise.reject('Applicable till date is empty') }
// 		if( n_total_salary === "" ){ return Promise.reject('Total Salary is empty') }
// 		if( n_leave=== "" ){ return Promise.reject('Leave is empty') }
// 		if( n_basic === "" ){ return Promise.reject('Basic is empty') }
// 		if( n_hra === "" ){ return Promise.reject('HRA date is empty') }
// 		if( n_conveyance === "" ){ return Promise.reject('Conveyance is empty') }
// 		if( n_medical_allowance === "" ){ return Promise.reject('Medical_allowance is empty') }
// 		if( n_special_allowance === "" ){ return Promise.reject('Special Allowance is empty') }
// 		if( n_arrear === "" ){ return Promise.reject('Arrear is empty') }
// 		if( n_epf === "" ){ return Promise.reject('EPF is empty') }
// 		if( n_loan === "" ){ return Promise.reject('Loan is empty') }
// 		if( n_advance === "" ){ return Promise.reject('Advance is empty') }
// 		if( n_misc_deduction === "" ){ return Promise.reject('Misc Deduction is empty') }
// 		if( n_tds === "" ){ return Promise.reject('TDS is empty') }
		
// 		return new Promise(( resolve, reject ) => {
// 			dispatch( show_loading() ); // show loading icon
// 			async_add_user_new_salary(  n_userid,n_applicable_from,n_applicable_till,n_total_salary,n_leave,n_basic,n_hra,n_conveyance,n_medical_allowance,n_special_allowance,n_arrear,n_epf,n_loan,n_advance,n_misc_deduction,n_tds ).then(
// 				( json ) => {
// 					dispatch( hide_loading() ) // hide loading icon
// 					if( json.error.length == 0 ){
// 		        		dispatch( success_add_user_salary( json.data ) )
// 		        		dispatch( get_user_salary_details( n_userid ) )
// 		          	}else{
// 			            dispatch( error_add_user_salary( json.error[0] ) )
// 		          	}
// 				},
// 				( error ) =>{
// 					dispatch( hide_loading() ) // hide loading icon
// 					dispatch( error_add_user_salary( 'error occurs'  ) )
// 				}
// 			)
// 		})
// 	}
// }


// ///-----holding---------------------------------------------------------



// export const ACTION_SUCCESS_ADD_USER_HOLDING = "ACTION_SUCCESS_ADD_USER_HOLDING"
// export const ACTION_ERROR_ADD_USER_HOLDING = "ACTION_ERROR_ADD_USER_HOLDING"

// export function success_add_user_holding( data ){
// 	return createAction( ACTION_SUCCESS_ADD_USER_HOLDING )( data )
// }
// export function error_add_user_holding( data ){
// 	return createAction( ACTION_ERROR_ADD_USER_HOLDING )( data )
// }


// function async_add_user_new_holding( n_userid, n_holding_from, n_holding_till, n_holding_amount, n_holding_reason ){
// 	return fireAjax( 'POST', '', {
// 		action : 'add_user_holding',
// 		user_id : n_userid,
// 		holding_start_date : n_holding_from, 
// 		holding_end_date : n_holding_till, 
// 		holding_amt : n_holding_amount, 
// 		reason : n_holding_reason
// 	})
// }

// export function add_user_new_holding( data ){
// 	return function ( dispatch, getState ){
		
// 		let n_userid = ""
// 		let n_holding_from = ""
// 		let n_holding_till = ""
// 		let n_holding_amount = ""
// 		let n_holding_reason = ""

// 		if( typeof data.user_id != 'undefined' ){ 
// 			n_userid = data.user_id 
// 		}
// 		if( typeof data.holding_from != 'undefined' ){ 
// 			n_holding_from = data.holding_from 
// 		}
// 		if( typeof data.holding_till != 'undefined' ){ 
// 			n_holding_till = data.holding_till 
// 		}
// 		if( typeof data.holding_amount != 'undefined' ){ 
// 			n_holding_amount = data.holding_amount 
// 		}
// 		if( typeof data.reason != 'undefined' ){ 
// 			n_holding_reason = data.reason 
// 		}

// 		if( n_userid === "" ){ return Promise.reject('User Id is empty') }
// 		if( n_holding_from === ""){ return Promise.reject('Holding from date is empty') }
// 		if( n_holding_till === ""){ return Promise.reject('Holding till date is empty') }
// 		if( n_holding_amount === ""){ return Promise.reject('Holding amount is empty') }
// 		if( n_holding_reason === ""){ return Promise.reject('Reason is empty') }


// 		return new Promise(( resolve, reject ) => {
// 			dispatch( show_loading() ); // show loading icon
// 			async_add_user_new_holding(  n_userid, n_holding_from, n_holding_till, n_holding_amount, n_holding_reason ).then(
// 				( json ) => {
// 					dispatch( hide_loading() ) // hide loading icon
// 					if( json.error.length == 0 ){
// 		        		dispatch( success_add_user_holding( json.data ) )
// 		        		dispatch( get_user_salary_details( n_userid ) )
// 		          	}else{
// 		          		dispatch( error_add_user_holding( json.error[0] ) )
// 		          	}
// 				},
// 				( error ) =>{
// 					dispatch( hide_loading() ) // hide loading icon
// 					dispatch( error_add_user_holding( 'error occurs'  ) )
// 				}
// 			)
// 		})
// 	}
// }





