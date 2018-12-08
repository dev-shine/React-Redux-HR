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
    const {manageUsers, frontend}= this.props;
    return (
      <div>
        <AlertNotification message={manageUsers.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'All Employees'} showLoading={frontend.show_loading} userListHeader />
          <div className="app-body" id="view">
             <div className="padding">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 p" id="manage-user">
                  <div className="row box">
                  <div className="p-a block ">
                      <h6 className="text-center">All Employees Details</h6>
                      <hr />
                      <EmployeeDetails  allEmpolyesDetails={manageUsers.allEmpolyesDetails}  />
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
    managePayslips: state.managePayslips.toJS(),
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
