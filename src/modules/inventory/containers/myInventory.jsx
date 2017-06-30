import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {notify} from 'src/services/index';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import UserHorizontalView from 'components/generic/UserHorizontalView';
import DeviceDetails from 'components/inventory/deviceDetails';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsMyProfile from 'src/actions/user/myProfile';

class MyInventory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status_message:      '',
      user_profile_detail: {},
      user_assign_machine: []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onMyProfileDetails();
  }
  componentWillReceiveProps (props) {
    if (props.logged_user.logged_in === -1) {
      this.props.router.push('/logout');
    } else {
      let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read === 0; }) || [];
      if (unread.length > 0) {
        this.props.router.push('/policy_documents');
      }
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail,
      user_assign_machine: props.myProfile.user_assign_machine});
  }

  callUpdateUserDeviceDetails (newDeviceDetails) {
    this.props.onUpdateDeviceDetails(newDeviceDetails).then((data) => {}, (error) => {
      notify(error);
    });
  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Inventory'} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter">
                <UserHorizontalView
                  profileImage={this.props.logged_user.profileImage}
                  name={this.state.user_profile_detail.name}
                  jobtitle={this.state.user_profile_detail.jobtitle}
                  inventory
                />
              </div>
              <div className="row no-gutter">
                <DeviceDetails
                  userAssignMachine={this.state.user_assign_machine}
                  callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails}
                />
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
    frontend:         state.frontend.toJS(),
    logged_user:      state.logged_user.toJS(),
    myProfile:        state.myProfile.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onMyProfileDetails: () => {
      return dispatch(actionsMyProfile.getMyProfileDetails());
    },
    onUpdateDeviceDetails: (newDeviceDetails) => {
      return dispatch(actionsMyProfile.updateUserDeviceDetails(newDeviceDetails));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }
  };
};

const VisibleMyInventory = connect(mapStateToProps, mapDispatchToProps)(MyInventory);

const RouterVisibleMyInventory = withRouter(VisibleMyInventory);

export default RouterVisibleMyInventory;
