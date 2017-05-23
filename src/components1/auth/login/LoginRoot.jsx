import React from 'react';
import {Link} from 'react-router';
import GetLogo from './GetLogo';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import LoginFormFooter from './LoginFormFooter';
import LoadingIcon from '../../generic/LoadingIcon';

const LoginRoot = ({self}) => {
  return (
    <div>
      <div className="center-block w-xxl w-auto-xs p-y-md">
        <GetLogo />
        <Navbar />
        <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
          <LoadingIcon loading={self.props.frontend.show_loading} />
          <br/>
          <div className="m-b text-sm">
            Sign in with your username
          </div>
          <LoginForm self={self} />
          <LoginFormFooter doGuestLogin={self.doGuestLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginRoot;
