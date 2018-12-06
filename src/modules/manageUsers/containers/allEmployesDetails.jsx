import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ToggleButton from 'react-toggle-button';
import PropTypes from 'prop-types';
import {notify} from '../../../services/notify';
import Menu from '../../../components/generic/Menu';
import {isNotUserValid} from '../../../services/generic';
import Header from '../../../components/generic/Header';
import ButtonRaised from '../../../components/generic/buttons/ButtonRaised';
import UsersList from '../../../components/generic/UsersList';
import UsersListHeader from '../../../components/generic/UsersListHeader';
import UpdateEmployeeDocument from '../components/UpdateEmployeeDocument';
import Button from '../../../components/generic/buttons/Button';
import AlertNotification from '../../../components/generic/AlertNotification';
import EmployeeDetails from '../../../components/manageUser/EmployeeDetails';
import FormAddNewEmployee from '../components/FormAddNewEmployee';
import AddSalaryForm from '../../salary/components/manageSalary/AddSalaryForm';
import FormAddNewEmployeeDetails from '../components/FormAddNewEmployeeDetails';
import FormUserProfileDetails from '../components/FormUserProfileDetails';
import EmployeeLifeCycle from '../components/EmployeeLifeCycle';
import * as actions from '../../../redux/actions';
import * as actionsUsersList from '../../../redux/generic/actions/usersList';
import * as actionsManageUsers from '../../../redux/manageUsers/actions/manageUsers';
import * as actionsManagePayslips from '../../../redux/salary/actions/managePayslips';
import * as actions_manageSalary from '../../../redux/salary/actions/manageSalary';
import { RaisedButton } from 'material-ui';
import Dialog from 'material-ui/Dialog';

class AllEmployesDetails extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      status_message:       '',
      'defaultUserDisplay': '',
      user_profile_detail:  {},
      user_bank_detail:     [],
      user_assign_machine:  [],
      user_documents:       {},
      user_payslip_history: [],
      employee_life_cycle:  {},
      'openIframe':         false,
      username:             '',
      open:                 false
    };
  }
  componentWillMount () {
    this.props.getAllEmployeeDetails();
  }
  componentWillReceiveProps (props) {
    let {location, loggedUser, managePayslips:{user_payslip_history}, manageUsers:{username, user_profile_detail, user_bank_detail, user_assign_machine, user_documents, stages}} = props;
    // let isNotValid = isNotUserValid(location.pathname, loggedUser);
    // if (isNotValid.status) {
    //   this.props.history.push(isNotValid.redirectTo);
    // }
  }
  
  render () {
    console.log('this.props', this.props);
    let data;
    const {manageUsers}= this.props;
    let allEmpolyesDetails = manageUsers.allEmpolyesDetails
    if (!allEmpolyesDetails.length ) {
      data = (<div className="well well-lg" style={{'color':"red"}} >
        <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
        No Employee available </div>)
    }else {
      data = allEmpolyesDetails.map((employee, index) => {
        return (
          <EmployeeDetails key={index} employee={employee} displayPage="employeeDtails"  />
        )
      });
    }
    return (
      <div>
        <AlertNotification message={this.props.manageUsers.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'All Employees'} showLoading={this.props.frontend.show_loading} userListHeader />
          {/* <UsersListHeader users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} /> */}
          <div className="app-body" id="view">
             <div className="padding">
              <div className="row">
                {/* <div className="col-md-2 col-sm-3" id="fixedScroll">
                  <UsersList
                    users={this.props.usersList.users}
                    selectedUserId={this.state.selected_user_id}
                    onUserClick={this.onUserClick}
                    top={5} {...this.props}
                  />
                </div> */}
                <div className="col-md-12 col-sm-12 col-xs-12 p" id="manage-user">
                  {/* <div className="row emp-action-btn p-b">
                    <div className="add-new-emp">
                      <ButtonRaised className="col-xs-12 m-b-sm indigo"
                        onClick={() => this.handleFormAddNewEmployee()}
                        label={'Add Employee'} />
                    </div>
                    <div className="disable-user">
                      <Button className="btn-fw btn-danger responsive-p-x-sm" label={'Disable Selected User'} onClick={() => this.changeEmployeeStatus(this.state.selected_user_id, 'Disabled')} />
                    </div>
                    <div className="slack-notification">
                      <div className="btn-wrapper">
                        <label>
                          <i className="fa fa-bell-slash fa-lg" aria-hidden="true"></i> Slack Notifications
                        </label>
                        <span>
                          <ToggleButton
                            value={this.state.user_profile_detail.slack_msg === '0' || false}
                            onToggle={() => {
                              let user = this.refs.userForm.state;
                              if (user.slack_msg === '0') user.slack_msg = '1';
                              else if (user.slack_msg === '1') user.slack_msg = '0';
                              this.callUpdateUserProfileDetails(user);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="row box">
                    <EmployeeLifeCycle employee_life_cycle={this.state.employee_life_cycle} handleChangeSteps={(stepid) => this.handleChangeSteps(stepid, this.state.selected_user_id)} />
                  </div> */}
                  <div className="row box">
                  <div className="p-a block ">
                      <h6 className="text-center">All Employees Details</h6>
                      <hr />
                      <div className="content-salary">
                      <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
                            <div className="col-md-12 salary-col-padding" >
                                <div className="col-md-2 col-sm-2 col-xs-12 employee-profile">
                                    <div className="col-sm-12 salary-total-title">Profile</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">DOJ</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">PAN No.</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">Mobile</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">Emergency Contact No.</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">Other details</div>
                                </div>
                            </div>
                        </div>
                          {/* <div className="row salary-blocks-margin salary-row-bg employee-details" onClick={(e) => {}}>
                            <div className="col-md-12 salary-col-padding" >
                                <div className="col-md-1 col-sm-2 col-xs-12 salary-total-width employee-profile">
                                    <div className="col-sm-12 salary-total-title">Profile</div>
                                </div>
                                <div className="col-md-5 col-sm-10 col-xs-12 bg-success salary-block salary-addition-width">
                                    <div className="col-sm-2 col-xs-12 cell">
                                        <div className="col-sm-12 salary-title">DOJ</div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 cell">
                                        <div className="col-sm-12 salary-title">Contact No.</div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 cell">
                                        <div className="col-sm-12 salary-title">Work Email</div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12 bg-danger salary-block salary-deduction-width">
                                    <div className="col-sm-2 col-xs-12 cell">
                                        <div className="col-sm-12 salary-title">PAN No.</div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 cell ">
                                        <div className="col-sm-12 salary-title">Bank A/c No.</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {data}
                      </div>
                  </div>
                  </div>
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
    manageUsers:    state.manageUsers.toJS(),
    teamList:       state.teamList.teamList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    getAllEmployeeDetails: () => {
      return dispatch(actionsManageUsers.getAllEmployeeDetails());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllEmployesDetails));
