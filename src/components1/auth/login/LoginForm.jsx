import React from 'react';

const LoginForm = ({self}) => {
  return (
    <form name="form" onSubmit={self.doLogin}>
    <div className="md-form-group float-label">
      <input type="email" className="md-input" required type="text" onChange={(e) => self.setState({form_login_username: e.target.value})} value={self.state.form_login_username}/>
      <label>Username</label>
    </div>
    <div className="md-form-group float-label">
      <input type="password" className="md-input" required type="password" onChange={(e) => self.setState({form_login_password: e.target.value})} value={self.state.form_login_password}/>
      <label>Password</label>
    </div>
    <button type="submit" className="btn primary btn-block p-x-md">Sign in</button>
  </form>
  )
}

export default LoginForm;
