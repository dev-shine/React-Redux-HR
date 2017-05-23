import React from 'react';
import {Link} from 'react-router';
import LoadingIcon from '../../generic/LoadingIcon';

const ForgotPasswordRoot = ({self}) => {
  return (
    <div className="center-block w-xxl w-auto-xs p-y-md">
      <div className="navbar">
        <div className="pull-center">
          <a className="navbar-brand">
              <span className="hidden-folded inline">HR</span>
          </a>
        </div>
      </div>
      <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
      <LoadingIcon loading={self.props.frontend.show_loading} />
      <br/>
        <div className="m-b text-sm">
          Reset Your Password
        </div>
        <form name="form"  onSubmit={self.doResetPassword}>
          <div className="md-form-group float-label">
              <input
                  className="md-input"
                  required type="text"
                  onChange={ (e) => self.setState({ form_username : e.target.value }) }
                  value={ self.state.form_username }/>
              <label>Enter Username</label>
          </div>
          <button type="submit" className="btn primary btn-block p-x-md">Reset Password</button>
        </form>
        <div className="m-b text-sm text-center">
          <br/>
          <button className="md-btn md-flat text-accent">
            <Link to='/'>Login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordRoot;
