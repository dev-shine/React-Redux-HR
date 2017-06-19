import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/index';
import { CONFIG } from 'src/config/index';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import ListLeaves from 'components/leave/manageLeaves/ListLeaves';
import ViewLeave from 'modules/leave/components/manageLeaves/ViewLeave';
import LeaveColorReference from 'components/leave/manageLeaves/LeaveColorReference';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_listLeaves from 'appRedux/leave/actions/listLeaves';
import * as actions_manageLeave from 'appRedux/leave/actions/manageLeave';

class ManageLeaves extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      loading: true,
      selectedTab: '',
      leaveListItems: [],
      all_leaves: [],
      selectedLeave: {},
    }
    this.doLeaveStatusChange = this.doLeaveStatusChange.bind(this);
    this.filterLeaveList = this.filterLeaveList.bind(this);
    this.selectLeave = this.selectLeave.bind(this);
  }
  componentDidMount () {
    this.props.onFetchUserPolicyDocument()
    this.props.onListLeaves(this.props.logged_user.role)
  }
  componentWillMount () {

  }
  componentWillReceiveProps (props) {
    var selectedTab = '';
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST) {
        selectedTab = 'ApprovedByHr';
      } else if (props.logged_user.role == CONFIG.HR) {
        selectedTab = 'Pending';
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0 }) || []
        if (unread.length > 0) {
          this.props.router.push('/policy_documents')
        }
      } else {
        this.props.router.push('/monthly_attendance')
      }
    }
    if (!_.isEqual(props.listLeaves.all_leaves,this.state.all_leaves)) {
      let tab = localStorage.getItem("activeTab");
      if (!_.isEmpty(tab))  {
        selectedTab = tab;
      }
      this.setState({
        all_leaves: props.listLeaves.all_leaves,
        selectedTab: selectedTab,
      }, ()=>{
        this.filterLeaveList(selectedTab);
      });
    }
  }
  doLeaveStatusChange (id, newstatus, messagetouser) {
    this.props.onChangeLeaveStatus(id, newstatus, messagetouser).then(
        (data) => {

        }, (error) => {
            // notify( error );
    })
  }
  selectLeave (leaveId) {
    if (leaveId !== this.state.selectedLeave.id) {
      var select = _.find(this.state.leaveListItems, { 'id': leaveId });
      this.setState({
        selectedLeave: select,
      });
    }
  }

  filterLeaveList(activeTab) {
    var all_leaves = this.state.all_leaves;
    let newLeavesList;
    if (activeTab === 'Pending') {
      newLeavesList = _.filter(all_leaves, function(o) { return o.status === 'Pending' && parseInt(o.hr_approved) === 0; });
    }  else if (activeTab === 'ApprovedByHr') {
      newLeavesList = _.filter(all_leaves, function(o) { return o.status === 'Pending' && parseInt(o.hr_approved) === 1; });
    } else if (activeTab === 'NotApprovedByHr') {
      newLeavesList = _.filter(all_leaves, function(o) { return o.status === 'Pending' && (parseInt(o.hr_approved) === 2 || parseInt(o.hr_approved) === 0); });
    } else {
      newLeavesList = _.filter(all_leaves, { 'status': activeTab })
    }

    var selectedLeave = newLeavesList[0] || {};
    if (!_.isEmpty(this.state.selectedLeave)) {
      var select = _.filter(newLeavesList, { 'id': this.state.selectedLeave.id });
      if (_.size(select) > 0) {
        selectedLeave = select[0];
      }
    }

    this.setState({
      loading: false,
      leaveListItems: newLeavesList,
      selectedLeave: selectedLeave,
      selectedTab: activeTab
    });
    localStorage.setItem("activeTab", activeTab);
  }
	render () {
    let styles = _.cloneDeep(this.constructor.styles);
    let status_message = ''
    if (this.props.manageLeave.status_message != '') {
      status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.manageLeave.status_message}</span>
    }

    let tabContent;
    if (!this.state.loading && (_.isEmpty(this.state.selectedLeave) || _.isEmpty(this.state.leaveListItems))) {
      tabContent = (<div className="row-col row-col-xs b-b" style={styles.spinContainer}>
       <span className="" style={styles.spiner}>No data found</span>
       </div>);
    } else if (!this.state.loading && (!_.isEmpty(this.state.selectedLeave) && !_.isEmpty(this.state.leaveListItems))) {
      tabContent = <div className="row-col row-col-xs b-b">
        <div className="col-sm-3 light bg b-r">
          <ListLeaves listItems={this.state.leaveListItems} selectedLeave={this.state.selectedLeave} selectLeave={this.selectLeave} {...this.props} />
        </div>
        <div className="col-sm-9 light bg b-r">
          <ViewLeave selectedLeave={this.state.selectedLeave} doLeaveStatusChange={this.doLeaveStatusChange} {...this.props} />
        </div>
      </div>;
    } else if (this.state.loading) {
      tabContent = <div className="row-col row-col-xs b-b" style={styles.spinContainer}>
        <i className="fa fa-spinner fa-pulse fa-3x" style={styles.spiner} aria-hidden="true"></i>
        </div>;
    }
    return (
      <div>
        <Menu {...this.props} />
          <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Leaves' + status_message} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-12">
                  <LeaveColorReference  filterLeaveList={this.filterLeaveList} selectedTab={this.state.selectedTab} userRole={this.props.logged_user.role} />
                </div>
              </div>
              {tabContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ManageLeaves.styles = {
  spinContainer: {
    'textAlign': 'center',
    'fontSize': '50px',
    'color': '#808080',
  },
  spiner: {
    'margin': '50px auto'
  }
}
function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    listLeaves: state.listLeaves.toJS(),
    manageLeave: state.manageLeave.toJS(),
    policy_documents: state.policyDocuments.toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onListLeaves: (role) => {
      return dispatch(actions_listLeaves.getAllLeaves(role))
    },
    onAddDescription: (leaveid, hr, data) => {
      return dispatch(actions_manageLeave.onAddDescription(leaveid, hr, data))
    },
    onAddExtraDay: (leaveid, token, data) => {
      return dispatch(actions_manageLeave.onAddExtraDay(leaveid, token, data))
    },
    onChangeLeaveStatus: (leaveid, newstatus, messagetouser) => {
      return dispatch(actions_manageLeave.changeLeaveStatus(leaveid, newstatus, messagetouser))
    },
    onDocRequired: (leaveid, data, comment) => {
      return dispatch(actions_manageLeave.docRequired(leaveid, data, comment))
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument())
    }
  }
}

const VisibleManageLeaves = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageLeaves)

const RouterVisibleManageLeaves = withRouter(VisibleManageLeaves)

export default RouterVisibleManageLeaves
