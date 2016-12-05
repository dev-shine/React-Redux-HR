import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import UsersList from '../../components/attendance/UsersList'
import { CONFIG } from '../../config/index'

import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_leaveSummary from '../../actions/admin/leavesSummary'

import ViewLeavesSummary from '../../components/leavesSummary/ViewLeavesSummary'

//import UserDaySummary from '../../components/attendance/UserDaySummary'

class LeavesSummary extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      defaultUserDisplay: "",
      userid: ""
    }
  }
  componentWillMount() {
    //this.props.onUsersList();
    let d = new Date();
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    this.props.on_user_leaves_summary(year, month)
  }
  componentWillReceiveProps(props) {
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
                  <ViewLeavesSummary componentData={this.props.leavesSummary} onUserClick={this.onUserClick} users={this.props.usersList.users} user_name={this.state.selected_user_name} {...this.props}/>
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
    on_user_leaves_summary: (year, month) => {
      return dispatch(actions_leaveSummary.get_users_leaves_summary(year, month))
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    }
  }
}

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary)

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary)

export default RouterVisibleLeavesSummary
