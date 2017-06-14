import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Button } from 'components/generic/buttons/';

export default class AddRolesForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }
  handleSubmit(){
    console.log(this.state, 'state');
  }
  render(){
    return(
      <div>
        <h3>Add Roles</h3>
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
        <br />
        <Button className="btn-fw btn-success" onClick={() => { this.handleSubmit(); }} label="Submit" />
      </div>
    );
  }
}
