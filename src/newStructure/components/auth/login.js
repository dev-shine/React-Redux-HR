import React from 'react';
import {Link} from 'react-router';
import loadingIcon from '../LoadingIcon';

export const getLogo = () => {
  const css = {
    log: {
      "backgroundColor": "#284665",
      "padding": "30px 40px 30px 40px",
      "width": "300px",
      "marginLeft": "5px",
      "borderRadius": "6px",
      paddingBottom: '20px',
    }
  }
  return (
    <div style={css.log}>
      <img src="./logo.png" height="40" width="220"/>
    </div>
  )
}

export const navbar = () => {
  return (
    <div className="navbar">
      <div className="pull-center">
        <a className="navbar-brand">
          <img src="./favicon.ico" height="25" width="25"/>
          <span className="hidden-folded inline">HR</span>
        </a>
      </div>
    </div>
  )
}

export const loginForm = ({self}) => {
  return (
    <form name="form" onSubmit={self.doLogin}>
    <div className="md-form-group float-label">
      <input type="email" className="md-input" required type="text" ref="username" onChange={() => self.setState({form_login_username: self.refs.username.value})} value={self.state.form_login_username}/>
      <label>Username</label>
    </div>
    <div className="md-form-group float-label">
      <input type="password" className="md-input" required type="password" ref="password" onChange={() => self.setState({form_login_password: self.refs.password.value})} value={self.state.form_login_password}/>
      <label>Password</label>
    </div>
    <button type="submit" className="btn primary btn-block p-x-md">Sign in</button>
  </form>
  )
}

export const loginFormFooter = ({self}) => {
  return (
    <div className="m-b text-sm text-center">
      <br/>
      <button className="md-btn md-flat text-accent" onClick={self.doGuestLogin}>Click for guest Login</button>
      <br/>
      <button className="md-btn md-flat text-accent">
        <Link to='/forgot_password'>Forgot Password</Link>
      </button>
    </div>
  )
}

export const login = ({self}) => {
  return (
    <div>
      <div className="center-block w-xxl w-auto-xs p-y-md">
        {getLogo()}
        {navbar()}
        <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
          {loadingIcon({self})}
          <br/>
          <div className="m-b text-sm">
            Sign in with your username
          </div>
          {loginForm({self})}
          {loginFormFooter({self})}
        </div>
      </div>
    </div>
  )
}
