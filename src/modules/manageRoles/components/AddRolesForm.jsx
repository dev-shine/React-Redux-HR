import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {Button, ButtonRaised} from '../../../components/generic/buttons/';

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
    let optionMenu = _.map(this.props.displayData.roles, (role, index) => (
      <div id={`${role.name}_list`} key={index}>
        <MenuItem key={index} value={role.id} primaryText={role.name} />
      </div>
    ));
    return (
      <div className="col-sm-12 p-y" id="role_button">
        <Button className="btn-fw info" id="add_role" onClick={this.handleOpen} label="Add New Role" />
        <Dialog
          id="add_role_dialog"
          title="Add Role"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentClassName="dialog-add-role"
          autoScrollBodyContent><br />
          <SelectField fullWidth id="role_selector" value={this.state.baseRoleId} onChange={(event, index, value) => { this.setState({baseRoleId: value}); }}>
            <MenuItem value={''} primaryText=" Select Base Role " />
            <div id="role_list">
              {optionMenu}
            </div>
          </SelectField>
          <TextField
            id="role_name"
            floatingLabelText="Name"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({name: e.target.value}))}
            value={this.state.name}
            errorText={this.state.error.name}
          />
          <TextField
            id="role_desc"
            floatingLabelText="Description"
            floatingLabelFixed fullWidth
            onChange={(e) => (this.setState({description: e.target.value}))}
            value={this.state.description}
            errorText={this.state.error.description}
          />
          <ButtonRaised className="col-md-12 m-y-sm indigo" id="role_submit_button" onClick={() => this.handleSubmit()} label={'Submit New Role'} />
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
