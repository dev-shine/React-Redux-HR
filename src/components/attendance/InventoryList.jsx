import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Paper from 'material-ui/Paper'
var moment = require('moment')
import FormAddNewInventory from '../../components/inventory/AddInventory'
import AddDeviceDialoge from '../../components/inventory/AddDeviceDialoge'
import { CONFIG } from '../../config/index'

class InventoryList extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      edit: false,
      open: false,
      id: '',
      openSnackbar: false,
      user: '',
      search: '',
      deviceTypeList: []
    }

    this.openEditDevice = this.openEditDevice.bind(this)
    this.deleteDevices = this.deleteDevices.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.callAddDevice = this.callAddDevice.bind(this)
  }
  componentWillMount () {
    this.props.onFetchDeviceType().then((val) => {
      this.setState({deviceTypeList: val})
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
    this.setState({deviceTypeList: props.manageDevice.deviceList})
  }
  openEditDevice (id) {
    this.props.openEditDevice(id)
  }

  deleteDevices (id) {
    this.props.deleteDevices(id)
  }

  handleOpen (e) {
    e.stopPropagation()
    this.setState({
      open: true
    })
  }

  callAddDevice (deviceType) {
    this.props.onCallDeviceType(deviceType).then((message) => {
      // this.setState({
      //   status_message: message
      // })
      this.handleClose()
      this.props.onFetchDeviceType()
    }, (error) => {
      notify(error)
    })
  }

  handleClose = () => {
    this.setState({open: false})
  };

  handleAssign (id, userId) {
    this.setState({user: userId})
    this.props.callAssign(id, userId)
  }

  render () {
    let listDrop = this.state.deviceTypeList.map((val, i) => {
      return (<option value={val} key={i}>{val}</option>)
    })

    let devices = this.props.manageDevice.device
    if (this.state.search !== '') {
      devices = _.filter(this.props.manageDevice.device, row => row.machine_type === this.state.search)
    }
    let rowColor
    let machine = []
    let rows = []
    _.map(devices, (device, i) => {
      if (device.status === 'New') {
        rowColor = '#f3f34a'
      } else if (device.status === 'Not Working') {
        rowColor = '#e88e8e'
      } else if (device.status === 'Working') {
        rowColor = '#a9dcaf'
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
             : <td>{<label>Mac : </label>}
               {device.mac_address || ' '}
               <br /> <br />
             {<label>OS : </label>}
             {device.operating_system || ''}
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
                this.deleteDevices(device.id)
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
                <div className="col-md-6 p-r">
                  <div className="form-group">
                    <label style={{'fontSize': 15}}>Select Device Type:</label>
                      <select className="form-control" ref="device_status" value={this.state.search}
                        onChange={(e) => {
                          this.setState({search: e.target.value})
                        }}>
                        <option value="">--Select Device Type--</option>
                        {listDrop}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6-offset-9 p-r" style={{'float': 'right', marginTop: '3%'}}>
                    <AddDeviceDialoge callAddDevice={this.callAddDevice} handleClose={this.handleClose} handleOpen={this.handleOpen} open={this.state.open} deviceTypeList={this.state.deviceTypeList} {...this.props} />
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
                              <th>Mac/OS</th>
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
          </div>
    )
  }
}
export default InventoryList
