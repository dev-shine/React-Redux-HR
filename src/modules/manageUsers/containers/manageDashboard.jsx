import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UsersList from 'components/generic/UsersList';
import UsersListHeader from 'components/generic/UsersListHeader';
import PageUserDashboard from 'modules/manageUsers/components/PageUserDashboard';

export default class ManageDashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      'defaultUserDisplay': ''
    };
  }
  componentWillMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Employees Dashboard'} showLoading={this.props.frontend.show_loading} userListHeader />
          <div className="app-body" id="view">
            <div className="p-t p-x">
              <div className="row">
                <PageUserDashboard {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
