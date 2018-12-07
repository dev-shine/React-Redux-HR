import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {notify} from '../../../services/notify';
import Menu from '../../../components/generic/Menu';
import {isNotUserValid} from '../../../services/generic';
import Header from '../../../components/generic/Header';
import AlertNotification from '../../../components/generic/AlertNotification';
import EmployeeDetails from '../../../components/manageUser/EmployeeDetails';
import * as actions from '../../../redux/actions';
import * as actionsManageUsers from '../../../redux/manageUsers/actions/manageUsers';

class AllEmployesDetails extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      
    };
  }
  componentWillMount () {
    this.props.getAllEmployeeDetails();
  }
  componentWillReceiveProps (props) {
    let {location, loggedUser} = props;
    let isNotValid = isNotUserValid(location.pathname, loggedUser);
    if (isNotValid.status) {
      this.props.history.push(isNotValid.redirectTo);
    }
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
          <div className="app-body" id="view">
             <div className="padding">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 p" id="manage-user">
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
                                <div className="col-sm-1 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">DOJ</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">Salary</div>
                                </div>
                                <div className="col-sm-2 col-xs-12 cell">
                                    <div className="col-sm-12 salary-title">Team</div>
                                </div>
                                <div className="col-sm-1 col-xs-12 cell">
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
    loggedUser:     state.logged_user.userLogin,
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
