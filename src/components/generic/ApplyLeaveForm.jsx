import React, {Component} from 'react';
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'

import {Calendar} from 'react-date-range';

class ApplyLeaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_from_date: '',
      form_to_date: '',
      form_no_of_days: '',
      form_reason: '',
      show_half_day_button: ''
    }
    this.doApplyLeave = this.doApplyLeave.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this._apply_half_day = this._apply_half_day.bind(this)

  }
  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.form_from_date != '' && this.state.form_to_date != '' && this.state.form_no_of_days == '') {
      this.props.onDaysBetweenLeaves(this.state.form_from_date, this.state.form_to_date)
    }

  }

  _apply_half_day() {
    this.setState({form_no_of_days: "0.5"})
  }

  handleStartDate(date) {

    let startDate = date.format('YYYY-MM-DD')
    this.setState({form_from_date: startDate, form_no_of_days: ""})

  }
  handleEndDate(date) {

    let endDate = date.format('YYYY-MM-DD')
    this.setState({form_to_date: endDate, form_no_of_days: ""})

  }

  doApplyLeave(evt) {
    evt.preventDefault();
    if (this.props.forAdmin == true) {
      this.props.doApplyLeave(this.state.form_from_date, this.state.form_to_date, this.state.form_no_of_days, this.state.form_reason, this.props.selectedUserId)
      this.setState({form_from_date: '', form_to_date: '', form_no_of_days: '', form_reason: '', show_half_day_button: ''});
      notify(data);
    } else {
      this.props.doApplyLeave(this.state.form_from_date, this.state.form_to_date, this.state.form_no_of_days, this.state.form_reason, "")

    }
  }
  componentWillReceiveProps(props) {

    let num_working_days = "0"
    if (props.applyLeave.count_working_days != '' && props.applyLeave.count_working_days != 0) {
      num_working_days = props.applyLeave.count_working_days
    }

    this.setState({form_from_date: props.applyLeave.start_date, form_to_date: props.applyLeave.end_date, form_no_of_days: num_working_days})
  }
  render() {

    let apply_half_day_button = ""
    if (this.state.form_no_of_days == 1) {
      apply_half_day_button = <button className="md-btn md-flat text-accent" onClick= { () => this._apply_half_day() }>Apply Half Day</button>
    }

    return (

      <div className="row">
        <div className="col-sm-4 text-center">
          <h6>Select Start Date</h6>
          <Calendar onChange={this.handleStartDate}/>
        </div>

        <div className="col-sm-4 text-center">
          <h6>Select End Date</h6>
          <Calendar onChange={this.handleEndDate}/>
        </div>

        <div className="col-sm-4">

          <h5>Leave Summary</h5>
          <br/>

          <form role="form" onSubmit={this.doApplyLeave}>

            <div className="box-body">
              <div className="streamline b-l m-l">
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave starts from</div>
                    <div>
                      {this.state.form_from_date}
                    </div>
                  </div>
                </div>
                <div className="sl-item b-info">
                  <div className="sl-content">
                    <div className="sl-date text-muted">No. of days</div>
                    <div>
                      {this.state.form_no_of_days}
                      {apply_half_day_button}
                    </div>
                  </div>
                </div>

                <div className="sl-item b-warning">
                  <div className="sl-content">
                    <div className="sl-date text-muted">Reason</div>
                    <div><input type="text" ref="reason" onChange={() => this.setState({form_reason: this.refs.reason.value})} value={this.state.form_reason}/></div>
                  </div>
                </div>
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check red"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave ends on</div>
                    <div>
                      {this.state.form_to_date}
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
ApplyLeaveForm.propTypes = {
  doApplyLeave: React.PropTypes.func.isRequired,
  applyLeave: React.PropTypes.shape({start_date: React.PropTypes.String, end_date: React.PropTypes.String})
};
export default ApplyLeaveForm
