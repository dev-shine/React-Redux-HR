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
      autoOk: true,
      machine_type: '',
      machine_name: '',
      machine_price: '',
      serial_no: '',
      purchase_date: '',
      mac_address: '',
      operating_system: '',
      comment: '',
      msg: ''
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleAddDevice = this.handleAddDevice.bind(this)
  }

  componentWillReceiveProps (props) {
    this.setState({
      open: props.open,
      edit: props.edit
    })
    if (props.edit) {
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
        comment: props.getByIdData.comments
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
        comment: ''
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
      comment: this.state.comment
    }
    if (!this.props.edit) {
      this.props.onAddNewMachine(apiData).then((val) => {
        console.log(val)
        this.props.handleClose()
        this.setState({
          machine_type: '',
          machine_name: '',
          machine_price: '',
          serial_no: '',
          purchase_date: '',
          mac_address: '',
          operating_system: '',
          status: '',
          comment: ''
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
        console.log(message, '--------')
        this.setState({
          msg: message
        })
      })
    }
  }

  handleChangeDate = (event, date) => {
    this.setState({
      purchase_date: date
    })
  };

  render () {
    return (
      <div>
        <AlertNotification alert_message={this.state.msg} />
        <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.handleOpen}>Add New Inventory </button>
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
                  <DateField style={{marginTop: '8%'}}
                    dateFormat="YYYY-MM-DD"
                    placeholder="Date Of Purchase"
                    onChange={(date) => { this.setState({purchase_date: date}) }}
                    value={this.state.purchase_date}
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
                      <option value="Laptop">Laptop </option>
                      <option value="Mobile">Mobile</option>
                      <option value="Keyboard">Keyboard</option>
                      <option value="Mouse">Mouse</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Router">Router</option>
                  </select>
                 </td>
                 {
                   this.state.machine_type == 'Laptop' || this.state.machine_type == 'Mobile' || this.state.machine_type == 'Desktop'
                   ? <td style={{opacity: '0.56'}}>
                  Operating System
                  <select className="form-control" ref="operating_system" value={this.state.operating_system}
                    onChange={(evt) => { this.setState({operating_system: evt.target.value}) }}>
                    <option >--select os--</option>
                    <option value="Linux">Linux </option>
                    <option value="Windows">Windows</option>
                    <option value="Ios">iOS</option>
                    <option value="Android">Android</option>
                  </select>
                </td>
                : null
              }
              </tr>

              <tr>
                {
                this.state.machine_type == 'Laptop' || this.state.machine_type == 'Mobile' || this.state.machine_type == 'Desktop' || this.state.machine_type == 'Router'
                  ? <td>
                  <TextField
                    floatingLabelText="Mac Address"
                    hintText='00:25:96:FF:FE:12:34:56'
                    fullWidth
                    onChange={(e) => { this.setState({mac_address: e.target.value}) }}
                    value={this.state.mac_address} required />
                </td>
                : null
              }
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
                    value={this.state.serial_no} required />
                </td>

                <td colSpan={2}>
                  <TextField
                    floatingLabelText="Status"
                    fullWidth
                    onChange={(e) => (this.setState({status: e.target.value}))}
                    value={this.state.status} />
                </td>
              </tr>

              <tr>
              <td>
                <TextField
                  floatingLabelText="Comments"
                  fullWidth
                  hintText="add your comment here"
                  onChange={(e) => (this.setState({comment: e.target.value}))}
                  value={this.state.comment} />
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
