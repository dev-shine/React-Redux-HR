import React from 'react'
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import AlertNotification from '../../components/generic/AlertNotification'
import UserHorizontalView from '../../components/generic/UserHorizontalView'
import Header from '../../components/generic/header'

import FormProfileDetails from '../../components/myProfile/FormProfileDetails'
import FormDeviceDetails from '../../components/myProfile/FormDeviceDetails'

import * as actions_login from '../../actions/login/index'
import * as actions_myProfile from '../../actions/user/myProfile'
import * as actions_policy from '../../actions/policyDocuments/index'

class MyInventory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status_message: '',
      user_profile_detail: {},
      user_assign_machine: []
    }
    this.props.onIsAlreadyLogin()
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this)
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument()
    this.props.onMyProfileDetails()
  }
  componentWillReceiveProps (props) {
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0 }) || []
      if (unread.length > 0) {
        this.props.router.push('/policy_documents')
      }
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail,
      user_assign_machine: props.myProfile.user_assign_machine})
  }

  callUpdateUserDeviceDetails (new_device_details) {
    this.props.onUpdateDeviceDetails(new_device_details).then((data) => {}, (error) => {
      notify(error)
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
              <div className="row no-gutter">
                  <UserHorizontalView profileImage={this.props.logged_user.profileImage} name={this.state.user_profile_detail.name} jobtitle={this.state.user_profile_detail.jobtitle} inventory />
              </div>
              <div className="row no-gutter">
            <FormDeviceDetails
              user_assign_machine={this.state.user_assign_machine}
              callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    myProfile: state.myProfile.toJS(),
    policy_documents: state.policyDocuments.toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onMyProfileDetails: () => {
      return dispatch(actions_myProfile.getMyProfileDetails())
    },
    onUpdateDeviceDetails: (new_device_details) => {
      return dispatch(actions_myProfile.updateUserDeviceDetails(new_device_details))
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument())
    }
  }
}

const VisibleMyInventory = connect(mapStateToProps, mapDispatchToProps)(MyInventory)

const RouterVisibleMyInventory = withRouter(VisibleMyInventory)

export default RouterVisibleMyInventory
