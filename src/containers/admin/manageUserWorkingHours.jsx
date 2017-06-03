import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import {CONFIG} from '../../config/index'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import UsersList from '../../components/generic/UsersList'
import Header from '../../components/generic/header'

import ListUserWorkingHours from '../../components/manageUserWorkingHours/ListUserWorkingHours'
import FormAddUserWorkingHours from '../../components/manageUserWorkingHours/FormAddUserWorkingHours'

import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_usersList from 'appRedux/generic/actions/usersList';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_manageUserWorkingHours from '../../actions/admin/manageUserWorkingHours'

import UserDaySummary from '../../components/attendance/UserDaySummary'

class ManageUserWorkingHours extends React.Component {
  constructor(props) {
    super(props);

    this.props.onIsAlreadyLogin()

    this.state = {
      "defaultUserDisplay": "",
      "daysummary_userid": "",
      "daysummary_date": ""
    }

    this.onUserClick = this.onUserClick.bind(this)
    this.onShowDaySummary = this.onShowDaySummary.bind(this)
    this.callAddUserWorkingHours = this.callAddUserWorkingHours.bind(this)
  }
  componentWillMount() {
    this.props.onFetchUserPolicyDocument();
    this.props.onUsersList()
  }
  componentWillReceiveProps(props) {
    //window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST ){

      }else if (props.logged_user.role == CONFIG.HR) {
        //this.props.onUsersList( )
        let unread = _.filter(props.policy_documents.policyDocuments, function(o) { return o.read == 0; }) || [];
        if(unread.length > 0){
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }

    if (this.state.defaultUserDisplay == '') {
      if (props.usersList.users.length > 0) {
        let firstUser = props.usersList.users[0]
        let defaultUserId = firstUser.user_Id
        this.onUserClick(defaultUserId)
      }
    }

  }
  onUserClick(userid) {
    this.setState({"defaultUserDisplay": userid})
    //let d = new Date();
    //let year = d.getFullYear()
    //let month = d.getMonth() + 1  // +1 since getMonth starts from 0
    //this.props.onMonthAttendance( userid, year, month )

    this.props.onUserWorkingHoursData(userid)

  }
  onShowDaySummary(userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date})
    this.props.onUserDaySummary(userid, date)
  }

  callAddUserWorkingHours(userid, date, working_hours, reason) {
    this.props.onAddUserWorkingHours(userid, date, working_hours, reason).then((data) => {}, (error) => {
      notify(error);
    })
  }

  render() {

    let status_message = ""
    if (this.props.manageUserWorkingHours.status_message != '') {
      status_message = <span className="label label-lg primary pos-rlt m-r-xs">
        <b className="arrow left b-primary"></b>{this.props.manageUserWorkingHours.status_message}</span>
    }

    let selectedUserImage = ""
    let selectedUserName = ""
    let selectedUserJobtitle = ""
    let selectedUserId = ""
    try {
      selectedUserImage = this.props.manageUserWorkingHours.userInfo.slack_profile.profile.image_192
      selectedUserName = this.props.manageUserWorkingHours.userInfo.name
      selectedUserJobtitle = this.props.manageUserWorkingHours.userInfo.jobtitle
      selectedUserId = this.props.manageUserWorkingHours.userInfo.user_Id
    } catch (err) {}

    let mainDivs = <div className="row">

      <div className="col-md-3">
        <UsersList users={this.props.usersList.users} selectedUserId={this.state.defaultUserDisplay} onUserClick={this.onUserClick} {...this.props }/>
      </div>

      <div className="col-md-9">

        <div className="box">
          <div className="item">
            <div className="item-bg">
              <img src={selectedUserImage} className="blur"/>
            </div>
            <div className="p-a-lg pos-rlt text-center">
              <img src={selectedUserImage} className="img-circle w-56"/>
            </div>
          </div>
          <div className="p-a text-center">
            <a href="" className="text-md m-t block">{selectedUserName}</a>
            <p>
              <small>{selectedUserJobtitle}</small>
            </p>
          </div>
        </div>

        <div className="row no-gutter b-t box">
          <div className="col-xs-3 b-r box">
            <div className="p-a block ">
              <h6 className="text-center">Existing Working Hours</h6>
              <hr/>
              <ListUserWorkingHours {...this.props}/>
            </div>
          </div>
          <div className="col-xs-9 b-r box">
            <div className="p-a block">
              <h6 className="text-center">Add New</h6>
              <hr/>
              <FormAddUserWorkingHours {...this.props} userid={selectedUserId} callAddUserWorkingHours={this.callAddUserWorkingHours}/>
            </div>
          </div>

        </div>

      </div>

    </div>

    return (
      <div>
        <Menu {...this.props }/>

        <div id="content" className="app-content box-shadow-z0" role="main">

          <Header pageTitle={"Manage Employees Working Hours"+status_message} {...this.props} />

          <div className="app-body" id="view">

            <div className="padding">
              {mainDivs}
            </div>

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    usersList: state.usersList.toJS(),
    manageUserWorkingHours: state.manageUserWorkingHours.toJS(),
    policy_documents: state.policyDocuments.toJS(),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    },
    onUserWorkingHoursData: (userid) => {
      return dispatch(actions_manageUserWorkingHours.get_managed_user_working_hours(userid))
    },
    onAddUserWorkingHours: (userid, date, working_hours, reason) => {
      return dispatch(actions_manageUserWorkingHours.add_user_working_hours(userid, date, working_hours, reason))
    },
    onFetchUserPolicyDocument: ()=>{
      return dispatch(actions_policy.fetchUserPolicyDocument());
    },

  }
}

const VisibleManageUserWorkingHours = connect(mapStateToProps, mapDispatchToProps)(ManageUserWorkingHours)

const RouterVisibleManageUserWorkingHours = withRouter(VisibleManageUserWorkingHours)

export default RouterVisibleManageUserWorkingHours
