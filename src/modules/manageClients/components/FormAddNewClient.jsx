import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {ButtonInfo} from 'components/generic/buttons/';

class FormAddNewClient extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      client_name: '',
      client_address: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addNewClient = this.addNewClient.bind(this);
  }
  handleOpen () {
    this.setState({
      open: true,
      client_name: '',
      client_address: ''
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  addNewClient () {
    this.props.callAddNewClient({
      client_name: this.state.client_name,
      client_address: this.state.client_address
    });
    this.handleClose();
  }
  render () {
    return (
      <div>
        <ButtonInfo className="btn-fw" onClick={this.handleOpen} label="Add Client" />
        <Dialog title="Add New Client" modal={false} open={this.state.open} onRequestClose={this.handleClose} >
          <TextField
            floatingLabelText="Name"
            floatingLabelFixed
            fullWidth
            onChange={(e) => (this.setState({ client_name: e.target.value }))}
            value={this.state.client_name}
          />
          <TextField
            multiLine
            floatingLabelText="Address"
            floatingLabelFixed
            fullWidth
            onChange={(e) => (this.setState({ client_address: e.target.value }))}
            value={this.state.client_address}
          />
          <br />
          <br />
          <ButtonInfo className="col-md-12 m-b-sm indigo" onClick={this.addNewClient} label="ADD" />
        </Dialog>
      </div>
    );
  }
}

export default FormAddNewClient;

FormAddNewClient.PropTypes = {
  open: PropTypes.string.isRequired,
  client_name: PropTypes.string.isRequired,
  client_address: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  addNewClient: PropTypes.func.isRequired,
  callAddNewClient: PropTypes.func.isRequired
};
