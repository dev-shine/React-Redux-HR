import React from 'react';
import * as _ from 'lodash'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'


class FormAddSalary extends React.Component {
    constructor( props ){
      super( props );
      this.state = {
        user_id : "",
        applicable_from : "",
        total_salary : "",
        leave : "",
        basic : "",
        hra : "",
        conveyance : "",
        medical_allowance : "",
        special_allowance : "",
        arrear : "",
        epf : 0,
        loan : 0,
        advance : 0,
        misc_deduction : 0,
        tds : 0,
      }
      this.handleDateChange = this.handleDateChange.bind( this )
    }

    handleDateChange(date){
      let selectedDate = date.format('YYYY-MM-DD')
      this.setState({
        date : selectedDate
      })
    }
    
    componentWillReceiveProps( props ){
      this.setState({
        user_id : props.userid
      })
    }
    
    render(){
      let styles = _.cloneDeep(this.constructor.styles);

      return (
        <div className="row no-gutter">
          
          <div className="row no-gutter">
            <div className="col-xs-12 p-r">
              <div className="form-group">
                <label>Applicable From</label>
                <DateField dateFormat="YYYY-MM-DD" onChange={this.handleDateChange} className="form-control"/>
              </div>
              <div className="form-group">
                <label>Total Salary</label>
                <input type="text" className="form-control" ref="total_salary" onChange={ () => this.setState({ total_salary : this.refs.total_salary.value }) } value={ this.state.total_salary }/>
              </div>
              <div className="form-group">
                <label>Leaves</label>
                <input type="text" className="form-control" ref="leave" onChange={ () => this.setState({ leave : this.refs.leave.value }) } value={ this.state.leave }/>
              </div>
            </div>
          </div>

          <div className="row no-gutter">
            
            <div className="col-xs-6 p-r">
              <h5 className="text-center">Earnings</h5>
              <div className="form-group">
                <label>Basic</label>
                <input type="text" className="form-control" ref="basic" onChange={ () => this.setState({ basic : this.refs.basic.value }) } value={ this.state.basic }/>
              </div>
              <div className="form-group">
                <label>HRA</label>
                <input type="text" className="form-control" ref="hra" onChange={ () => this.setState({ hra : this.refs.hra.value }) } value={ this.state.hra }/>
              </div>
              <div className="form-group">
                <label>Conveyance</label>
                <input type="text" className="form-control" ref="conveyance" onChange={ () => this.setState({ conveyance : this.refs.conveyance.value }) } value={ this.state.conveyance }/>
              </div>
              <div className="form-group">
                <label>Medical Allowance</label>
                <input type="text" className="form-control" ref="medical_allowance" onChange={ () => this.setState({ medical_allowance : this.refs.medical_allowance.value }) } value={ this.state.medical_allowance }/>
              </div>
              <div className="form-group">
                <label>Special Allowance</label>
                <input type="text" className="form-control" ref="special_allowance" onChange={ () => this.setState({ special_allowance : this.refs.special_allowance.value }) } value={ this.state.special_allowance }/>
              </div>
              <div className="form-group">
                <label>Arrears</label>
                <input type="text" className="form-control" ref="arrear" onChange={ () => this.setState({ arrear : this.refs.arrear.value }) } value={ this.state.arrear }/>
              </div>
            </div>
            
            <div className="col-xs-6 p-r">
              <h5 className="text-center">Deductions</h5>
                <div className="form-group">
                  <label>EPF</label>
                  <input type="text" className="form-control" ref="epf" onChange={ () => this.setState({ epf : this.refs.epf.value }) } value={ this.state.epf }/>
                </div>
                <div className="form-group">
                  <label>Loan</label>
                  <input type="text" className="form-control" ref="loan" onChange={ () => this.setState({ loan : this.refs.loan.value }) } value={ this.state.loan }/>
                </div>
                <div className="form-group">
                  <label>Advance</label>
                  <input type="text" className="form-control" ref="advance" onChange={ () => this.setState({ advance : this.refs.advance.value }) } value={ this.state.advance }/>
                </div>
                <div className="form-group">
                  <label>Misc Deductions</label>
                  <input type="text" className="form-control" ref="misc_deduction" onChange={ () => this.setState({ misc_deduction : this.refs.misc_deduction.value }) } value={ this.state.misc_deduction }/>
                </div>
                <div className="form-group">
                  <label>TDS</label>
                  <input type="text" className="form-control" ref="tds" onChange={ () => this.setState({ tds : this.refs.tds.value }) } value={ this.state.tds }/>
                </div>
            </div>
          </div>

          <div className="row no-gutter">
            <div className="col-xs-12 p-r">
              <button  className="col-xs-12 md-btn md-raised indigo" onClick={ () => this.props.onAddNewSalary( this.state ) } >Add</button>
            </div>
          </div>
        </div>
      )
    }
}

FormAddSalary.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default FormAddSalary


