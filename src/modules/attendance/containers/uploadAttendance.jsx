import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'src/components/generic/Menu';
import {CONFIG} from 'src/config/index';
import {isNotUserValid} from 'src/services/generic';
import AlertNotification from 'src/components/generic/AlertNotification';
import Header from 'src/components/generic/Header';
import AttendanceSheatForm from 'modules/attendance/components/uploadAttendance/AttendanceSheatForm';
import * as actions from 'src/redux/actions';
import * as actionsUsersList from 'src/redux/generic/actions/usersList';
import * as actionsManageUsers from 'src/redux/manageUsers/actions/manageUsers';
import * as actionsManagePayslips from 'src/redux/salary/actions/managePayslips';

class UploadAttendance extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount () {
    this.props.onUsersList();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  handleSubmit() {
    window.open(CONFIG.upload_attendance_url)
  }
  handleOpenIframe () {
    this.setState({openIframe: true});
  }

  handleCloseIframe () {
    this.setState({openIframe: false});
  }
  render () {
    return (
      <div>
        <AlertNotification message={this.props.manageUsers.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'UPLOAD ATTENDANCE SHEET'}
            showLoading={this.props.frontend.show_loading}
            />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-10 p">
                    <input type="button" onClick={this.handleSubmit} name="submit" value="CLICK TO UPLOAD ATTENDANCE" className="col-xs-4 md-btn md-raised indigo" />
                 {/* <AttendanceSheatForm
                    user_documents={this.state.user_documents}
                    onUpdatedocuments={this.props.onUpdatedocuments}
                    {...this.props}
                    /> */}
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
    frontend:       state.frontend.toJS(),
    managePayslips: state.managePayslips.toJS(),
    loggedUser:     state.logged_user.userLogin,
    usersList:      state.usersList.toJS(),
    manageUsers:    state.manageUsers.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    },
    onUserProfileDetails: (userid, username) => {
      return dispatch(actionsManageUsers.getUserProfileDetails(userid, username));
    },
    onUpdateUserBankDetails: (newBankDetails) => {
      return dispatch(actionsManageUsers.updateUserBankDetails(newBankDetails));
    },
    onUpdateUserProfileDetails: (newProfileDetails) => {
      return dispatch(actionsManageUsers.updateUserProfileDetails(newProfileDetails));
    },
    onAddNewEmployee: (newEmployeeDetails) => {
      return dispatch(actionsManageUsers.addNewEmployee(newEmployeeDetails));
    },
    onUpdatedocuments: (documentLink) => {
      return dispatch(actionsManageUsers.updateDocument(documentLink));
    },
    onChangeEmployeeStatus: (userid, status) => {
      return dispatch(actionsManageUsers.changeEmployeeStatus(userid, status));
    },
    onGetUserDocument: (userid) => {
      return dispatch(actionsManageUsers.getUserDocument(userid));
    },
    onDeleteDocument: (docId) => {
      return dispatch(actionsManageUsers.deleteDocument(docId));
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actionsManagePayslips.get_user_manage_payslips_data(userid));
    }
  };
};

const VisibleUploadAttendance = connect(mapStateToProps, mapDispatchToProps)(UploadAttendance);

const RouterVisibleUploadAttendance = withRouter(VisibleUploadAttendance);

export default RouterVisibleUploadAttendance;
