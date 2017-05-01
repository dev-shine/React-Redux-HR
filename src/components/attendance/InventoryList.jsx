import React from 'react'
import * as _ from 'lodash'
import Paper from 'material-ui/Paper'

import LoadingIcon from '../../components/generic/LoadingIcon'
import FormAddNewInventory from '../../components/inventory/AddInventory'
import AddDeviceDialoge from '../../components/inventory/AddDeviceDialoge'
import AddDeviceStatus from '../../components/inventory/AddDeviceStatus'
import AlertNotification from '../../components/generic/AlertNotification'

import { connect } from 'react-redux'
import { CONFIG } from '../../config/index'
import {notify} from '../../services/index'

var moment = require('moment')

class InventoryList extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      edit: false,
      open: false,
      openStatus: false,
      id: '',
      openSnackbar: false,
      user: '',
      search: '',
      status_message: '',
      deviceTypeList: [],
      deviceStatusList: [],
      device_status: '',
      deviceList: [],
      statusList: []
    }

    this.openEditDevice = this.openEditDevice.bind(this)
    this.deleteDevices = this.deleteDevices.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleStatusOpen = this.handleStatusOpen.bind(this)
    this.handleStatusClose = this.handleStatusClose.bind(this)
    this.callAddDevice = this.callAddDevice.bind(this)
    this.callAddStatus = this.callAddStatus.bind(this)
    this.handleDeviceTypeFilter = this.handleDeviceTypeFilter.bind(this)
    this.handleStatusTypeFilter = this.handleStatusTypeFilter.bind(this)
  }
  componentWillMount () {
    this.props.onFetchDeviceType().then((val) => {
      this.setState({deviceTypeList: val})
    })
    this.props.onFetchDeviceStatus().then((val) => {
      this.setState({deviceStatusList: val})
    })
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
    if (props.manageDevice.status_message !== this.state.status_message) {
      this.setState({
        openSnackbar: true
      })
    } else {
      this.setState({
        openSnackbar: false
      })
    }
    this.setState({deviceTypeList: props.manageDevice.deviceList, deviceList: props.manageDevice.device})
    this.setState({deviceStatusList: props.manageDevice.statusList, statusList: props.manageDevice.device})
  }
  openEditDevice (id) {
    this.props.openEditDevice(id)
  }

  deleteDevices (id) {
    this.props.deleteDevices(id)
  }
  callAddStatus (statusType) {
    this.props.onCallDeviceStatus(statusType).then((message) => {
      // this.setState({
      //   status_message: message
      // })
      this.handleStatusClose()
      this.props.onFetchDeviceStatus()
    }, (error) => {
      notify(error)
    })
  }

  callAddDevice (deviceType) {
    this.props.onCallDeviceType(deviceType).then((message) => {
      this.setState({
        status_message: message
      })
      this.handleClose()
      this.props.onFetchDeviceType()
    }, (error) => {
      notify(error)
    })
  }

  handleStatusClose () {
    this.setState({openStatus: false})
  }
  handleStatusOpen () {
    this.setState({
      openStatus: true
    })
  }

  handleOpen (e) {
    e.stopPropagation()
    this.setState({
      open: true
    })
  }
  handleClose () {
    this.setState({
      open: false
    })
  };

  handleAssign (id, userId) {
    this.setState({user: userId})
    this.props.callAssign(id, userId)
  }

  handleDeviceTypeFilter (deviceType) {
    let devices = this.props.manageDevice.device
    if (this.state.device_status != '') {
      devices = this.state.deviceList
    }
    if (deviceType != '') {
      devices = _.filter(devices, row => row.machine_type === deviceType)
    } else {
      if (this.state.device_status != '') {
        devices = _.filter(this.props.manageDevice.device, row => row.status === this.state.device_status)
      }
    }
    this.setState({
      deviceList: devices,
      search: deviceType

    })
  }
  handleStatusTypeFilter (statusType) {
    let status = this.props.manageDevice.device
    if (this.state.search != '') {
      status = this.state.deviceList
    }
    if (statusType != '') {
      status = _.filter(status, row => row.status === statusType)
    } else {
      if (this.state.search != '') {
        status = _.filter(this.props.manageDevice.device,
          row => row.machine_type === this.state.search)
      }
    }
    this.setState({
      deviceList: status,
      device_status: statusType

    })
  }

  render () {
    let statusDrop = this.state.deviceStatusList.reverse().map((val, i) => {
      return (<option value={val} key={i}>{val}</option>)
    })
    let listDrop = this.state.deviceTypeList.reverse().map((val, i) => {
      return (<option value={val} key={i}>{val}</option>)
    })
    let devices = this.state.deviceList
    // if (this.state.search !== '') {
    //   devices = _.filter(devices, row => row.machine_type === this.state.search)
    // }

    let rowColor
    let rows = []
    _.map(devices, (device, i) => {
      if (device.status === 'New') {
        rowColor = '#bbdefb'
      } else if (device.status === 'Not Working') {
        rowColor = '#FF7043'
      } else if (device.status === 'Working') {
        rowColor = '#69f0ae'
      } else {
        rowColor = 'none'
      }
      rows.push(<tr key={i} style={{background: rowColor, borderBottom: '2px solid white'}}>
            <td style={{marginRight: '0%'}}>{i + 1}</td>
            <td>{device.machine_type}</td>
            <td>{device.machine_name}</td>
            <td>
              {<label>Purchase Date:</label>}
              {moment(device.date_of_purchase).format('Do MMMM YYYY')}
              <br /> <br />
              {<label>Warranty Expire : </label>}
              {moment(device.warranty).format('Do MMMM YYYY')}
            </td>
            {
             device.machine_type === 'Keyboard' || device.machine_type === 'Mouse' ? <td></td>
             : <td>
               {device.mac_address || ' '}
               <br />
           </td>
            }
              <td>{'₹'}{device.machine_price}</td>
            <td>{device.serial_number}
              <br />
              {<label>Bill No : </label>}
              {device.bill_number}</td>

            <td>{<label>Status : </label>}
              {device.status} <br />
            {<label>Working Comments :</label>}
            {device.comments}
          {<label>Extended Warranty :</label>}
            {device.warranty_comment} <br />
          {<label>Pre Repair Comments :</label>}
            {device.repair_comment}
          </td>
          <td>
            {device.name}
          </td>

        <td style={{marginTop: '5%'}}>
          <i onClick={() => {
            this.openEditDevice(device.id)
          }}
            className="fa fa-lg fa-pencil-square-o"
            style={{color: '#3f51b5', cursor: 'pointer'}}
            aria-hidden="true"></i>
        </td>

            <td style={{marginTop: '5%'}} ><i
              onClick={() => {
                if (confirm('Are you sure you want to delete this record?')) {
                  this.deleteDevices(device.id)
                };
              }}
              className="fa fa-lg fa fa-trash"
              style={{color: '#B71C1C', cursor: 'pointer'}}
              aria-hidden="true"></i>
            </td>
          </tr>)
    })
    return (
      <div>
        <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" style={{ 'float': 'right'}}>
            <div className="row">
              <div className="row no-gutter">
                <div className="col-md-3 p-r" >
                  <div className="form-group" style={{marginLeft: '4%'}}>
                    <label style={{'fontSize': 15}}>Filter:</label>
                      <select className="form-control"
                        ref="device_type"
                        value={this.state.search}
                        onChange={(e) => {
                          this.handleDeviceTypeFilter(e.target.value)
                        }}>
                        <option value="">--Select Device Type--</option>
                        {listDrop}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 p-r">
                    <div className="form-group">
                      <label style={{marginTop: '6%'}}> </label>
                        <select className="form-control" ref="device_status"
                          value={this.state.device_status}
                          onChange={(e) => {
                            this.handleStatusTypeFilter(e.target.value)
                          }}>
                          <option value="">--Select Device Status--</option>
                          {statusDrop}
                        </select>
                      </div>
                    </div>

                    <div className='row m-0'>
                      <div className='buttonbox'>
                      <div className='col-sm-2 p-0 pt-5' style={{marginLeft: '16%', paddingLeft: '8%'}}>
                        <div className=" text-left" style={{marginTop: '26px'}}>
                            <AddDeviceStatus
                              callAddStatus={this.callAddStatus}
                              handleStatusClose={this.handleStatusClose}
                              handleStatusOpen={this.handleStatusOpen}
                              open={this.state.openStatus}
                              deviceStatusList={this.state.deviceStatusList}
                              {...this.props} />
                        </div>
                      </div>
                      <div className='col-sm-2 p-0 pt-5'>
                        <div className="text-left" style={{marginTop: '26px', paddingLeft: '43px'}}>
                          <AddDeviceDialoge callAddDevice={this.callAddDevice}
                            handleClose={this.handleClose}
                            handleOpen={this.handleOpen}
                            open={this.state.open}
                            deviceTypeList={this.state.deviceTypeList}
                            {...this.props} />
                        </div>
                      </div>
                      </div>
                    </div>

                </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div style={{'marginTop': '2%'}}>
                      <Paper zDepth={3} style={{marginBottom: '10px'}} >
                        <table key='' className="table table-striped table-hover">
                          <thead>
                            <tr>
                            </tr>
                            <tr>
                              <th>Sr. No</th>
                              <th>Device Type</th>
                              <th>Name</th>
                              <th>Dates</th>
                              <th>Mac Address</th>
                              <th>Price</th>
                              <th>Serial No</th>
                              <th>Status/Commments</th>
                              <th>Assigned UserName</th>
                            </tr>
                          </thead>
                          <tbody>
                              {rows}
                          </tbody>
                        </table>
                        </Paper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    )
  }
}
export default InventoryList
