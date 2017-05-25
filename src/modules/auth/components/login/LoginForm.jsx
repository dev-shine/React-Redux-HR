import React from 'react';
import {notify} from 'src/services/index';
import {Button} from 'components/generic/buttons'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      form_login_username: '',
      form_login_password: ''
    }
    this.doLogin = this.doLogin.bind(this);
  }
  doLogin(evt) {
    evt.preventDefault();
    this.props.onLogin(this.state.form_login_username, this.state.form_login_password).then((data) => {}, (error) => {
      notify(error);
    })
  }
  render() {
    return (
      <form name="form" onSubmit={this.doLogin}>
        <div className="md-form-group float-label">
          <input type="email" className="md-input" required type="text" onChange={(e) => this.setState({form_login_username: e.target.value})} value={this.state.form_login_username}/>
          <label>Username</label>
        </div>
        <div className="md-form-group float-label">
          <input type="password" className="md-input" required type="password" onChange={(e) => this.setState({form_login_password: e.target.value})} value={this.state.form_login_password}/>
          <label>Password</label>
        </div>
        <Button type="submit" className="btn primary btn-block p-x-md" label="Sign in" />
      </form>
    )
  }
}

export default LoginForm;
