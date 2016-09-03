import React from 'react';
import * as _ from 'lodash'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

class FormGeneratePaySlip extends React.Component {
    constructor( props ){
      super( props );
      this.state = {
        user_id : "",
        year : "",
        month : "",
        month_name : "",
        name : "",
        designation : "",
        joining_date : "",
        total_working_days : "",
        days_present : "",
        paid_leaves : "",
        unpaid_leaves : "",
        total_leave_taken : "",
        allocated_leaves : "",
        leave_balance : "",
        final_leave_balance : "",
        basic : "",
        epf : "",
        hra : "",
        loan : "",
        conveyance : "",
        advance : "",
        medical_allowance : "",
        misc_deduction : "",
        special_allowance : "",
        tds : "",
        arrear : "",
        bonus : "",
        total_earning : "",
        total_deduction : "",
        net_salary : "",
      }
    }
    componentDidUpdate(){
      let e_basic = this.state.basic
      let e_hra = this.state.hra
      let e_conveyance = this.state.conveyance
      let e_medical_allowance = this.state.medical_allowance
      let e_special_allowance = this.state.special_allowance
      let e_arrear = this.state.arrear
      let e_bonus = this.state.bonus
      let n_total_earning = +e_basic + +e_hra + +e_conveyance + +e_medical_allowance + +e_special_allowance + +e_arrear + +e_bonus

      let e_epf = this.state.epf
      let e_loan = this.state.loan
      let e_advance = this.state.advance
      let e_misc_deduction = this.state.misc_deduction
      let e_tds = this.state.tds
      let n_total_deduction = +e_epf + +e_loan + +e_advance + +e_misc_deduction + +e_tds

      let n_net_salary = n_total_earning - n_total_deduction

      if( n_net_salary != this.state.net_salary ){
        this.setState({
          total_earning : n_total_earning,
          total_deduction : n_total_deduction,
          net_salary : n_net_salary
        })
      }
        
    }
    
    componentWillReceiveProps( props ){
      let user_id = ""
      let year = ""
      let month = ""
      let month_name = ""
      let name = ""
      let designation = ""
      let joining_date = ""
      let total_working_days = 0
      let days_present = 0
      let paid_leaves = 0
      let unpaid_leaves = 0
      let total_leave_taken = 0
      let allocated_leaves = 0
      let leave_balance = 0
      let final_leave_balance = 0
      let basic = 0
      let epf = 0
      let hra = 0
      let loan = 0
      let conveyance = 0
      let advance = 0
      let medical_allowance = 0
      let misc_deduction = 0
      let special_allowance = 0
      let tds = 0
      let arrear = 0
      let bonus = 0
      let total_earning = 0
      let total_deduction = 0
      let net_salary = 0

      if( typeof this.props.user_id != 'undefined' ){
        user_id = this.props.user_id
      }
      if( typeof this.props.name != 'undefined' ){
        name = this.props.name
      }
      if( typeof this.props.designation != 'undefined' ){
        designation = this.props.designation
      }

      if( typeof props.user_data_for_payslip != 'undefined' ){ 

        //---info
        if( typeof props.user_data_for_payslip != 'undefined' ){ 
          let d = props.user_data_for_payslip

          if( typeof d.year != 'undefined' ){
            year = d.year
          }

          if( typeof d.month != 'undefined' ){
            month = d.month
          }

          if( typeof d.month_name != 'undefined' ){
            month_name = d.month_name
          }

          if( typeof d.dateofjoining != 'undefined' ){
            joining_date = d.dateofjoining
          }
          if( typeof d.total_working_days != 'undefined' ){
            total_working_days = d.total_working_days
          }
          if( typeof d.paid_leaves != 'undefined' ){
            paid_leaves = d.paid_leaves
          }

          //total_leave_taken

          if( typeof d.total_leave_taken != 'undefined' &&  d.total_leave_taken != null ){
            total_leave_taken = d.total_leave_taken
          }
          if( typeof d.leave_balance != 'undefined' && d.leave_balance != null ){
            leave_balance = d.leave_balance
          }
          if( typeof d.paid_leaves != 'undefined' && d.paid_leaves != null){
            paid_leaves = d.paid_leaves
          }
          if( typeof d.final_leave_balance != 'undefined' && d.final_leave_balance != null ){
            final_leave_balance = d.final_leave_balance
          }
          

          if( typeof d.leaves_allocated != 'undefined' ){
            allocated_leaves = d.leaves_allocated
          }
          if( typeof d.unpaid_leaves != 'undefined' ){
            unpaid_leaves = d.unpaid_leaves
          }
          if( typeof d.days_present != 'undefined' ){
            days_present = d.days_present
          }
          if( typeof d.net_salary != 'undefined' ){
            net_salary = d.net_salary
          }
          if( typeof d.total_earning != 'undefined' ){
            total_earning = d.total_earning
          }
          if( typeof d.total_deduction != 'undefined' ){
            total_deduction = d.total_deduction
          }

        }        

        //---salary
        if( typeof props.user_data_for_payslip.salary_detail != 'undefined' ){ 
          let SalaryDetails = props.user_data_for_payslip.salary_detail

          
          if( typeof SalaryDetails.Basic != 'undefined' ){
            basic = SalaryDetails.Basic
          }
          if( typeof SalaryDetails.EPF != 'undefined' ){
            epf = SalaryDetails.EPF
          }
          if( typeof SalaryDetails.HRA != 'undefined' ){
            hra = SalaryDetails.HRA
          }
          if( typeof SalaryDetails.Loan != 'undefined' ){
            loan = SalaryDetails.Loan
          }
          if( typeof SalaryDetails.Conveyance != 'undefined' ){
            conveyance = SalaryDetails.Conveyance
          }
          if( typeof SalaryDetails.Advance != 'undefined' ){
            advance = SalaryDetails.Advance
          }
          if( typeof SalaryDetails.Medical_Allowance != 'undefined' ){
            medical_allowance = SalaryDetails.Medical_Allowance
          }
          if( typeof SalaryDetails.Misc_Deductions != 'undefined' ){
            misc_deduction = SalaryDetails.Misc_Deductions
          }
          if( typeof SalaryDetails.Special_Allowance != 'undefined' ){
            special_allowance = SalaryDetails.Special_Allowance
          }
          if( typeof SalaryDetails.TDS != 'undefined' ){
            tds = SalaryDetails.TDS
          }
          if( typeof SalaryDetails.Arrears != 'undefined' ){
            arrear = SalaryDetails.Arrears
          }
        }

      }

      this.setState({
        user_id : user_id,
        name : name,
        year : year,
        month : month,
        month_name : month_name,
        designation : designation,
        joining_date : joining_date,
        total_working_days : total_working_days,
        days_present : days_present,
        paid_leaves : paid_leaves,
        unpaid_leaves : unpaid_leaves,
        total_leave_taken : total_leave_taken,
        allocated_leaves : allocated_leaves,
        leave_balance : leave_balance,
        final_leave_balance : final_leave_balance,        
        basic : basic,
        epf : epf,
        hra : hra,
        loan : loan,
        conveyance : conveyance,
        advance : advance,
        medical_allowance : medical_allowance,
        misc_deduction : misc_deduction,
        special_allowance : special_allowance,
        tds : tds,
        arrear : arrear,
        bonus : bonus,
        total_earning : total_earning,
        total_deduction : total_deduction,
        net_salary : net_salary
      })
    }

