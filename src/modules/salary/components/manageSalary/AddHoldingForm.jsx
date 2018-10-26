import React from 'react';
import * as _ from 'lodash';
import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';
import { ButtonRaised } from 'components/generic/buttons';

class AddHoldingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      holding_from: '',
      holding_till: '',
      holding_amount: '',
      reason: ''
    };
    this.handleHoldingFrom = this.handleHoldingFrom.bind(this);
    this.handleHoldingTill = this.handleHoldingTill.bind(this);
  }
  handleHoldingFrom(date) {
    this.setState({
      holding_from: date
    });
  }
  handleHoldingTill(date) {
    this.setState({
      holding_till: date
    });
  }
  componentWillReceiveProps(props) {
    let holding_from = '';
    let holding_till = '';
    let holding_amount = '';
    let reason = '';
    this.setState({
      user_id: props.userid,
      holding_from: holding_from,
      holding_till: holding_till,
      holding_amount: holding_amount,
      reason: reason
    });
  }

  render() {
    let styles = _.cloneDeep(this.constructor.styles);
    let date = this.state.applicable_from;
    return (
      <div className="row salary-blocks-margin salary-row-bg">
        <div className="col-md-3">
          <div className="salary-title">Holding From : </div>
          <DateField dateFormat="YYYY-MM-DD" onChange={this.handleHoldingFrom} className="form-control date-field date-holding-field" />
        </div>
        <div className="col-md-3">
          <div className="salary-title">Holding Till : </div>
          <DateField dateFormat="YYYY-MM-DD" onChange={this.handleHoldingTill} className="form-control date-field date-holding-field" />
        </div>
        <div className="col-md-2">
          <div className="salary-title">Holding Amount : </div>
          <span>
            <input type="text" className="form-control" ref="holding_amount" onChange={() => this.setState({ holding_amount: this.refs.holding_amount.value })} value={this.state.holding_amount} />
          </span>
        </div>
        <div className="col-md-3">
          <div className="salary-title">Reason : </div>
          <span>
            <input type="text" className="form-control" ref="reason" onChange={() => this.setState({ reason: this.refs.reason.value })} value={this.state.reason} />
          </span>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-1 text-center">
          <i className="material-icons add-icon" onClick={() => this.props.callAddUserHolding(this.state)}>
            add_circle_outline
              </i>
          </div>
      </div>
    );
  }
}

AddHoldingForm.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
};

export default AddHoldingForm;
