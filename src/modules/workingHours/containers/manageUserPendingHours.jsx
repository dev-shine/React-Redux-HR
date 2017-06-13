import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';
import Menu from 'src/components/generic/Menu';
import UsersList from 'components/generic/UsersList';

import Header from 'components1/generic/Header';

// import TimeSummary from 'components/attendence/TimeSummary';

import UserPendingHoursList from '../components/UserPendingHoursList';

import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actions_usersList from 'appRedux/generic/actions/usersList';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';

import * as actionsManageUserPendingHours from 'appRedux/workingHours/actions/manageUserPendingHour';

class ManageUserPendingHours extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid': '',
      'daysummary_date': '',
      status_message: '',
      active: 'active',
      firstArrow: 'show',
      secondArrow: 'hidden',
      thirdArrow: 'hidden',
      pendingList: 'show',
      pendingUserList: 'hidden',
      open: false,
      edit: false
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.callAddUserPendingHours = this.callAddUserPendingHours.bind(this);
    this.callFetchPendingUserList = this.callFetchPendingUserList.bind(this);
  }
  componentWillMount () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    this.props.onUsersList();
    this.props.onFetchUserPolicyDocument();
    this.props.onUserPendingHoursData(year, month);
  }
  componentWillReceiveProps (props) {
    // window.scrollTo(0, 0);
    if (props.logged_user.logged_in === -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.GUEST) {

      } else if (props.logged_user.role === CONFIG.HR) {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read === 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }
  }

  componentDidUpdate () {
    if (this.state.defaultUserDisplay == '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        let defaultUserName = firstUser.username;
        this.onUserClick(defaultUserId, defaultUserName);
      }
    }
  }

  onUserClick (userid, username) {
    let selected_user_name = '';
    let selected_user_image = '';
    let selected_user_jobtitle = '';
    let selected_user_id = '';

    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, {'user_Id': userid});
      if (typeof userDetails !== 'undefined') {
        selected_user_name = userDetails.name;
        selected_user_image = userDetails.slack_profile.image_192;
        selected_user_jobtitle = userDetails.jobtitle;
        selected_user_id = userDetails.user_Id;
      }
    }

    this.setState({'defaultUserDisplay': userid,
      'selected_user_name': selected_user_name,
      'selected_user_image': selected_user_image,
      'selected_user_jobtitle': selected_user_jobtitle,
      'selected_user_id': selected_user_id});
  }

  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    this.props.onUserDaySummary(userid, date);
  }

  callAddUserPendingHours (userid, date, workingHours, reason) {
    this.props.onAddUserPendingHours(userid, date, workingHours, reason).then((data) => {}, (error) => {
      notify(error);
    });
  }

  callFetchPendingUserList () {
    this.onUserPendingHoursData();
  }

  openPage (toDisplay) {
    if (toDisplay === 'pending_hour_list') {
      this.setState({
        pendingList: 'row',
        firstArrow: 'show',
        pendingUserList: 'hidden',
        secondArrow: 'hidden'
      });
    } else if ((toDisplay === 'view_user_pending_hours')) {
      this.setState({
        pendingList: 'hidden',
        firstArrow: 'hidden',
        pendingUserList: 'row',
        secondArrow: 'show'
      });
    }
  }

  render () {
    let pending_hour_list = <UserPendingHoursList
      callFetchPendingTime={this.callFetchPendingUserList}
      manageUserPendingHours={this.props.manageUserPendingHours}
      onUserPendingHoursData={this.props.onUserPendingHoursData}
      {...this.props} />;

    let view_user_pending_hours = <UsersList
      users={this.props.usersList.users}
      selectedUserId={this.state.selected_user_id}
      onUserClick={this.onUserClick}
      {...this.props} />;

    let statusMessage = '';
    if (this.props.manageUserPendingHours.status_message !== '') {
      statusMessage = <span className="label label-lg primary pos-rlt m-r-xs">
        <b className="arrow left b-primary"></b>{this.props.manageUserPendingHours.status_message}</span>;
    }

    return (
      <div>
            <Menu {...this.props} />
            <div id="content" className="app-content box-shadow-z0" role="main">
              <Header pageTitle={'Manage User Pending Hours'} {...this.props} />
              <div className="app-footer">
                <div></div>
              </div>
              <div className="app-body" id="view">
                <div className="row">
                  <div className="col-12">
                  </div>
                </div>
                {this.state.secondArrow == 'show' ? null
                  : <div className="row" style={{marginTop: '2%', marginLeft: '4%'}}>
                  <div className="col-md-11 col-xs-offset-0">
                  </div>
                </div>
    }
                <div className="dker p-x">
                  <div className="row">
                    <div className="col-sm-6 pull-sm-6">
                      <div className="p-y-md clearfix nav-active-primary">
                        <ul className="nav nav-pills nav-sm" style={{marginLeft: '4%'}}>
                          <li
                            onClick={() => { this.openPage('pending_hour_list'); }}
                            className={`nav-item ${this.state.active}`}>
                            <a className="nav-link"
                              href=""
                              data-toggle="tab"
                              data-target="#tab_1"
                              aria-expanded="true">Pending Hour List</a>
                            <div className={this.state.firstArrow}>
                              <span className="arrow bottom b-accent"></span></div>
                          </li>
                          <li
                            onClick={() => { this.openPage('view_user_pending_hours'); }}
                            className={'nav-item'}>
                            <a className="nav-link"
                              href=""
                              data-toggle="tab"
                              data-target="#tab_2"
                              aria-expanded="false">User Pending Hour Details</a>
                            <div className={this.state.secondArrow}>
                            <span className="arrow bottom b-accent"></span></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="padding">
                  <div className={this.state.pendingList}>
                  {pending_hour_list}
                  </div>

                  <div className={this.state.pendingUserList}>
                    <div className="col-md-2">
                      {view_user_pending_hours}
                    </div>
                    <div className="col-md-10">
                      <UserPendingHoursList {...this.props} />
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    usersList: state.usersList.toJS(),
    manageUserPendingHours: state.manageUserPendingHours.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    },
    onUserPendingHoursData: (year, month) => {
      return dispatch(actionsManageUserPendingHours.getUserPendingHourList(year, month));
    },
    onAddUserPendingHours: (userid, pendingHour, date, reason) => {
      return dispatch(actionsManageUserPendingHours.addUserPendingHour(userid, pendingHour, date, reason));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }

  };
};

const VisibleManageUserPendingHours = connect(mapStateToProps, mapDispatchToProps)(ManageUserPendingHours);

const RouterVisibleManageUserPendingHours = withRouter(VisibleManageUserPendingHours);

export default RouterVisibleManageUserPendingHours;
