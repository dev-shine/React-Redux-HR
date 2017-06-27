import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button, ButtonRaised } from 'components/generic/buttons/';

export default class AddRolesForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen () {
    this.setState({
      open: true,
      name: '',
      description: ''
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  render () {
    return (
      <div>
        <Button className="btn-fw info" onClick={this.handleOpen} label="Add New Role" />
        <Dialog
          title="Add Role"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '40%', maxWidth: 'none'}}
          autoScrollBodyContent>
          <TextField
            floatingLabelText="Name"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({name: e.target.value}))}
            value={this.state.name}
          />
          <TextField
            floatingLabelText="Description"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({description: e.target.value}))}
            value={this.state.description}
          />
          <br />
          <ButtonRaised className="col-md-12 m-b-sm indigo" onClick={() => { this.props.callAddNewRole(this.state); this.handleClose(); }} label={'Submit New Role'} />
        </Dialog>
      </div>
    );
  }
}

AddRolesForm.PropTypes = {
  callAddNewRole: PropTypes.func.isRequired
};
