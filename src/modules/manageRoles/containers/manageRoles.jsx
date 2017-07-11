import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import AlertNotification from 'components/generic/AlertNotification';
import AddRolesForm from 'modules/manageRoles/components/AddRolesForm';
import DisplayRolesLists from 'modules/manageRoles/components/DisplayRolesLists';
import UsersRolesList from 'components/generic/UsersRolesList';
import * as actions from 'appRedux/actions';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsManageRoles from 'src/redux/manageRoles/actions/manageRoles';

class ManageRoles extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      status_message: ''
    };
    this.callAddNewRole = this.callAddNewRole.bind(this);
    this.handleChangeActions = this.handleChangeActions.bind(this);
    this.handleChangePages = this.handleChangePages.bind(this);
    this.handleChangeNotification = this.handleChangeNotification.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }
  componentWillMount () {
    this.props.onRolesList();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  callAddNewRole (newRoleDetails) {
    this.props.onAddNewRole(newRoleDetails);
  }
  handleChangeActions (id2, id1) {
    let state = {rolesId: id1, actionId: id2, pageId: '', notificationId: ''};
    this.props.onUpdateRole(state);
  }
  handleChangePages (id2, id1) {
    let state = {rolesId: id1, actionId: '', pageId: id2, notificationId: ''};
    this.props.onUpdateRole(state);
  }
  handleChangeNotification (id2, id1) {
    let state = {rolesId: id1, actionId: '', pageId: '', notificationId: id2};
    this.props.onUpdateRole(state);
  }
  onUserClick (userId, roleId) {
    let userRoleUpdateDetails = {userId: userId, roleId: roleId};
    if (roleId !== '-1') {
      this.props.onUpdateUserRole(userRoleUpdateDetails);
      this.props.onRolesList();
    }
  }
  handleDelete (id) {
    this.props.onDelete(id).then((data) => { notify(data); }, (error) => { notify(error); });
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
                  <AddRolesForm callAddNewRole={this.callAddNewRole} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 m-l">
                  <div className="row box">
                    <div className="col-md-12 navside p-t">
                      <DisplayRolesLists
                        displayData={this.props.manageRoles.rolesData}
                        handleClick={(id) => this.click(id)}
                        handleChangeActions={(actionId, rolesId) => this.handleChangeActions(actionId, rolesId)}
                        handleChangePages={(pageId, rolesId) => this.handleChangePages(pageId, rolesId)}
                        handleChangeNotification={(notificationId, rolesId) => this.handleChangeNotification(notificationId, rolesId)}
                        handleDelete={(id) => { this.handleDelete(id); this.setState({deleteId: id}); }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-1 m-l"><div className="row p-l p-r"></div></div>
                <div className="col-md-4 m-l">
                  <div className="row box">
                    <div className="col-md-12 p-t">
                      <UsersRolesList
                        users={this.props.manageRoles.rolesData}
                        onChange={(userId, roleId) => { this.onUserClick(userId, roleId); }}
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
    frontend:    state.frontend.toJS(),
    loggedUser:  state.logged_user.userLogin,
    usersList:   state.usersList.toJS(),
    manageRoles: state.manageRoles.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => { return dispatch(actions.isAlreadyLogin()); },
    onAddNewRole:     (newRoleDetails) => { return dispatch(actionsManageRoles.addNewRole(newRoleDetails)); },
    onRolesList:      () => { return dispatch(actionsManageRoles.getRolesList()); },
    onUpdateRole:     (roleUpdateDetails) => { return dispatch(actionsManageRoles.updateRoles(roleUpdateDetails)); },
    onUpdateUserRole: (userRoleUpdateDetails) => { return dispatch(actionsManageRoles.updateUserRole(userRoleUpdateDetails)); },
    onDelete:         (id) => { return dispatch(actionsManageRoles.deleteRole(id)); }
  };
};

const VisibleManageUsers = connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
const RouterVisibleManageUsers = withRouter(VisibleManageUsers);
export default RouterVisibleManageUsers;

ManageRoles.PropTypes = {
  onIsAlreadyLogin:          PropTypes.func.isRequired,
  onFetchUserPolicyDocument: PropTypes.func.isRequired,
  onRolesList:               PropTypes.func.isRequired,
  route:                     PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  loggedUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    data:       PropTypes.object.isRequired
  }).isRequired,
  policy_documents: PropTypes.shape({
    policyDocuments: PropTypes.object
  }).isRequired,
  usersList: PropTypes.object.isRequired,
  router:    PropTypes.object.isRequired
};
