import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';

import * as _ from 'lodash';
import Menu from 'src/components/generic/Menu';
import LoadingIcon from 'components/generic/LoadingIcon';
import Header from 'components/generic/Header';

import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import Template from '../components/Template';

import Variables from '../components/Variable';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';

class VariablesContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
    };
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onFetchVariables();
  }
  componentWillReceiveProps (props) {
      // window.scrollTo(0, 0);

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

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Template Variable'} {...this.props} />
          <Variables {...this.props} />
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    variable: state.template.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    	 onIsAlreadyLogin: () => {
       return dispatch(actions_login.isAlreadyLogin());
     },
    onFetchVariables: () => {
      return dispatch(actions_templates.get_variable());
    },
    onSaveVariable: (id, variable) => {
      return dispatch(actions_templates.saveVariable(id, variable));
    },
    onDeleteVariable: (id) => {
      return dispatch(actions_templates.deleteVariable(id));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument());
    }
  };
};

const VisibleVariablesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariablesContainer);

const RouterVisibleVariablesContainer = withRouter(VisibleVariablesContainer);

export default RouterVisibleVariablesContainer;
