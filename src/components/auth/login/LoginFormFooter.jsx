import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

export const LoginFormFooter = ({doGuestLogin}) => {
  return (
    <div className="text-sm text-center">
      <br />
      <button id="guestLogin" className="md-btn md-flat text-accent" onClick={doGuestLogin}>Click for guest Login</button>
      <br />
      <button id="forgetPassword" className="md-btn md-flat text-accent">
        <Link to='/forgot_password'>Forgot Password</Link>
      </button>
    </div>
  );
};

LoginFormFooter.PropTypes = {
  doGuestLogin: propTypes.func.isRequired
};

export default LoginFormFooter;
