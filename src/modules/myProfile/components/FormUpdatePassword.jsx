import React from 'react';
import 'react-date-picker/index.css';
import {ButtonRaised} from 'components/generic/buttons/index';

class FormUpdatePassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      new_password: ''
    };
  }
  componentWillReceiveProps (props) {
    this.state = {
      new_password: ''
    };
  }
  render () {
    return (
      <div className="col-sm-6 p-a m-b-md">
        <h6 className="text-center">Update Password</h6>
        <div className="form-group">
          <label>Enter New Password</label>
          <input
            type="password"
            className="form-control"
            ref="new_password"
            onChange={(e) => this.setState({new_password: e.target.value})}
            value={this.state.new_password}
          />
        </div>
        <ButtonRaised className="col-xs-12 indigo" onClick={() => this.props.callUpdatePassword(this.state.new_password)} label="Update Password" />
      </div>
    );
  }
}

export default FormUpdatePassword;
