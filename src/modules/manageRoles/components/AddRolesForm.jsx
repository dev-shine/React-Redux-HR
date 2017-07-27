import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {Button, ButtonRaised} from 'components/generic/buttons/';

export default class AddRolesForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open:        false,
      baseRoleId:  '',
      name:        '',
      description: '',
      error:       {baseRoleId: '', name: '', description: ''}
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen () {
    this.setState({
      open:        true,
      baseRoleId:  '',
      name:        '',
      description: ''
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  handleSubmit () {
    let {baseRoleId, name, description} = this.state;
    let error = {baseRoleId: '', name: '', description: ''};
    let valid = true;
    if (_.isEmpty(name)) {
      valid = false;
      error.name = 'This field is required.';
    }
    if (_.isEmpty(description)) {
      valid = false;
      error.description = 'This field is required.';
    }
    this.setState({error});
    if (valid) {
      this.props.callAddNewRole({baseRoleId, name, description});
      this.handleClose();
    }
  }
  render () {
    let optionMenu = _.map(this.props.displayData.roles, (name, index) => (
      <option key={index} value={name.id} >{name.name}</option>
    ));
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
          <select onChange={(e) => { this.setState({baseRoleId: e.target.value}); }} className="form-control m-t-md">
            <option value=""> Select Base Role </option>
            {optionMenu}
          </select>
          <TextField
            floatingLabelText="Name"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({name: e.target.value}))}
            value={this.state.name}
            errorText={this.state.error.name}
          />
          <TextField
            floatingLabelText="Description"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({description: e.target.value}))}
            value={this.state.description}
            errorText={this.state.error.description}
          />
          <ButtonRaised className="col-md-12 m-y-sm indigo" onClick={() => this.handleSubmit()} label={'Submit New Role'} />
        </Dialog>
      </div>
    );
  }
}

AddRolesForm.PropTypes = {
  displayData: PropTypes.shape({
    roles: PropTypes.Array
  }).isRequired,
  callAddNewRole: PropTypes.func.isRequired
};
