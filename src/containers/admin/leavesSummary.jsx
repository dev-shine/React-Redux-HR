import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_leavesSummary from '../../actions/admin/leavesSummary'

import ViewLeavesSummary from '../../components/leavesSummary/ViewLeavesSummary'

//import UserDaySummary from '../../components/attendance/UserDaySummary'

class LeavesSummary extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      "defaultUserDisplay": "",
      "daysummary_userid": "",
      "daysummary_date": ""
    }
  }
  componentWillMount() {
    let d = new Date();
    let year = d.getFullYear()
    let month = d.getMonth() + 1 // +1 since getMonth starts from 0

    this.props.on_all_leaves_summary(year, month)
  }
  componentWillReceiveProps(props) {
    window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' || props.logged_user.role == 'HR') {
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

              <ViewLeavesSummary componentData={this.props.leavesSummary} {...this.props}/>

            </div>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS(), leavesSummary: state.leavesSummary.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    on_all_leaves_summary: (year, month) => {
      return dispatch(actions_leavesSummary.get_all_leaves_summary(year, month))
    }
  }
}

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary)

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary)

export default RouterVisibleLeavesSummary
