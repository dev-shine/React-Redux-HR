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
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';

class ManageRoles extends React.Component {
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
    console.log(props, 'recieveprops');
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
        this.props.router.push('/home');
      }
    }
  }
  componentDidUpdate () {

  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <AlertNotification />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Roles'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-4 p-b">
                  <div className="row box">
                    <div className="col-md-12 p-t p-b p-r b-r">
                      <AddRolesForm />
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
    teamList: state.teamList.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => { return dispatch(actionsLogin.isAlreadyLogin()); },
    onUsersList: () => { return dispatch(actionsUsersList.get_users_list()); },
    onFetchUserPolicyDocument: () => { return dispatch(actionsPolicy.fetchUserPolicyDocument()); }
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
