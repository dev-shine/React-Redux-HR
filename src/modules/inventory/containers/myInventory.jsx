import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UserHorizontalView from 'components/generic/UserHorizontalView';
import DeviceDetails from 'components/inventory/deviceDetails';
import * as actionsMyProfile from 'appRedux/myProfile/actions/myProfile';
import * as actions from 'appRedux/actions';
import * as actionsManageDevice from 'appRedux/inventory/actions/inventory'
import UnassignDevice from 'modules/inventory/components/UnassignDevice'
import AssignDevice from 'modules/inventory/components/AssignDevice'

class MyInventory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {    
      status_message:      '',
      openUnassigned:      false,
      openAssigned:       false,
      user_profile_detail: {},
      user_assign_machine: [],
      device:              []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
    this.unassignDevice = this.unassignDevice.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddDialog = this.handleAddDialog.bind(this);
    this.handleCloseAssign = this.handleCloseAssign.bind(this);
    this.callAddUserComment = this.callAddUserComment.bind(this);
  }
  
  componentWillMount () {
    this.props.onMyProfileDetails();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail,
      user_assign_machine: props.myProfile.user_assign_machine});
  }

  callUpdateUserDeviceDetails (newDeviceDetails) {
    this.props.onUpdateDeviceDetails(newDeviceDetails).then((data) => {}, (error) => {
      notify('Error', error, 'error');
    });
  }
  unassignDevice (val) {
    this.setState({
      openUnassigned: true,
      status_message: '',
      device:         val
    });
  }
  handleClose () {
    this.setState({
      openUnassigned: false,
      status_message: '',
    });
  }
  handleCloseAssign(){
    this.setState({
      openAssigned:   false,
      status_message: '',
    });
  }
  handleAddDialog () {
    this.setState({
      openAssigned:   true,
      status_message: '',
    });
  }
  callAddUserComment (addUserCommentDetails) {
    this.props.onAddUserComment(addUserCommentDetails);
    this.setState({
      openUnassigned: false,
      status_message: '',
    })
  }

  render () {
    return (
      <div>
          <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Inventory'} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter m-b-md">
                <UserHorizontalView
                  profileImage={this.props.loggedUser.data.profileImage}
                  name={this.state.user_profile_detail.name}
                  jobtitle={this.state.user_profile_detail.jobtitle}
                  inventory
                />
              </div>
              <AssignDevice 
                handleCloseAssign={this.handleCloseAssign}
                openAssign={this.state.openAssigned}
                handleAddDialog={this.handleAddDialog}
              />
              <DeviceDetails
                unassignDevice={this.unassignDevice}
                userAssignMachine={this.state.user_assign_machine}
                callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails}
              />
            </div>
              <UnassignDevice 
                callAddUserComment={this.callAddUserComment}
                user_Id={this.state.user_profile_detail.user_Id}
                handleClose={this.handleClose}
                open={this.state.openUnassigned}
                device={this.state.device}
              /> 
          </div>
        </div> 
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:   state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    myProfile:  state.myProfile.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onMyProfileDetails: () => {
      return dispatch(actionsMyProfile.getMyProfileDetails());
    },
    onUpdateDeviceDetails: (newDeviceDetails) => {
      return dispatch(actionsMyProfile.updateUserDeviceDetails(newDeviceDetails));
    },
    onAddUserComment: (addUserCommentDetails) => {
      return dispatch(actionsManageDevice.addUserComment(addUserCommentDetails));
    }
  };
};

const RouterVisibleMyInventory = withRouter(connect(mapStateToProps, mapDispatchToProps)(MyInventory));

export default RouterVisibleMyInventory;
