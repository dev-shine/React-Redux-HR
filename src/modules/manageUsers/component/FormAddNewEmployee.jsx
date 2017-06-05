import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import Button from 'components/generic/buttons/Button';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';

class FormAddNewEmployee extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      dateofjoining: '',
      name: '',
      jobtitle: '',
      gender: '',
      dob: '',
      username: '',
      training_month: '',
      workemail: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen () {
    this.setState({
      open: true,
      dateofjoining: '',
      name: '',
      jobtitle: '',
      gender: '',
      dob: '',
      training_month: '',
      username: '',
      workemail: ''
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  render () {
    return (
      <div>
        <Button className="btn-fw info" onClick={this.handleOpen} label="Add New Employee" />
        <Dialog
          title="Add New Employee"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{
            width: '70%',
            maxWidth: 'none'
          }}
          autoScrollBodyContent>
          <div className="text-danger">
            <i>*Create a slack profile first and enter email in Work Email</i>
          </div>
          <div className="text-info">
            *Default password is : {CONFIG.DEFAULT_PASSWORD}
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  Date of Joining
                  <DateField
                    dateFormat="YYYY-MM-DD"
                    onChange={(date) => { this.setState({dateofjoining: date}); }}
                    className="form-control"
                  />
                </td>
                <td colSpan={2}>
                  Date of Birth
                  <DateField
                    dateFormat="YYYY-MM-DD"
                    onChange={(date) => { this.setState({dob: date}); }}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Training Month
                  <select
                    className="form-control"
                    ref="training_month"
                    onChange={(evt) => { this.setState({training_month: evt.target.value}); }}>
                    <option disabled>--select month--</option>
                    <option value="0">0 month </option>
                    <option value="1">1 month</option>
                    <option value="2">2 month</option>
                    <option value="3">3 month</option>
                    <option value="4">4 month</option>
                  </select>
                </td>
                <td>
                  Gender
                  <select
                    className="form-control"
                    ref="gender"
                    onChange={(e) => this.setState({gender: e.target.value})}
                    value={this.state.gender}>
                    <option value="">--Select gender--</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    floatingLabelText="Name"
                    floatingLabelFixed fullWidth
                    onChange={(e) => (this.setState({name: e.target.value}))}
                    value={this.state.name}
                  />
                </td>
                <td>
                  <TextField
                    floatingLabelText="Job Title"
                    floatingLabelFixed fullWidth
                    onChange={(e) => (this.setState({jobtitle: e.target.value}))}
                    value={this.state.jobtitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    floatingLabelText="UserName"
                    floatingLabelFixed fullWidth
                    onChange={(e) => (this.setState({username: e.target.value}))}
                    value={this.state.username}
                  />
                </td>
                <td colSpan={2}>
                  <TextField
                    floatingLabelText="Work Email"
                    floatingLabelFixed fullWidth
                    onChange={(e) => (this.setState({workemail: e.target.value}))}
                    value={this.state.workemail}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <ButtonRaised
            className="col-md-12 m-b-sm indigo"
            onClick={() => this.props.callAddNewEmployee(this.state)}
            label={'Add Employee'}
          />
          <br />
          <br />
        </Dialog>
      </div>
    );
  }
}

export default FormAddNewEmployee;

FormAddNewEmployee.propTypes = {
  defaultPassword: React.PropTypes.string.isRequired,
  client: React.PropTypes.object.isRequired,
  selectedClientId: React.PropTypes.string.isRequired,
  callAddNewEmployee: React.PropTypes.func.isRequired
};
