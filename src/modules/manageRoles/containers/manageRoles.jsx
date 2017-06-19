import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {notify} from 'src/services/index';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import Button from 'components/generic/buttons/Button';
import {isNotUserValid} from 'src/services/generic';
import AlertNotification from 'components/generic/AlertNotification';
import AddRolesForm from 'modules/manageRoles/components/AddRolesForm';
import DisplayRolesList from 'modules/manageRoles/components/DisplayRolesList';
import UsersRolesList from 'components/generic/UsersRolesList';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsManageRoles from 'src/redux/manageRoles/actions/manageRoles';

class ManageRoles extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      status_message: '',
      // hard coded userRoleUpdateDetails json object and will be removed after API will respond with this data in it
      userRoleUpdateDetails: [{'user_Id': '287', 'role_Id': '10' }, {'user_Id': '288', 'role_Id': '12' }, { 'user_Id': '300', 'role_Id': '14' }]
    };
    this.callAddNewRole = this.callAddNewRole.bind(this);
    this.handleChangeActions = this.handleChangeActions.bind(this);
    this.handleChangePages = this.handleChangePages.bind(this);
    this.handleChangeNotification = this.handleChangeNotification.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onUsersList();
    this.props.onRolesList();
  }
  componentWillReceiveProps (props) {
    if (isNotUserValid(this.props.route.path)) {
      this.props.router.push('/logout');
    }
    if (props.logged_user.logged_in === -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.GUEST) {
      } else if (props.logged_user.role === CONFIG.HR) {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read === 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/manage_roles');
        // this.setState({ userRoleUpdateDetails : this.props.manageRoles.rolesData.users_list});
      }
    }
  }
  callAddNewRole (newRoleDetails) {
    this.props.onAddNewRole(newRoleDetails).then((data) => {
      notify(data);
    }, (error) => {
      notify(error);
    });
  }
  handleChangeActions(id2, id1){
    let state = { rolesId: id1, actionId: id2, pageId: '', notificationId: '' };
    this.props.onUpdateRole(state);
  }
  handleChangePages(id2, id1){
    let state = { rolesId: id1, actionId: '', pageId: id2, notificationId: '' };
    this.props.onUpdateRole(state);
  }
  handleChangeNotification(id2, id1){
    let state = { rolesId: id1, actionId: '', pageId: '', notificationId: id2 };
    this.props.onUpdateRole(state);
  }
  onUserClick (userId, roleId) {
    let userRoleUpdateDetails = { userId: userId, roleId: roleId }
    this.props.onUpdateUserRole(userRoleUpdateDetails).then((data) => {
      notify(data);
    }, (error) => {
      notify(error);
    });
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <AlertNotification message={this.props.manageRoles.status_message} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Roles'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-10 m-l p-l p-b">
                  <AddRolesForm callAddNewRole={this.callAddNewRole}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 m-l">
                  <div className="row box">
                    <div className="col-md-12 p-t">
                      <DisplayRolesList
                        displayData={this.props.manageRoles.rolesData}
                        handleChangeActions={(actionId, rolesId) => this.handleChangeActions(actionId, rolesId) }
                        handleChangePages={(pageId, rolesId) => this.handleChangePages(pageId, rolesId) }
                        handleChangeNotification={(notificationId, rolesId) => this.handleChangeNotification(notificationId, rolesId) }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-1 m-l"><div className="row p-l p-r"></div></div>
                <div className="col-md-4 m-l">
                  <div className="row box">
                    <div className="col-md-12 p-t">
                      <UsersRolesList
                        users= {this.props.usersList.users}
                        onChange= {(userId, roleId) => {this.onUserClick(userId, roleId); }}
                        disabledUser= {this.props.usersList.disabled_users}
                        roleName= {this.props.manageRoles.rolesData.roles}
                        assignedRole = {this.state.userRoleUpdateDetails}
                       />
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
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    policy_documents: state.policyDocuments.toJS(),
    usersList: state.usersList.toJS(),
    manageRoles: state.manageRoles.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => { return dispatch(actionsLogin.isAlreadyLogin()); },
    onUsersList: () => { return dispatch(actionsUsersList.get_users_list()); },
    onFetchUserPolicyDocument: () => { return dispatch(actionsPolicy.fetchUserPolicyDocument()); },
    onAddNewRole: (newRoleDetails) => { return dispatch(actionsManageRoles.addNewRole(newRoleDetails)); },
    onRolesList: () => { return dispatch(actionsManageRoles.getRolesList()); },
    onUpdateRole: (roleUpdateDetails) => { return dispatch(actionsManageRoles.updateRoles(roleUpdateDetails)); },
    onUpdateUserRole: (userRoleUpdateDetails) => { return dispatch(actionsManageRoles.updateUserRole(userRoleUpdateDetails)); }
  };
};

const VisibleManageUsers = connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
const RouterVisibleManageUsers = withRouter(VisibleManageUsers);
export default RouterVisibleManageUsers;

ManageRoles.PropTypes = {
  onIsAlreadyLogin: PropTypes.func.isRequired,
  usersList: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};
