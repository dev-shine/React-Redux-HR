import React from 'react';
import 'react-date-picker/index.css';

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
      <div>
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
        <button className="col-xs-12 md-btn md-raised indigo" onClick={() => this.props.callUpdatePassword(this.state.new_password)} >Update Password</button>
      </div>
    );
  }
}

FormUpdatePassword.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
};

export default FormUpdatePassword;
