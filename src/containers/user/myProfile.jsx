import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory, Link, withRouter} from 'react-router';

import * as _ from 'lodash';
import {notify} from '../../services/index';

import Menu from '../../components/generic/Menu';
import LoadingIcon from '../../components/generic/LoadingIcon';
import UserHorizontalView from 'components/generic/UserHorizontalView';
import Header from '../../components/generic/header';

import FormProfileDetails from '../../components/myProfile/FormProfileDetails';
import FormBankDetails from '../../components/myProfile/FormBankDetails';
import FormUpdatePassword from '../../components/myProfile/FormUpdatePassword';
import FormDeviceDetails from '../../components/myProfile/FormDeviceDetails';

import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_myProfile from '../../actions/user/myProfile';
import * as actions_salary from 'appRedux/salary/actions/viewSalary';

import PayslipHistory from 'components/salary/userSalary/PayslipHistory';

class MyProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status_message: '',
      user_profile_detail: {},
      user_bank_detail: [],
      payslip_history: [],
      user_assign_machine: []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateBankDetails = this.callUpdateBankDetails.bind(this);
    this.callUpdateProfileDetails = this.callUpdateProfileDetails.bind(this);
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
    this.callUpdatePassword = this.callUpdatePassword.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onMyProfileDetails();
    this.props.onSalaryDetails();
  }
  componentWillReceiveProps (props) {
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0; }) || [];
      if (unread.length > 0) {
        this.props.router.push('/policy_documents');
      }
    }
    let s_payslip_history = [];

    if (typeof props.salary.payslip_history !== 'undefined' && props.salary.payslip_history.length > 0) {
      s_payslip_history = props.salary.payslip_history;
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail, user_assign_machine: props.myProfile.user_assign_machine, user_bank_detail: props.myProfile.user_bank_detail, payslip_history: s_payslip_history});
  }
  callUpdateBankDetails (new_bank_details) {
    this.props.onUpdateBankDetails(new_bank_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserDeviceDetails (new_device_details) {
    this.props.onUpdateDeviceDetails(new_device_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateProfileDetails (new_profile_details) {
    this.props.onUpdateProfileDetails(new_profile_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdatePassword (new_password) {
    new_password = new_password.trim();
    if (new_password == '') {
      notify('Enter Password !!');
    } else {
      this.props.onUpdatePassword(new_password).then((data) => {
        notify(data);
        this.props.onMyProfileDetails();
      }, (error) => {
        notify(error);
      });
    }
  }
  render () {
    return (
      <div>

        <Menu {...this.props} />

        <div id="content" className="app-content box-shadow-z0" role="main">

          <Header pageTitle={'My Profile'} {...this.props} />
          <div className="app-body" id="view">

            <div className="padding">

              <div className="row no-gutter">
                <UserHorizontalView profileImage={this.props.logged_user.profileImage} name={this.state.user_profile_detail.name} jobtitle={this.state.user_profile_detail.jobtitle} dateofjoining={this.state.user_profile_detail.dateofjoining} gender={this.state.user_profile_detail.gender} dob={this.state.user_profile_detail.dob} work_email={this.state.user_profile_detail.work_email} />
              </div>
              <div className="row no-gutter">
                <div className="col-xs-6 p-t p-r b-r">
                  <FormProfileDetails user_profile_detail={this.state.user_profile_detail} callUpdateProfileDetails={this.callUpdateProfileDetails} />
                  <br />
                  <br />
                  <br />
                  <FormUpdatePassword callUpdatePassword={this.callUpdatePassword} />
                    <br />
                    <br />
                    <br />
                <FormDeviceDetails user_assign_machine={this.state.user_assign_machine} callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails} />
                </div>
                <div className="col-xs-6 p-t p-l">
                  <FormBankDetails user_bank_detail={this.state.user_bank_detail} callUpdateBankDetails={this.callUpdateBankDetails} />
                  <br />
                  <br />
                  <br />
                  <h6 className="text-center">Previous Payslips</h6>
                  <PayslipHistory payslip_history={this.state.payslip_history} />
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
    logged_user: state.logged_user.toJS(),
    myProfile: state.myProfile.toJS(),
    salary: state.salary.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    onMyProfileDetails: () => {
      return dispatch(actions_myProfile.getMyProfileDetails());
    },
    onUpdateBankDetails: (new_bank_details) => {
      return dispatch(actions_myProfile.updateBankDetails(new_bank_details));
    },
    onUpdateProfileDetails: (new_profile_details) => {
      return dispatch(actions_myProfile.updateProfileDetails(new_profile_details));
    },
    onUpdateDeviceDetails: (new_device_details) => {
      return dispatch(actions_myProfile.updateUserDeviceDetails(new_device_details));
    },
    onUpdatePassword: (new_password) => {
      return dispatch(actions_myProfile.updatePassword(new_password));
    },
    onSalaryDetails: () => {
      return dispatch(actions_salary.getSalaryDetails());
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument());
    }
  };
};

const VisibleMyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfile);

const RouterVisibleMyProfile = withRouter(VisibleMyProfile);

export default RouterVisibleMyProfile;
