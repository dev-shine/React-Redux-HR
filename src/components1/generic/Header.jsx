import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';

const Header = ({pageTitle, status, showLoading}) => {
  return (
    <div className="app-header white box-shadow m-b">
      <div className="navbar">
        <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
          <i className="material-icons">&#xe5d2;</i>
        </a>
        <div className="navbar-item pull-left h5" style={{marginTop: '-4px'}} id="pageTitle">{pageTitle}{status || null}</div>
      </div>
      <div className="row no-gutter">
        <div className="col-12">
          <LoadingIcon loading={showLoading} />
        </div>
      </div>
    </div>
  );
};

Header.PropTypes = {
  pageTitle: PropTypes.string.isRequired,
  status: PropTypes.string,
  showLoading: PropTypes.bool.isRequired
};

export default Header;
