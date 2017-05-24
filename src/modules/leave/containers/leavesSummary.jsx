import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as _ from 'lodash'

import {notify} from '../../../services/index'

import Menu from '../../../components/generic/Menu'
import Header from '../../../components1/generic/Header'

import {CONFIG} from '../../../config/index'

import * as actions_login from '../../../redux/auth/actions/index'
import * as actions_policy from '../../../redux/policyDocuments/actions/index'
import * as actions_leavesSummary from '../../../redux/leave/actions/leavesSummary'

import ViewLeavesSummary from '../../../components1/leave/leavesSummary/ViewLeavesSummary'

class LeavesSummary extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      "defaultUserDisplay": "",
      "daysummary_userid": "",
      "daysummary_date": ""
    }
  }
  componentWillMount() {
    let d = new Date();
    let year = d.getFullYear()
    let month = d.getMonth() + 1 // +1 since getMonth starts from 0

    this.props.onFetchUserPolicyDocument().then(()=>{
      this.props.on_all_leaves_summary(year, month)
    });
  }
  componentWillReceiveProps(props) {
    window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if( props.logged_user.role == CONFIG.ADMIN ||  props.logged_user.role == CONFIG.GUEST ){

      } else if (props.logged_user.role == CONFIG.HR){
        let unread = _.filter(props.policy_documents.policyDocuments, function(o) { return o.read == 0; }) || [];
        if(unread.length > 0){
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }

  }
  render() {
    return (
      <div>
        <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"Leaves Summary"} showLoading={this.props.frontend.show_loading} />
          <ViewLeavesSummary componentData={this.props.leavesSummary} on_all_leaves_summary={this.props.on_all_leaves_summary} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    leavesSummary: state.leavesSummary.toJS(),
    policy_documents: state.policyDocuments.toJS(),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    on_all_leaves_summary: (year, month) => {
      return dispatch(actions_leavesSummary.get_all_leaves_summary(year, month))
    },
    onFetchUserPolicyDocument: ()=>{
      return dispatch(actions_policy.fetchUserPolicyDocument());
    },
  }
}

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary)

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary)

export default RouterVisibleLeavesSummary
