import React from 'react'
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'
import AlertNotification from '../../components/generic/AlertNotification'

import * as actions_manageDevice from '../../actions/admin/inventory'
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_manageUsers from '../../actions/admin/manageUsers'

import UsersList from '../../components/generic/UsersList'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'
import FormAddNewInventory from '../../components/inventory/AddInventory'
import ViewUserDevice from '../../components/inventory/ViewUser'
import InventoryList from '../../components/attendance/InventoryList'
// import InventoryColorReference from '../../components/inventory/InventoryColorReference'

class InventorySystem extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      'defaultUserDisplay': '',
      status_message: '',
      active: 'active',
      firstArrow: 'show',
      secondArrow: 'hidden',
      deviceList: 'show',
      viewUser: 'hidden',
      open: false,
      edit: false,
      deviceId: '',
      user_profile_detail: {},
      user_assign_machine: [],
      getByIdData: {}
    }
    this.onUserClick = this.onUserClick.bind(this)
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this)
    this.openEditDevice = this.openEditDevice.bind(this)
    this.handleAddDialog = this.handleAddDialog.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.deleteDevices = this.deleteDevices.bind(this)
    this.callAssign = this.callAssign.bind(this)
    this.openPage = this.openPage.bind(this)
    this.callFetchDeviceType = this.callFetchDeviceType.bind(this)
    this.callFetchDeviceStatus = this.callFetchDeviceStatus.bind(this)
  }
  componentWillMount () {
    this.props.onFetchDevice()
    this.props.onUsersList()
    this.props.onFetchDeviceType()
    this.props.onFetchDeviceStatus()
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0)

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.HR) {
      } else {
        this.props.router.push('/home')
      }
    }
    this.setState({username: props.manageUsers.username,
      user_profile_detail: props.manageUsers.user_profile_detail,
      user_assign_machine: props.manageUsers.user_assign_machine})
  }

  componentDidUpdate () {
    if (this.state.defaultUserDisplay == '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0]
        let defaultUserId = firstUser.user_Id
        let defaultUserName = firstUser.username
        this.onUserClick(defaultUserId, defaultUserName)
      }
    }
  }
  onUserClick (userid, username) {
    let selected_user_name = ''
    let selected_user_image = ''
    let selected_user_jobtitle = ''
    let selected_user_id = ''
    // this.setState({username: username})

    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, {'user_Id': userid})
      if (typeof userDetails !== 'undefined') {
        selected_user_name = userDetails.name
        selected_user_image = userDetails.slack_profile.image_192
        selected_user_jobtitle = userDetails.jobtitle
        selected_user_id = userDetails.user_Id
      }
    }
    this.setState({'defaultUserDisplay': userid,
      'selected_user_name': selected_user_name,
      'selected_user_image': selected_user_image,
      'selected_user_jobtitle': selected_user_jobtitle,
      'selected_user_id': selected_user_id})
    this.props.onUserProfileDetails(userid, username)
  }

  callUpdateUserDeviceDetails (new_device_details) {
    this.props.onUpdateUserDeviceDetails(new_device_details).then((data) => {}, (error) => {
      notify(error)
    })
  }
  callFetchDeviceType () {
    this.onFetchDeviceType()
  }
  callFetchDeviceStatus () {
    this.onFetchDeviceStatus()
  }
  openPage (toDisplay) {
    if (toDisplay === 'device_list') {
      this.setState({
        deviceList: 'row',
        firstArrow: 'show',
        viewUser: 'hidden',
        secondArrow: 'hidden'
      })
    } else {
      this.setState({
        deviceList: 'hidden',
        firstArrow: 'hidden',
        viewUser: 'row',
        secondArrow: 'show'
      })
    }
  }
  openEditDevice (id) {
    this.props.onGetDeviceById(id).then((val) => {
      this.setState({
        edit: true,
        open: true,
        deviceId: id,
        status_message: '',
        getByIdData: val
      })
    })
  }
  deleteDevices (id) {
    this.props.onDeleteDevice(id).then((val) => {
      this.setState({
        status_message: ''
      })
      this.props.onFetchDevice()
    })
  }
  handleClose () {
    this.setState({
      open: false,
      status_message: '',
      edit: false
    })
  }

  handleAddDialog () {
    this.setState({
      deviceId: '',
      open: true,
      status_message: '',
      edit: false
    })
  }

  callAssign (id, userId) {
    this.setState({user: userId})
    this.props.onCallAssign(id, userId).then((message) => {
      this.setState({
        status_message: message
      })
      this.props.onFetchDevice()
    }, (error) => {
      notify(error)
    })
  }
  render () {
    let device_list = <InventoryList
      openEditDevice={this.openEditDevice}
      deleteDevices={this.deleteDevices}
      callFetchDevice={this.callFetchDevice}
      {...this.props} />
    let view_user_device = <UsersList
      users={this.props.usersList.users}
      selectedUserId={this.state.selected_user_id}
      onUserClick={this.onUserClick}
      callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails}
      {...this.props} />

    return (
    <div>
          <AlertNotification alert_message={this.state.status_message} />
          <Menu {...this.props} />

          <div id="content" className="app-content box-shadow-z0" role="main">
            <Header pageTitle={'Inventory Management'} {...this.props} />
            <div className="app-footer">
              <div></div>
            </div>
            <div className="app-body" id="view">
              <div className="row">
                <div className="col-12">
                  <LoadingIcon {...this.props} />
                </div>
              </div>
              {this.state.secondArrow == 'show' ? null
                : <div className="row" style={{marginTop: '2%', marginLeft: '4%'}}>
                <div className="col-md-11 col-xs-offset-0">
                </div>
              </div>
}
              <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-6 pull-sm-6">
                    <div className="p-y-md clearfix nav-active-primary">
                      <ul className="nav nav-pills nav-sm" style={{marginLeft: '4%'}}>
                        <li
                          onClick={() => { this.openPage('device_list') }}
                          className={`nav-item ${this.state.active}`}>
                          <a className="nav-link"
                            href=""
                            data-toggle="tab"
                            data-target="#tab_1"
                            aria-expanded="true">Inventory Details</a>
                          <div className={this.state.firstArrow}>
                            <span className="arrow bottom b-accent"></span></div>
                        </li>
                        <li
                          onClick={() => { this.openPage('view_user') }}
                          className={'nav-item'}>
                          <a className="nav-link"
                            href=""
                            data-toggle="tab"
                            data-target="#tab_2"
                            aria-expanded="false">User Inventory Details</a>
                          <div className={this.state.secondArrow}>
                          <span className="arrow bottom b-accent"></span></div>
                        </li>
                      </ul>
                    </div>
                  </div>

                <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  {this.state.firstArrow == 'show'
                  ? <FormAddNewInventory
                    deviceId={this.state.id}
                    handleClose={this.handleClose}
                    callAddNewMachine={this.callAddNewMachine}
                    handleAddDialog={this.handleAddDialog}
                    open={this.state.open}
                    edit={this.state.edit}
                    callAssign={this.callAssign}
                    callAddDevice={this.callAddDevice}
                    getByIdData={this.state.getByIdData}
                    {...this.props} />
                  : null
              }
                  </div>

                </div>
              </div>
              <div className="padding">
                <div className={this.state.deviceList}>
                {device_list}
                </div>
                <div className={this.state.viewUser}>
                  <div className="col-md-2">
                    {view_user_device}
                  </div>
                  <ViewUserDevice {...this.props} />
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
    usersList: state.usersList.toJS(),
    manageUsers: state.manageUsers.toJS(),
    logged_user: state.logged_user.toJS(),
    policy_documents: state.policyDocuments.toJS(),
    manageDevice: state.manageDevice.toJS()
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
    onUserProfileDetails: (userid, username) => {
      return dispatch(actions_manageUsers.getUserProfileDetails(userid, username))
    },
    onUpdateUserDeviceDetails: (new_device_details) => {
      return dispatch(actions_manageUsers.updateUserDeviceDetails(new_device_details))
    },
    onAddNewMachine: (new_machine_details) => {
      return dispatch(actions_manageDevice.addNewMachine(new_machine_details))
    },
    onFetchDevice: () => {
      return dispatch(actions_manageDevice.get_machines_detail())
    },
    onGetDeviceById: (id) => {
      return dispatch(actions_manageDevice.getDeviceById(id))
    },
    onUpdateDevice: (id, machineData) => {
      return dispatch(actions_manageDevice.updateDevice(id, machineData))
    },
    onDeleteDevice: (id) => {
      return dispatch(actions_manageDevice.deleteDevice(id))
    },
    onCallAssign: (deviceId, id) => {
      return dispatch(actions_manageDevice.assignDevice(deviceId, id))
    },
    onCallDeviceType: (deviceList) => {
      return dispatch(actions_manageDevice.assignDeviceType(deviceList))
    },
    onCallDeviceStatus: (statusValue, colorValue) => {
      return dispatch(actions_manageDevice.assignDeviceStatus(statusValue, colorValue))
    },
    onFetchDeviceType: () => {
      return dispatch(actions_manageDevice.getDeviceType())
    },
    onFetchDeviceStatus: () => {
      return dispatch(actions_manageDevice.getDeviceStatus())
    },
    onDeleteDeviceStatus: (checkValue) => {
      return dispatch(actions_manageDevice.deleteDeviceStatus(checkValue))
    }
  }
}

const VisibleInvetorySystem = connect(mapStateToProps, mapDispatchToProps)(InventorySystem)

const RouterVisibleInventorySystem = withRouter(VisibleInvetorySystem)

export default RouterVisibleInventorySystem
