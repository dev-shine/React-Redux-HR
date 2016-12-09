import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import {CONFIG} from '../../config/index'

import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'
import UserDaySummary from '../../components/attendance/UserDaySummary'

class MonthlyAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "defaultUserDisplay": "",
      "daysummary_userid": "",
      "daysummary_date": "",
      year: "",
      month: '',
      test: "show"
    }

    this.onShowDaySummary = this.onShowDaySummary.bind(this)
    this.monthToggle = this.monthToggle.bind(this)
    this.props.onIsAlreadyLogin()
  }
  componentWillMount() {
    this.props.onIsAlreadyLogin()
    console.log(localStorage.getItem("userid"));
    let user_id = this.props.logged_user.userid;
    this.setState({"defaultUserDisplay": user_id})
    let d = new Date();
    let year = d.getFullYear()
    let month = d.getMonth() + 1 // +1 since getMonth starts from 0
    this.setState({year: year, month: month})
    this.props.onMonthAttendance(localStorage.getItem("userid"), year, month)
  }
  componentWillReceiveProps(props) {
    //window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST) {
        this.props.router.push('/home');
      }
    }
  }
  onShowDaySummary(userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date})
    //this.props.onUserDaySummary(userid, date)
  }
  monthToggle(u, y, m) {
    this.setState({year: y, month: m})
    this.props.onMonthAttendance(u, y, m)
  }
  render() {
    let mainDivs = <div className="row">

      <div className="col-md-1"></div>
      <div className="col-md-10">
        <UserMonthlyAttendance {...this.props} monthToggle={this.monthToggle} onShowDaySummary={this.onShowDaySummary}/>
      </div>
    </div>
    return (
      <div >
        <Menu {...this.props}/>

        <div id="content" className="app-content box-shadow-z0" role="main">

          <div className="app-header white box-shadow">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" id="pageTitle">My Attendance</div>
            </div>
            <div className="row no-gutter">
              <div className="col-12">
                <LoadingIcon {...this.props}/>
              </div>
            </div>
          </div>

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

MonthlyAttendance.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps(state) {
  return {frontend: state.frontend.toJS(), userDaySummary: state.userDaySummary.toJS(), logged_user: state.logged_user.toJS(), monthlyAttendance: state.monthlyAttendance.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMonthAttendance: (userid, year, month) => {
      return dispatch(actions_monthlyAttendance.get_monthly_attendance(userid, year, month))
    },
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onUserDaySummary: (userid, date) => {
      return dispatch(actions_userDaySummary.getUserDaySummary(userid, date))
      this.setState({test: "hidden"})
    },
    onUserUpdateDaySummary: (userid, date, entry_time, exit_time, reason, year, month) => {
      return dispatch(actions_userDaySummary.userUpdateUserDaySummary(userid, date, entry_time, exit_time, reason, year, month))
    }
  }
}

const VisibleMonthlyAttendance = connect(mapStateToProps, mapDispatchToProps)(MonthlyAttendance)

const RouterVisibleMonthlyAttendance = withRouter(VisibleMonthlyAttendance)

export default RouterVisibleMonthlyAttendance
