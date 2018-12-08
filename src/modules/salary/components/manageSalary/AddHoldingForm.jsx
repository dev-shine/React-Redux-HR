import React from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import DateField from 'react-date-picker';
import { ButtonRaised } from '../../../../components/generic/buttons';

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
  }
  handleHoldingFrom(date) {
    this.setState({
      holding_from: date
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

  addHolding = () =>{
    let dataObject = _.cloneDeep(this.state);
    dataObject.holding_from = moment(dataObject.holding_from).format('YYYY-MM-DD');
    this.props.callAddUserHolding(dataObject)
  }
  render() {
    let styles = _.cloneDeep(this.constructor.styles);
    let date = this.state.applicable_from;
    let opt = [];
    for (var i = 1; i <= 24; i++) {
      opt.push(<option key={i} value={i}>{i} months</option>)
    }
    return (
      <div className="row salary-blocks-margin salary-row-bg">
        <div className="col-sm-3">
          <div className="salary-title">Holding From : </div>
          <DateField dateFormat="YYYY-MM-DD" onChange={this.handleHoldingFrom} className="form-control date-field date-holding-field" value={this.state.holding_from}/>
        </div>
        <div className="col-sm-3">
          <span className="salary-title">Applicable Months : </span>
          <select className="form-control" value={this.state.holding_till} onChange={(e) => this.setState({ holding_till: e.target.value })}>
            <option value="">Select Month</option>
            {opt}
          </select>
        </div>
        <div className="col-sm-2">
          <div className="salary-title">Holding Amount : </div>
          <span>
            <input type="text" className="form-control" ref="holding_amount" onChange={() => this.setState({ holding_amount: this.refs.holding_amount.value })} value={this.state.holding_amount} />
          </span>
        </div>
        <div className="col-sm-3">
          <div className="salary-title">Reason : </div>
          <span>
            <input type="text" className="form-control" ref="reason" onChange={() => this.setState({ reason: this.refs.reason.value })} value={this.state.reason} />
          </span>
        </div>
        <div className="col-sm-1 text-center">
          <i className="material-icons add-icon" onClick={() => this.addHolding()}>
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
