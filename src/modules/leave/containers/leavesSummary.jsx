import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/index';
import {isNotUserValid} from 'src/services/generic';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import ViewLeavesSummary from 'components/leave/leavesSummary/ViewLeavesSummary';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_leavesSummary from 'appRedux/leave/actions/leavesSummary';

class LeavesSummary extends React.Component {
  constructor (props) {
    super(props);

    this.props.onIsAlreadyLogin();

    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    ''
    };
  }
  componentWillMount () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0

    this.props.onFetchUserPolicyDocument().then(() => {
      this.props.on_all_leaves_summary(year, month);
    });
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user.logged_in, props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Leaves Summary'} showLoading={this.props.frontend.show_loading} />
          <ViewLeavesSummary componentData={this.props.leavesSummary} on_all_leaves_summary={this.props.on_all_leaves_summary} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:         state.frontend.toJS(),
    logged_user:      state.logged_user.toJS(),
    leavesSummary:    state.leavesSummary.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    on_all_leaves_summary: (year, month) => {
      return dispatch(actions_leavesSummary.get_all_leaves_summary(year, month));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument());
    }
  };
};

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary);

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary);

export default RouterVisibleLeavesSummary;
