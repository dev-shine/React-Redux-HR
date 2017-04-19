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

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'
import FormAddNewInventory from '../../components/inventory/AddInventory'
import InventoryList from '../../components/attendance/InventoryList'

class InventorySystem extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      status_message: '',
      active: 'active',
      firstArrow: 'show',
      deviceList: 'show',
      open: false,
      edit: false,
      deviceId: '',
      getByIdData: {}
    }
    this.openEditDevice = this.openEditDevice.bind(this)
    this.handleAddDialog = this.handleAddDialog.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.deleteDevices = this.deleteDevices.bind(this)
    this.callAssign = this.callAssign.bind(this)
  }
  componentWillMount () {
    this.props.onFetchDevice()
    this.props.onUsersList()
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
      callAssign={this.callAssign}
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
              <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-6 pull-sm-6">
                    <div className="p-y-md clearfix nav-active-primary">
                      <ul className="nav nav-pills nav-sm">
                        <li
                          className={`nav-item ${this.state.active}`}>
                          <a className="nav-link"
                            href=""
                            data-toggle="tab"
                            data-target="#tab_1"
                            aria-expanded="true">Inventory Details</a>
                          <div className={this.state.firstArrow}>
                            <span className="arrow bottom b-accent"></span></div>
                        </li>
                      </ul>

                    </div>
                  </div>
                  <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  <FormAddNewInventory deviceId={this.state.id} handleClose={this.handleClose} callAddNewMachine={this.callAddNewMachine} handleAddDialog={this.handleAddDialog} open={this.state.open} edit={this.state.edit} getByIdData={this.state.getByIdData} {...this.props} />
                  </div>
                </div>
              </div>
              <div className="padding">
                <div className={this.state.deviceList}>
                {device_list}
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
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list())
    },
    onCallAssign: (deviceId, id) => {
      return dispatch(actions_manageDevice.assignDevice(deviceId, id))
    }
  }
}

const VisibleInvetorySystem = connect(mapStateToProps, mapDispatchToProps)(InventorySystem)

const RouterVisibleInventorySystem = withRouter(VisibleInvetorySystem)

export default RouterVisibleInventorySystem
