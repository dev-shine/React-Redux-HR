import React from 'react';
import logo from '../../../static/logo.png';

const GetLogo = () => {
  return (
    <div className="logo-container thumbnail">
      <img src={logo} height="40" width="220" />
    </div>
  );
};

export default GetLogo;
