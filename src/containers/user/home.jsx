import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import UsersList from '../../components/attendance/UsersList'
import Header from '../../components/generic/header'

import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import * as actions_policy from '../../actions/policyDocuments/index'

import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'

import UserDaySummary from '../../components/attendance/UserDaySummary'
import {CONFIG} from '../../config/index'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      "defaultUserDisplay": "",
      "daysummary_userid": "",
      "daysummary_date": "",
      year: "",
      month: ''
    }

    this.onUserClick = this.onUserClick.bind(this)
    this.onShowDaySummary = this.onShowDaySummary.bind(this)
    this.monthToggle = this.monthToggle.bind(this)
  }
  componentWillMount() {
    this.props.onFetchUserPolicyDocument();
    this.props.onUsersList();
    let d = new Date();
    let year = d.getFullYear()
    let month = d.getMonth() + 1 // +1 since getMonth starts from 0
    this.setState({year: year, month: month})
  }
  componentWillReceiveProps(props) {
    //window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST ){

      }else if (props.logged_user.role == CONFIG.HR) {
        //this.props.onUsersList( )
        let unread = _.filter(props.policy_documents.policyDocuments, function(o) { return o.read == 0; }) || [];
        if(unread.length > 0){
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }

    if (props.userDaySummary.status_message != '') {
      notify(props.userDaySummary.status_message);
    }

    if (this.state.defaultUserDisplay == '') {
      if (props.usersList.users.length > 0) {
        let firstUser = props.usersList.users[0]
        let defaultUserId = firstUser.user_Id
        this.onUserClick(defaultUserId)
      }
    }

  }
  onUserClick(userid) {
    this.setState({"defaultUserDisplay": userid})
    this.props.onMonthAttendance(userid, this.state.year, this.state.month)
  }
  monthToggle(u, y, m) {
    this.setState({year: y, month: m})
    this.props.onMonthAttendance(u, y, m)
  }
  onShowDaySummary(userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date})
    this.props.onUserDaySummary(userid, date)
  }
  render() {

    let mainDivs = <div className="row">

      <div className="col-md-2">
        <UsersList users={this.props.usersList.users} onUserClick={this.onUserClick} {...this.props } selectedUserId={this.props.monthlyAttendance.userid}/>
      </div>
      <div className="col-md-10">
        <UserMonthlyAttendance {...this.props} monthToggle={this.monthToggle} onShowDaySummary={this.onShowDaySummary}/>
      </div>
    </div>

    return (
      <div>
        <Menu {...this.props }/>

        <UserDaySummary userid={this.state.daysummary_userid} date={this.state.daysummary_date} year={this.state.year} month={this.state.month} {...this.props}/>

        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"Users"} {...this.props} />


          <div className="app-body" id="view">

            <div className="padding">

              {mainDivs}
            </div>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    usersList: state.usersList.toJS(),
    monthlyAttendance: state.monthlyAttendance.toJS(),
    userDaySummary: state.userDaySummary.toJS(),
    policy_documents: state.policyDocuments.toJS(),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    },
    onMonthAttendance: (userid, year, month) => {
      return dispatch(actions_monthlyAttendance.get_monthly_attendance(userid, year, month))
    },
    onUserDaySummary: (userid, date) => {
      return dispatch(actions_userDaySummary.getUserDaySummary(userid, date))
    },
    onUpdateDaySummary: (userid, date, entry_time, exit_time, reason, year, month) => {
      return dispatch(actions_userDaySummary.updateUserDaySummary(userid, date, entry_time, exit_time, reason, year, month))
    },
    onFetchUserPolicyDocument: ()=>{
      return dispatch(actions_policy.fetchUserPolicyDocument());
    },
  }
}

const VisibleHome = connect(mapStateToProps, mapDispatchToProps)(Home)

const RouterVisibleHome = withRouter(VisibleHome)

export default RouterVisibleHome
