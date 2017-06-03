
import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory, Link, withRouter} from 'react-router';

import * as _ from 'lodash';
import {notify} from '../../services/index';

import Menu from '../../components/generic/Menu';
import LoadingIcon from './LoadingIcon';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount () {

  }
  componentWillReceiveProps (props) {

  }
  render () {
    return (
          <div className="app-header white box-shadow m-b">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" style={{marginTop: '-4px'}} id="pageTitle">{this.props.pageTitle}{this.props.status ? this.props.status : null}</div>
            </div>
            <div className="row no-gutter">
              <div className="col-12">
                <LoadingIcon {...this.props} />
              </div>
            </div>
          </div>
    );
  }
}

export default Header;
