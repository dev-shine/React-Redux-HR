import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {isNotUserValid} from 'src/services/generic';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import UserMonthlyAttendance from 'components/attendance/UserMonthlyAttendance';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsMonthlyAttendance from 'appRedux/attendance/actions/monthlyAttendance';
import * as actionsUserDaySummary from 'appRedux/attendance/actions/userDaySummary';

class MonthlyAttendance extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid': '',
      'daysummary_date': '',
      year: '',
      month: '',
      test: 'show',
      userDoc: ['bvnvbn', 'efce', 'vbnvb', 'vbnvb']
    };
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.monthToggle = this.monthToggle.bind(this);
    this.props.onIsAlreadyLogin();
  }
  componentWillMount () {
    this.props.onIsAlreadyLogin();
    this.props.onFetchUserPolicyDocument();

    let user_id = this.props.logged_user.userid;
    this.setState({'defaultUserDisplay': user_id});
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0
    this.setState({year: year, month: month});
    this.props.onMonthAttendance(localStorage.getItem('userid'), year, month);
  }
  componentWillReceiveProps (props) {
    // window.scrollTo(0, 0);
    if (isNotUserValid(this.props.route.path)) {
      this.props.router.push('/logout');
    }
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST) {
        this.props.router.push('/home');
      } else {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      }
    }
  }
  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    // this.props.onUserDaySummary(userid, date)
  }
  monthToggle (u, y, m) {
    this.setState({year: y, month: m});
    this.props.onMonthAttendance(u, y, m);
  }
  render () {
    return (
      <div >
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Attendance'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <UserMonthlyAttendance
                    monthlyAttendance={this.props.monthlyAttendance}
                    monthToggle={this.monthToggle}
                    onShowDaySummary={this.onShowDaySummary} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MonthlyAttendance.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    userDaySummary: state.userDaySummary.toJS(),
    logged_user: state.logged_user.toJS(),
    monthlyAttendance: state.monthlyAttendance.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMonthAttendance: (userid, year, month) => {
      return dispatch(actionsMonthlyAttendance.get_monthly_attendance(userid, year, month));
    },
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onUserDaySummary: (userid, date) => {
      return dispatch(actionsUserDaySummary.getUserDaySummary(userid, date));
    },
    onUserUpdateDaySummary: (userid, date, entryTime, exitTime, reason, year, month) => {
      return dispatch(actionsUserDaySummary.userUpdateUserDaySummary(userid, date, entryTime, exitTime, reason, year, month));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }
  };
};

const VisibleMonthlyAttendance = connect(mapStateToProps, mapDispatchToProps)(MonthlyAttendance);

const RouterVisibleMonthlyAttendance = withRouter(VisibleMonthlyAttendance);

export default RouterVisibleMonthlyAttendance;
