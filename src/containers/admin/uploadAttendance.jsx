import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import ReactDOM from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'
import Menu from '../../components/generic/Menu'
import AlertNotification from '../../components/generic/AlertNotification'
import Header from '../../components/generic/header'

//-----------------------------------------
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_manageUsers from '../../actions/admin/manageUsers'
import * as actions_managePayslips from '../../actions/admin/managePayslips'

import AttendanceSheatForm from '../../components/uploadAttendance/AttendanceSheatForm'
import LoadingIcon from '../../components/generic/LoadingIcon'

class UploadAttendance extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {}
  }
  componentWillMount() {
    this.props.onUsersList()
  }
  componentWillReceiveProps(props) {
    window.scrollTo(0, 0);

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.HR) {
        //this.props.onUsersList( )
      } else {
        this.props.router.push('/home');
      }
    }
  }
  componentDidUpdate() {}

  handleOpenIframe() {
    this.setState({openIframe: true});
  };

  handleCloseIframe() {
    this.setState({openIframe: false});
  };
  render() {
    return (
      <div>

        <AlertNotification alert_message={this.props.manageUsers.status_message}/>

        <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"UPLOAD ATTENDANCE SHEAT"} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-10 p">
                  <AttendanceSheatForm user_documents={this.state.user_documents} onUpdatedocuments={this.props.onUpdatedocuments} {...this.props}/>
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
  return {frontend: state.frontend.toJS(), managePayslips: state.managePayslips.toJS(), logged_user: state.logged_user.toJS(), usersList: state.usersList.toJS(), manageUsers: state.manageUsers.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    },
    onUserProfileDetails: (userid, username) => {
      return dispatch(actions_manageUsers.getUserProfileDetails(userid, username))
    },
    onUpdateUserBankDetails: (new_bank_details) => {
      return dispatch(actions_manageUsers.updateUserBankDetails(new_bank_details))
    },
    onUpdateUserProfileDetails: (new_profile_details) => {
      return dispatch(actions_manageUsers.updateUserProfileDetails(new_profile_details))
    },
    onAddNewEmployee: (new_employee_details) => {
      return dispatch(actions_manageUsers.addNewEmployee(new_employee_details))
    },
    onUpdatedocuments: (document_link) => {
      return dispatch(actions_manageUsers.updateDocument(document_link))
    },
    onChangeEmployeeStatus: (userid, status) => {
      return dispatch(actions_manageUsers.changeEmployeeStatus(userid, status))
    },
    onGetUserDocument: (userid) => {
      return dispatch(actions_manageUsers.getUserDocument(userid))
    },
    onDeleteDocument: (doc_id) => {
      return dispatch(actions_manageUsers.deleteDocument(doc_id))
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actions_managePayslips.get_user_manage_payslips_data(userid))
    }

  }
}

const VisibleUploadAttendance = connect(mapStateToProps, mapDispatchToProps)(UploadAttendance)

const RouterVisibleUploadAttendance = withRouter(VisibleUploadAttendance)

export default RouterVisibleUploadAttendance
