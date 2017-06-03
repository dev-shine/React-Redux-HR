import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import Menu from 'src/components/generic/Menu';
import AlertNotification from 'components/generic/AlertNotification';
import Header from 'components/generic/Header';
import AttendanceSheatForm from 'modules/attendance/components/uploadAttendance/AttendanceSheatForm';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsManageUsers from 'appRedux/manageUsers/actions/manageUsers';
import * as actionsManagePayslips from 'appRedux/salary/actions/managePayslips';

class UploadAttendance extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {

    };
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onUsersList();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN) {

      } else if (props.logged_user.role == CONFIG.HR) {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/home');
      }
    }
  }

  handleOpenIframe () {
    this.setState({openIframe: true});
  };

  handleCloseIframe () {
    this.setState({openIframe: false});
  };
  render () {
    return (
      <div>
        <AlertNotification message={this.props.manageUsers.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'UPLOAD ATTENDANCE SHEAT'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-10 p">
                  <AttendanceSheatForm user_documents={this.state.user_documents} onUpdatedocuments={this.props.onUpdatedocuments} {...this.props} />
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
    managePayslips: state.managePayslips.toJS(),
    logged_user: state.logged_user.toJS(),
    usersList: state.usersList.toJS(),
    manageUsers: state.manageUsers.toJS(),
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
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }

  };
};

const VisibleUploadAttendance = connect(mapStateToProps, mapDispatchToProps)(UploadAttendance);

const RouterVisibleUploadAttendance = withRouter(VisibleUploadAttendance);

export default RouterVisibleUploadAttendance;
