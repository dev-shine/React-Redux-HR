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
      user: ''
    }

    this.openEditDevice = this.openEditDevice.bind(this)
    this.deleteDevices = this.deleteDevices.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
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
  }
  openEditDevice (id) {
    this.props.openEditDevice(id)
  }

  deleteDevices (id) {
    this.props.deleteDevices(id)
  }

  handleAssign (id, userId) {
    this.setState({user: userId})
    this.props.callAssign(id, userId)
  }

  render () {
    let rows = []
    _.map(this.props.manageDevice.device, (device, i) => {
      rows.push(<tr key={i}>
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
            {<label>Working Comments : </label>}
            {device.comments}
          {<label>Extended Warranty : </label>}
            {device.warranty_comment}
          {<label>Pre Repair Comments : </label>}
            {device.repair_comment}</td>
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
        <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" style={{ 'float': 'right'}}>
            <div className="row">
              <div className="col-xs-12">
                <div className="col-md-offset-10" style={{'float': 'right'}}>
                <AddDeviceDialoge{...this.props} />
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
