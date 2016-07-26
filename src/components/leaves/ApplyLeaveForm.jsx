import React from 'react';
import { connect } from 'react-redux'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'

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
    }
    componentDidMount(){
      
    }
    doApplyLeave( evt ){
        evt.preventDefault();
        let from_date = $('#date-range200').val()
        let to_date = $('#date-range201').val()

        this.props.onApplyLeave( from_date, to_date, this.state.form_no_of_days, this.state.form_reason ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    componentWillReceiveProps( props ){
      this.setState({
          form_from_date : '',
          form_to_date : '',
          form_no_of_days : '',
          form_reason : '',
      }) 
    }
    render(){
      return (
        <form role="form"  onSubmit={this.doApplyLeave}>

            <span id="two-inputs">

              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">From  ( eg. 2016-07-27 )</label>
                <div className="col-sm-10">
                  <input type="text" id="date-range200" className="timepickerInput form-control" ref="from_date"  onChange={ () => this.setState({ form_from_date : this.refs.from_date.value }) } value={ this.state.form_from_date } />
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">To ( eg. 2016-07-27 )</label>
                <div className="col-sm-10">
                  <input type="text" id="date-range201" className="form-control" ref="to_date" onChange={ () => this.setState({ form_to_date : this.refs.to_date.value }) } value={ this.state.form_to_date } />
                </div>
              </div>

              </span>



              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">No. of days</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref="no_of_days" onChange={ () => this.setState({ form_no_of_days : this.refs.no_of_days.value }) } value={ this.state.form_no_of_days } />
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">Reason</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref="reason" onChange={ () => this.setState({ form_reason : this.refs.reason.value }) } value={ this.state.form_reason } />
                </div>
              </div>

            <div className="form-group row m-t-md">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn green">Apply</button>
              </div>
            </div>
          </form>  
      )
    }
}

export default ApplyLeaveForm





