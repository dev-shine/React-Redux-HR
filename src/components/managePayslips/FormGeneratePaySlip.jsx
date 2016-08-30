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
        net_salary : ""
      }

      this.handleApplicableFrom = this.handleApplicableFrom.bind( this )
      this.handleApplicableTill = this.handleApplicableTill.bind( this )
    }
    handleApplicableFrom(date){
      this.setState({
        applicable_from : date
      })
    }
    handleApplicableTill(date){
      this.setState({
        applicable_till : date
      })
    }
    
    componentWillReceiveProps( props ){
      let user_id = ""
      let year = ""
      let month = ""
      let name = ""
      let designation = ""
      let joining_date = ""
      let total_working_days = ""
      let days_present = ""
      let paid_leaves = ""
      let unpaid_leaves = ""
      let total_leave_taken = ""
      let allocated_leaves = ""
      let leave_balance = ""
      let final_leave_balance = ""
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

          if( typeof d.total_leave_taken != 'undefined' ){
            total_leave_taken = d.total_leave_taken
          }
          if( typeof d.leave_balance != 'undefined' ){
            leave_balance = d.leave_balance
          }
          if( typeof d.paid_leaves != 'undefined' ){
            paid_leaves = d.paid_leaves
          }
          if( typeof d.final_leave_balance != 'undefined' ){
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
        <div className="row no-gutter">

          <div className="row no-gutter">
            
            <div className="col-xs-6 p-r">
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Year</div>
                <div className="col-xs-6 p-r">

                  <select ref="year" value={this.state.year} onChange={ (e) => this.setState({ year : this.refs.year.value }) }>
                    <option value=''>--Select Year--</option>
                    <option value='2016'>2016</option>
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2021</option>
                  </select>
                  
                </div>
              </div>
              
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Employee Name</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.name}
                    ref="name" 
                    onChange={ () => this.setState({ name : this.refs.name.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Designation</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.designation}
                    ref="designation" 
                    onChange={ () => this.setState({ designation : this.refs.designation.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Total Working Days</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.total_working_days}
                    ref="total_working_days" 
                    onChange={ () => this.setState({ total_working_days : this.refs.total_working_days.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Paid Leave Taken</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.paid_leaves}
                    ref="paid_leaves" 
                    onChange={ () => this.setState({ paid_leaves : this.refs.paid_leaves.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Total Leave Taken</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.total_leave_taken}
                    ref="total_leave_taken" 
                    onChange={ () => this.setState({ total_leave_taken : this.refs.total_leave_taken.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Previous Leave Balance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.leave_balance}
                    ref="leave_balance" 
                    onChange={ () => this.setState({ leave_balance : this.refs.leave_balance.value }) }
                  />
                </div>
              </div>
            </div>


            <div className="col-xs-6 p-r">

              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Month</div>
                <div className="col-xs-6 p-r">

                  <select ref="month" value={this.state.month} onChange={ (e) => this.setState({ month : this.refs.month.value }) }>
                    <option value=''>--Select Month--</option>
                    <option value='01'>Janaury</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>
                </div>
              </div>


              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Joining Date</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.joining_date}
                    ref="joining_date" 
                    onChange={ () => this.setState({ joining_date : this.refs.joining_date.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Days Present</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.days_present}
                    ref="days_present" 
                    onChange={ () => this.setState({ days_present : this.refs.days_present.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Leave Without Pay</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.unpaid_leaves}
                    ref="unpaid_leaves" 
                    onChange={ () => this.setState({ unpaid_leaves : this.refs.unpaid_leaves.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Leave Accumulated</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.allocated_leaves}
                    ref="allocated_leaves" 
                    onChange={ () => this.setState({ allocated_leaves : this.refs.allocated_leaves.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Final Leave Balance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.final_leave_balance}
                    ref="final_leave_balance" 
                    onChange={ () => this.setState({ final_leave_balance : this.refs.final_leave_balance.value }) }
                  />
                </div>
              </div>
            </div>
          </div>
          
          <br/>

          <div className="row no-gutter">
            
            <div className="col-xs-6 p-r">
              <h6 className="text-center">Earnings</h6>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Basic</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.basic}
                    ref="basic" 
                    onChange={ () => this.setState({ basic : this.refs.basic.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">HRA</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.hra}
                    ref="hra" 
                    onChange={ () => this.setState({ hra : this.refs.hra.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Conveyance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.conveyance}
                    ref="conveyance" 
                    onChange={ () => this.setState({ conveyance : this.refs.conveyance.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Medical Allowance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.medical_allowance}
                    ref="medical_allowance" 
                    onChange={ () => this.setState({ medical_allowance : this.refs.medical_allowance.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Special Allowance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.special_allowance}
                    ref="special_allowance" 
                    onChange={ () => this.setState({ special_allowance : this.refs.special_allowance.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Arrears</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.arrear}
                    ref="arrear" 
                    onChange={ () => this.setState({ arrear : this.refs.arrear.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Bonus</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.bonus}
                    ref="bonus" 
                    onChange={ () => this.setState({ bonus : this.refs.bonus.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Total Earnings</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.total_earning}
                    ref="total_earning" 
                    onChange={ () => this.setState({ total_earning : this.refs.total_earning.value }) }
                  />
                </div>
              </div>
            </div>


            <div className="col-xs-6 p-r">
              <h6 className="text-center">Deductions</h6>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">EPF</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.epf}
                    ref="epf" 
                    onChange={ () => this.setState({ epf : this.refs.epf.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Loan</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.loan}
                    ref="loan" 
                    onChange={ () => this.setState({ loan : this.refs.loan.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Advance</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.advance}
                    ref="advance" 
                    onChange={ () => this.setState({ advance : this.refs.advance.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">TDS</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.tds}
                    ref="tds" 
                    onChange={ () => this.setState({ tds : this.refs.tds.value }) }
                  />
                </div>
              </div>
              <div className="row no-gutter p-t">
                <div className="col-xs-6 p-r">Total Deductions</div>
                <div className="col-xs-6 p-r">
                  <input
                    type="text"
                    value={this.state.total_deduction}
                    ref="total_deduction" 
                    onChange={ () => this.setState({ total_deduction : this.refs.total_deduction.value }) }
                  />
                </div>
              </div>
            </div>


          </div>


          

          <div className="row no-gutter  p-t">
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


