import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';
import Menu from 'src/components/generic/Menu';
import UsersList from 'components/generic/UsersList';
import Header from 'components/generic/Header';
import UserMonthlyAttendance from 'components/attendance/UserMonthlyAttendance';
import UserDaySummary from 'modules/attendance/components/UserDaySummary';

import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsMonthlyAttendance from 'appRedux/attendance/actions/monthlyAttendance';
import * as actionsUserDaySummary from 'appRedux/attendance/actions/userDaySummary';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid': '',
      'daysummary_date': '',
      year: '',
      month: ''
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.monthToggle = this.monthToggle.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
  }
  componentDidMount () {
    this.props.onUsersList();
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0
    this.setState({year: year, month: month});
  }
  componentWillReceiveProps (props) {
    // window.scrollTo(0, 0);
    if (props.logged_user.logged_in === -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.GUEST) {

      } else if (props.logged_user.role === CONFIG.HR) {
        // this.props.onUsersList( )
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read === 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }

    if (props.userDaySummary.status_message !== '') {
      notify(props.userDaySummary.status_message);
    }

    if (this.state.defaultUserDisplay === '') {
      if (props.usersList.users.length > 0) {
        let firstUser = props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        this.onUserClick(defaultUserId);
      }
    }
  }
  onUserClick (userid) {
    this.setState({'defaultUserDisplay': userid});
    this.props.onMonthAttendance(userid, this.state.year, this.state.month);
  }
  monthToggle (u, y, m) {
    this.setState({year: y, month: m});
    this.props.onMonthAttendance(u, y, m);
  }
  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    this.props.onUserDaySummary(userid, date);
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <UserDaySummary userid={this.state.daysummary_userid} date={this.state.daysummary_date} year={this.state.year} month={this.state.month} {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Users'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-2">
                  <UsersList users={this.props.usersList.users} onUserClick={this.onUserClick} selectedUserId={this.props.monthlyAttendance.userid} />
                </div>
                <div className="col-md-10">
                  <UserMonthlyAttendance monthlyAttendance={this.props.monthlyAttendance} monthToggle={this.monthToggle} onShowDaySummary={this.onShowDaySummary} />
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
    monthlyAttendance: state.monthlyAttendance.toJS(),
    userDaySummary: state.userDaySummary.toJS(),
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
    onMonthAttendance: (userid, year, month) => {
      return dispatch(actionsMonthlyAttendance.get_monthly_attendance(userid, year, month));
    },
    onUserDaySummary: (userid, date) => {
      return dispatch(actionsUserDaySummary.getUserDaySummary(userid, date));
    },
    onUpdateDaySummary: (userid, date, entryTime, exitTime, reason, year, month) => {
      return dispatch(actionsUserDaySummary.updateUserDaySummary(userid, date, entryTime, exitTime, reason, year, month));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }
  };
};

const VisibleHome = connect(mapStateToProps, mapDispatchToProps)(Home);

const RouterVisibleHome = withRouter(VisibleHome);

export default RouterVisibleHome;
