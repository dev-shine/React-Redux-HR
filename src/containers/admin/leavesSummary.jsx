import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import UsersList from '../../components/attendance/UsersList'
import {CONFIG} from '../../config/index'

import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_leaveSummary from '../../actions/admin/leavesSummary'

import ViewLeavesSummary from '../../components/leavesSummary/ViewLeavesSummary'

//import UserDaySummary from '../../components/attendance/UserDaySummary'
let i = 0,
  userlist = [],
  uId;
class LeavesSummary extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      defaultUserDisplay: "",
      userid: "",
      year: '',
      month: '',
      leaveData: ''
    }
    this.dataToggle = this.dataToggle.bind(this);
  }
  componentWillMount() {
    this.props.onUsersList();

    //console.log(this.props.usersList);
    let d = new Date();
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    i = 0;
    this.setState({year: y, month: m});
  }
  dataToggle(u, y, m) {
    this.setState({year: y, month: m});
    this.props.on_select_month_leaves_summary(u, y, m)
  }
  componentWillReceiveProps(props) {
    //console.log(props.usersList);
    //window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST || props.logged_user.role == CONFIG.HR) {
        //this.props.onUsersList( )
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }
    //  if (props.leavesSummary.month == this.state.month) {
    //    this.setState({leaveData: props.leavesSummary})
    //}
    if (props.usersList.users[i] !== undefined) {
      console.log(props.usersList.users[i].user_Id);
      if (i < props.usersList.users.length) {
        this.props.on_user_leaves_summary(props.usersList.users[i].user_Id, this.state.year, this.state.month)
        i++;
        //console.log(this.state.u);
      }
      //this.setState({u: props.usersList.users[i].user_Id})
    } else {
      console.log("not updated");
    }
  }
  render() {
    return (
      <div>
        <Menu {...this.props }/>

        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" id="pageTitle">Leaves Summary</div>
            </div>
            <div className="row no-gutter">
              <div className="col-12">
                <LoadingIcon {...this.props}/>
              </div>
            </div>
          </div>

          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12 p">
                  <ViewLeavesSummary userlist={this.props.usersList} componentData={this.props.leavesSummary} year={this.state.year} month={this.state.month} dataToggle={this.dataToggle} users={this.props.usersList.users} user_name={this.state.selected_user_name} {...this.props}/>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {usersList: state.usersList.toJS(), frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS(), leavesSummary: state.leavesSummary.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    on_user_leaves_summary: (u, year, month) => {
      return dispatch(actions_leaveSummary.get_users_leaves_summary(u, year, month))
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    },
    on_select_month_leaves_summary: (u, y, m) => {
      return dispatch(actions_leaveSummary.select_month_leaves_summary(u, y, m))
    }
  }
}

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary)

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary)

export default RouterVisibleLeavesSummary
