import React from 'react';
import PropTypes from 'prop-types';
import {ButtonRaised} from 'components/generic/buttons/';

class FormClientDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      client_id: '',
      client_name: '',
      client_address: ''
    };
  }
  componentWillReceiveProps (props) {
    this.setState({
      client_id: props.clientId,
      client_name: props.clientName,
      client_address: props.clientAddress
    });
  }
  render () {
    return (
      <div>
        <h6 className="text-center">Client Details</h6>
        <br />
        <div className="form-group">
          <label>Client Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.client_name}
            onChange={(e) => this.setState({ client_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Client Address</label>
          <textarea
            className="form-control"
            rows="4"
            onChange={(e) => this.setState({ client_address: e.target.value })}
            value={this.state.client_address}
          />
        </div>
        <div className="form-group">
          <ButtonRaised
            className="col-md-12 m-b-sm indigo"
            onClick={() => this.props.callUpdateClientDetails(this.state)}
            label="Update Details"
          />
        </div>
      </div>
    );
  }
}

FormClientDetails.PropTypes = {
  client_id: PropTypes.string.isRequired,
  client_name: PropTypes.string.isRequired,
  client_address: PropTypes.string.isRequired,
  selectedClientId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  clientAddress: PropTypes.string.isRequired
};

export default FormClientDetails;