    render(){
      let styles = _.cloneDeep(this.constructor.styles);

      let date = this.state.applicable_from

      return (
        <div>
          <div className="box">
            <table className="table">
          <tbody>
            <tr>
              <td>Year</td>
              <td>
                {this.state.year}
              </td>
              <td>Month</td>
              <td>  
                {this.state.month_name} ( {this.state.month} )
              </td>
            </tr>
            <tr>
              <td>Employee Name</td>
              <td>{this.state.name}</td>
              <td>Joining Date</td>
              <td>{this.state.joining_date}</td>
            </tr>
            <tr>
              <td>Designation</td>
              <td>{this.state.designation}</td>
              <td>Days Present</td>
              <td>{this.state.days_present}</td>
            </tr>
            <tr>
              <td>Total Working Days</td>
              <td>{this.state.total_working_days}</td>
              <td>Leave Without Pay</td>
              <td>{this.state.unpaid_leaves}</td>
            </tr>
            <tr>
              <td>Paid Leave Taken</td>
              <td>{this.state.paid_leaves}</td>
              <td>Leave Accumulated</td>
              <td>{this.state.allocated_leaves}</td>
            </tr>
            <tr>
              <td>Total Leave Taken</td>
              <td>{this.state.total_leave_taken}</td>
              <td>Final Leave Balance</td>
              <td>{this.state.final_leave_balance}</td>
            </tr>
            <tr>
              <td>Previous Leave Balance</td>
              <td>{this.state.leave_balance}</td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td className="text-center"><b><u>Earnings</u></b></td>
              <td></td>
              <td className="text-center"><b><u>Deductions</u></b></td>
              <td></td>
            </tr>

         
            <tr>
              <td>Basic</td>
              <td>{this.state.basic}</td>
              <td>EPF</td>
              <td>{this.state.epf}</td>
            </tr>
            <tr>
              <td>HRA</td>
              <td>{this.state.hra}</td>
              <td>Loan</td>
              <td>{this.state.loan}</td>
            </tr>
            
            <tr>
              <td>Conveyance</td>
              <td>{this.state.conveyance}</td>
              <td>Advance</td>
              <td>{this.state.advance}</td>
            </tr>
            <tr>
              <td>Medical Allowance</td>
              <td>{this.state.medical_allowance}</td>
              <td>Misc Deductions</td>
              <td>
                <input
                    className="col-md-6"
                    type="text"
                    value={this.state.misc_deduction}
                    ref="misc_deduction" 
                    onChange={ () => this.setState({ misc_deduction : this.refs.misc_deduction.value }) }
                  />
              </td>
            </tr>
            <tr>
              <td>Special Allowance</td>
              <td>{this.state.special_allowance}</td>
              <td>TDS</td>
              <td>{this.state.tds}</td>
            </tr>
            <tr>
              <td>Arrears</td>
              <td>{this.state.arrear}</td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Bonus</td>
              <td>
                <input
                    className="col-md-6"
                    type="text"
                    value={this.state.bonus}
                    ref="bonus" 
                    onChange={ () => this.setState({ bonus : this.refs.bonus.value }) }
                  />
              </td>
              <td></td>
              <td></td>
            </tr>



            <tr>
              <td><h5>Total Earnings</h5></td>
              <td><h5>{this.state.total_earning}</h5></td>
              <td><h5>Total Deductions</h5></td>
              <td>{this.state.total_deduction}</td>
            </tr>


             <tr>
              <td><h3>Net Salary</h3></td>
              <td><h3>{this.state.net_salary}</h3></td>
              <td></td>
              <td></td>
            </tr>

          </tbody>
        </table>















      </div>



          
          <br/>

         
          

          <div className="row  p-t">
            <div className="col-xs-12 p-r">
              <button className="col-xs-12 md-btn md-raised indigo" onClick={ () => this.props.callCreateUserPayslip( this.state ) } >Create Payslip</button>
            </div>
          </div>
        </div>
      )
    }
}

FormGeneratePaySlip.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default FormGeneratePaySlip


