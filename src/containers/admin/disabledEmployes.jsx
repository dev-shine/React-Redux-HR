import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import {CONFIG} from '../../config/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_disabledEmployee from '../../actions/user/usersList'
import * as actions_manageUsers from '../../actions/admin/manageUsers'
import * as actions_managePayslips from '../../actions/admin/managePayslips'

import ViewLeavesSummary from '../../components/leavesSummary/ViewLeavesSummary'
import UsersList from '../../components/generic/UsersList'
import DisabledUserDetails from '../../components/attendance/DisabledUserDetails'
import UserPayslipsHistory from '../../components/managePayslips/UserPayslipsHistory'
import UpdateEmployeeDocument from '../../components/manageUsers/UpdateEmployeeDocument'

const styles = {
  content: {
    'paddingTop': '50px'
  }
}

class Page_DisabledEmployes extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      disabled_users: [],
      "defaultUserDisplay": "",
      "selected_user_name": "",
      "f_char": "",
      "selected_user_jobtitle": "",
      "selected_user_id": "",
      "userDetails": "",
      key: 0,
      user_documents: {},
      user_payslip_history: []
    }
    this.onUserClick = this.onUserClick.bind(this)
    this.changeEmployeeStatus = this.changeEmployeeStatus.bind(this)
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      this.props.onFetchDisabledEmployee()
    }
  }

  componentWillReceiveProps(props) {
    window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      props.router.push('/logout');
    }
    let disabledUserList = []
    if (props.logged_user.role == CONFIG.ADMIN) {} else {
      this.props.router.push('/home');
    }
    this.setState({user_payslip_history: props.managePayslips.user_payslip_history, user_documents: props.manageUsers.user_documents})
  }
  componentDidUpdate() {
    if (this.state.defaultUserDisplay == '') {
      if (this.props.usersList.disabled_users.length > 0) {
        let user_list = this.props.usersList.disabled_users
        let firstUser = user_list[this.state.key]
        if (firstUser == undefined) {
          firstUser = user_list[0]
        }
        this.onUserClick(firstUser)
      }
    }
  }
  onUserClick(firstUser) {
    window.scrollTo(0, 0);
    this.setState({
      "defaultUserDisplay": firstUser.user_Id,
      "selected_user_name": firstUser.name,
      "f_char": firstUser.name.charAt(0),
      "selected_user_jobtitle": firstUser.jobtitle,
      "selected_user_id": firstUser.user_Id,
      "userDetails": firstUser
    })
    this.props.onGetUserDocument(firstUser.user_Id)
    this.props.onUserManagePayslipsData(firstUser.user_Id)
  }
  changeEmployeeStatus(userid, status) {
    this.props.onChangeEmployeeStatus(userid, status).then(() => {
      this.props.onFetchDisabledEmployee()
    })
  }
  render() {
    let disabled_users = _.orderBy(this.props.usersList.disabled_users, 'user_Id', 'asc')
    let mainDivs = <div className="row">
      <div className="col-md-3">
        <UsersList disabledUser={true} users={disabled_users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} {...this.props}/>
      </div>
      <div className="col-md-9">
        <div className="box">
          <div className="box-body">
            {this.state.userDetails == ""
              ? ""
              : <DisabledUserDetails userDetails={this.state.userDetails} changeEmployeeStatus={this.changeEmployeeStatus} {...this.props }/>}
          </div>
        </div>
        <div className="box">
          <div className="box-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-center">
                  <u>Previous Payslips</u>
                </h6>
                <hr/>
                <UserPayslipsHistory user_payslip_history={this.state.user_payslip_history}/>
              </div>
              <div className="col-md-6">
                <UpdateEmployeeDocument disabled={true} user_documents={this.state.user_documents} user_id={this.state.selected_user_id} onUpdatedocuments={this.props.onUpdatedocuments} {...this.props}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    return (
      <div>
        <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" id="pageTitle">Disabled Employees</div>
            </div>
            <div className="row no-gutter">
              <div className="col-12">
                <LoadingIcon {...this.props}/>
              </div>
            </div>
          </div>
          <div className="app-body" id="view">
            <div style={styles.content} className="padding">
              {mainDivs}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS(), usersList: state.usersList.toJS(), managePayslips: state.managePayslips.toJS(), manageUsers: state.manageUsers.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onFetchDisabledEmployee: () => {
      return dispatch(actions_disabledEmployee.getDisabledUsersList())
    },
    onChangeEmployeeStatus: (userid, status) => {
      return dispatch(actions_manageUsers.changeEmployeeStatus(userid, status))
    },
    onGetUserDocument: (userid) => {
      return dispatch(actions_manageUsers.getUserDocument(userid))
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actions_managePayslips.get_user_manage_payslips_data(userid))
    }
  }
}

const VisiblePage_DisabledEmployes = connect(mapStateToProps, mapDispatchToProps)(Page_DisabledEmployes)

const RouterVisiblePage_DisabledEmployes = withRouter(VisiblePage_DisabledEmployes)

export default RouterVisiblePage_DisabledEmployes
