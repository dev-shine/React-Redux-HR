import React,{ Component } from 'react';
import { connect } from 'react-redux'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'



import { DateRange } from 'react-date-range';

class ApplyLeaveForm extends React.Component {
    constructor( props ){
      super( props );
        this.state = {
            form_from_date : '',
            form_to_date : '',
            form_no_of_days : '',
            form_reason : '',
        }
        this.doApplyLeave = this.doApplyLeave.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    componentDidMount(){
      
    }
    handleSelect(date){
      let fromDate = date.startDate
      let toDate = date.endDate

      let startDate = fromDate.format('YYYY-MM-DD')
      let endDate = toDate.format('YYYY-MM-DD')

      let daysDiff = toDate.diff(fromDate, 'days')
      daysDiff = daysDiff + 1

      this.setState({
        form_from_date : startDate,
        form_to_date : endDate
      })


      this.props.onDaysBetweenLeaves( startDate, endDate )



    }
 

    doApplyLeave( evt ){
      evt.preventDefault();
        this.props.onApplyLeave( this.state.form_from_date, this.state.form_to_date, this.state.form_no_of_days, this.state.form_reason ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    componentWillReceiveProps( props ){

      this.setState({
          form_from_date : props.applyLeave.start_date,
          form_to_date : props.applyLeave.end_date,
          form_reason : '',
          form_no_of_days : props.applyLeave.count_working_days
      }) 
    }
    render(){
      return (

          <div className="row">
            <div className="col-sm-5">
              <h5>Enter leave reason</h5>
              <input type="text" className="form-control" ref="reason" onChange={ () => this.setState({ form_reason : this.refs.reason.value }) } value={ this.state.form_reason } />
              <br/>
              <h5>Select Dates</h5>
              <DateRange onInit={this.handleSelect} onChange={this.handleSelect} format="Y-m-d" />
            </div>
            <div className="col-sm-5 pull-right">
           
            <h5>Your Leave Summary</h5>
            <br/>

        <form role="form"  onSubmit={this.doApplyLeave}>


          <div className="box-body">
            <div className="streamline b-l m-l">
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave starts from</div>
                    <div>
                      { this.state.form_from_date }
                    </div>
                  </div>
                </div>
                <div className="sl-item b-info">
                  <div className="sl-content">
                    <div className="sl-date text-muted">No. of days</div>
                    <div>
                      { this.state.form_no_of_days }
                    </div>
                  </div>
                </div>

                <div className="sl-item b-warning">
                  <div className="sl-content">
                    <div className="sl-date text-muted">Reason</div>
                    <div>{ this.state.form_reason }</div>
                  </div>
                </div>
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check red"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave ends on</div>
                    <div>
                        { this.state.form_to_date }
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
        
<div className="form-group row m-t-md">
              <div className="col-sm-10">
                <button type="submit" className="btn green">Apply</button>
              </div>
            </div>
          </form>  


           </div>
          </div>

      )
    }
}

export default ApplyLeaveForm





