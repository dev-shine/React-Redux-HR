import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {notify} from '../../services/index'
import DatePicker from 'material-ui/DatePicker'
import {DateField} from 'react-date-picker'
import AlertNotification from '../../components/generic/AlertNotification'

import 'react-date-picker/index.css'
var moment = require('moment')

export default class FormAddNewInventory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      edit: false,
      id: '',
      user: '',
      autoOk: true,
      machine_type: '',
      machine_name: '',
      machine_price: '',
      serial_no: '',
      purchase_date: '',
      mac_address: '',
      operating_system: '',
      comment: '',
      warranty_comment: '',
      repair_comment: '',
      bill_no: '',
      warranty: '',
      user_Id: '',
      msg: '',
      deviceTypeList: [],
      deviceStatusList: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleAddDevice = this.handleAddDevice.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
  }

  componentWillReceiveProps (props) {
    this.setState({
      open: props.open,
      edit: props.edit,
      deviceTypeList: props.manageDevice.deviceList,
      deviceStatusList: props.manageDevice.statusList
    })

    if (props.edit) {
      // console(props)
      this.setState({
        id: props.getByIdData.id,
        machine_type: props.getByIdData.machine_type,
        machine_name: props.getByIdData.machine_name,
        machine_price: props.getByIdData.machine_price,
        serial_no: props.getByIdData.serial_number,
        purchase_date: props.getByIdData.date_of_purchase,
        mac_address: props.getByIdData.mac_address,
        operating_system: props.getByIdData.operating_system,
        status: props.getByIdData.status,
        comment: props.getByIdData.comments,
        warranty_comment: props.getByIdData.warranty_comment,
        repair_comment: props.getByIdData.repair_comment,
        bill_no: props.getByIdData.bill_number,
        warranty: props.getByIdData.warranty_end_date,
        user_Id: props.getByIdData.user_Id
      })
    } else {
      this.setState({
        id: '',
        machine_type: '',
        machine_name: '',
        machine_price: '',
        serial_no: '',
        purchase_date: '',
        mac_address: '',
        operating_system: '',
        status: '',
        comment: '',
        warranty_comment: '',
        repair_comment: '',
        bill_no: '',
        warranty: '',
        user_Id: ''
      })
    }
  }

  handleOpen (e) {
    e.stopPropagation()
    this.props.handleAddDialog()
  }

  handleAddDevice () {
    let apiData = {
      machine_type: this.state.machine_type,
      machine_name: this.state.machine_name,
      machine_price: this.state.machine_price,
      serial_no: this.state.serial_no,
      purchase_date: this.state.purchase_date,
      mac_address: this.state.mac_address,
      operating_system: this.state.operating_system,
      status: this.state.status,
      comment: this.state.comment,
      warranty_comment: this.state.warranty_comment,
      repair_comment: this.state.repair_comment,
      bill_no: this.state.bill_no,
      warranty: this.state.warranty,
      user_Id: this.state.user_Id
    }
    if (!this.props.edit) {
      this.props.onAddNewMachine(apiData).then((val) => {
        // console(val)
        this.props.handleClose()
        this.setState({
          machine_type: '',
          machine_name: '',
          machine_price: '',
          serial_no: '',
          purchase_date: '',
          mac_address: '',
          operating_system: '',
          comment: '',
          warranty_comment: '',
          repair_comment: '',
          bill_no: '',
          warranty: '',
          user_Id: ''
        })
        this.props.onFetchDevice()
      }, (error) => {
        notify(error)
      })
    } else {
      this.props.onUpdateDevice(this.state.id, apiData).then((message) => {
        this.props.handleClose()
        this.props.onFetchDevice()
      }).catch((message) => {
        this.setState({
          msg: message
        })
      })
    }
  }
  handleAssign (deviceId, Userid) {
    this.setState({userId: Userid})
    this.props.callAssign(deviceId, Userid)
  }

  handleChangeDate = (event, date) => {
    this.setState({
      purchase_date: date
    })
  };

  render () {
    let userList = this.props.usersList.users.map((val, i) => {
      return <option key={val.id} id={i} value={val.user_Id} >{val.name}</option>
    })
    return (
      <div>

        <AlertNotification alert_message={this.state.msg} />

        <button className="md-btn md-raised m-b-sm indigo"
          onTouchTap={this.handleOpen}>Add New Inventory </button>
        <Dialog
          title={this.state.edit ? 'UPDATE INVENTORY' : 'ADD INVENTORY'}
          titleStyle={{opacity: '0.56'}}
          modal={false}
          open={this.state.open} onRequestClose={this.props.handleClose} contentStyle={{
            width: '70%',
            maxWidth: 'none'
          }} autoScrollBodyContent>

          <table className="table">
            <tbody>
              <tr>
           <td>
              Date Of Purchase
              <DateField
                style={{marginTop: '4%'}}
                dateFormat="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                onChange={(date) => { this.setState({purchase_date: date}) }}
                value={this.state.purchase_date}
                className="form-control"
                required />
                </td>

             <td style={{opacity: '0.56'}}>
                Assign User
                <select className="form-control" style={{marginTop: '4%'}}
                  value={this.state.user_Id}
                  onChange={(evt) => {
                    let id = evt.target.value
                    this.setState({user_Id: evt.target.value})
                    // if (this.state.edit) {
                    //   this.handleAssign(this.state.id, id)
                    // }
                  }}>
                  <option value=''>--select user--</option>
                  {userList}
                </select>
              </td>
              </tr>
              <tr>
                 <td>
                  Date Of Warrenty Expiry
                  <DateField style={{marginTop: '4%'}}
                    dateFormat="YYYY-MM-DD"
                    placeholder="YYYY-MM-DD"
                    onChange={(date) => { this.setState({warranty: date}) }}
                    value={this.state.warranty}
                    className="form-control"
                    required />
                </td>

                <td colSpan={2}>
                  <TextField
                    floatingLabelText="Machine Name"
                    fullWidth
                    onChange={(e) => (this.setState({machine_name: e.target.value}))}
                    value={this.state.machine_name}
                    required />
                </td>
              </tr>

              <tr>
                <td style={{opacity: '0.56'}}>
                  Machine/Device Type
                  <select className="form-control" ref="machine_type" value={this.state.machine_type}
                    onChange={(evt) => { this.setState({machine_type: evt.target.value}) }}>
                    <option >--select device--</option>
                    {this.state.deviceTypeList.reverse().map((val, i) => {
                      return <option key={i} value={val}> {val}</option>
                    })}
                  </select>
                 </td>
               </tr>

              <tr>
              <td>
                  <TextField
                    floatingLabelText="Mac Address"
                    hintText='00:25:96:FF:FE:12:34:56'
                    fullWidth
                    onChange={(e) => { this.setState({mac_address: e.target.value}) }}
                    value={this.state.mac_address} required />
                </td>
                <td>
                  <TextField
                    floatingLabelText="Price"
                    hintText='₹'
                    fullWidth
                    onChange={(e) => (this.setState({machine_price: e.target.value}))}
                    value={this.state.machine_price} required />
                </td>
              </tr>

              <tr >
                <td >
                  <TextField
                    floatingLabelText="Serial No"
                    fullWidth
                    onChange={(e) => (this.setState({serial_no: e.target.value}))}
                    value={this.state.serial_no} />
                </td>

                <td colSpan={2} >
                  <TextField
                    floatingLabelText="Bill No"
                    fullWidth
                    onChange={(e) => (this.setState({bill_no: e.target.value}))}
                    value={this.state.bill_no} />
                </td>
              </tr>
              <tr>
                <td style={{opacity: '0.56'}}>
                  Status
                  <select className="form-control"style={{marginTop: '2%'}} ref="status" value={this.state.status}
                    onChange={(e) => (this.setState({status: e.target.value}))}>
                    <option >-Device Status-</option>

                      {this.state.deviceStatusList.map((val, i) => {
                        return <option key={i} value={val.status.replace('_', ' ')}> {val.status.replace('_', ' ')}</option>
                      })}
                  </select>
              </td>
              <td style={{opacity: '0.56'}} >
                {'Comment'}
                <textarea
                  style={{width: '100%'}}
                  onChange={(e) => { this.setState({comment: e.target.value}) }}
                  value={this.state.comment}
                />
              </td>
            </tr>

              <tr style={{opacity: '0.56'}}>
              <td >
                {'Extended Warranty Comments'}
                <textarea
                  style={{width: '100%'}}
                  onChange={(e) => { this.setState({warranty_comment: e.target.value}) }}
                  value={this.state.warranty_comment}
                />
              </td>
              <td>
                {'Previous Repair Comments'}
              <textarea
                style={{width: '100%'}}
                onChange={(e) => { this.setState({repair_comment: e.target.value}) }}
                value={this.state.repair_comment} />
            </td>
            </tr>
            </tbody>
          </table>
          <button
            className="col-md-12 md-btn md-raised m-b-sm indigo"
            onClick={this.handleAddDevice}>{this.state.edit ? 'Update Inventory' : 'Add Inventory'}</button>
        </Dialog>
      </div>
    )
  }
}
