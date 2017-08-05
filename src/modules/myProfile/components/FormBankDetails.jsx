import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import 'react-date-picker/index.css';
import {ButtonRaised} from 'components/generic/buttons/index';

class FormBankDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id:         '',
      bank_account_no: '',
      bank_name:       '',
      bank_address:    '',
      ifsc:            ''
    };
  }
  componentWillReceiveProps (props) {
    if (!_.isEmpty(props.user_bank_detail)) {
      this.setState({
        bank_account_no: props.user_bank_detail.bank_account_no,
        bank_name:       props.user_bank_detail.bank_name,
        bank_address:    props.user_bank_detail.bank_address,
        ifsc:            props.user_bank_detail.ifsc
      });
    }
  }
  render () {
    return (
      <div className="col-sm-6 p-a m-b-md">
        <h6 className="text-center">Bank Details</h6>
        <div className="form-group">
          <label>Bank Account Number</label>
          <input type="text"
            className="form-control"
            ref="bank_account_no"
            onChange={(e) => this.setState({bank_account_no: e.target.value})}
            value={this.state.bank_account_no} />
        </div>
        <div className="form-group">
          <label>Bank Name</label>
          <input type="text"
            className="form-control"
            ref="bank_name"
            onChange={(e) => this.setState({bank_name: e.target.value})}
            value={this.state.bank_name} />
        </div>
        <div className="form-group">
          <label>Bank Address</label>
          <input type="text"
            className="form-control"
            ref="bank_address"
            onChange={(e) => this.setState({bank_address: e.target.value})}
            value={this.state.bank_address} />
        </div>
        <div className="form-group">
          <label>IFSC Code</label>
          <input type="text"
            className="form-control"
            ref="ifsc" onChange={(e) => this.setState({ifsc: e.target.value})}
            value={this.state.ifsc} />
        </div>
        <ButtonRaised className="col-xs-12 indigo" onClick={() => this.props.callUpdateBankDetails(this.state)} label="Update Bank Details" />
      </div>
    );
  }
}

FormBankDetails.PropTypes = {
  bank_account_no: PropTypes.number,
  bank_name:       PropTypes.string,
  bank_address:    PropTypes.string,
  ifsc:            PropTypes.string
};

export default FormBankDetails;
