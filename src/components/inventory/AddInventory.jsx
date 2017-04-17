import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import 'react-date-picker/index.css'
var moment = require('moment')

export default class FormAddNewInventory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      autoOk: true,
      machine_type: '',
      machine_name: '',
      machine_price: '',
      serial_no: '',
      purchase_date: '',
      mac_address: '',
      operating_system: '',
      status: '',
      comment: ''
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleAddDevice = this.handleAddDevice.bind(this)
  }
  handleOpen () {
    this.setState({
      open: true,
      autoOk: true,
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

  handleAddDevice () {
    let apiData = {
      machine_type: this.state.machine_type,
      machine_name: this.state.machine_name,
      machine_price: this.state.machine_price,
      serial_no: this.state.serial_no,
      purchase_date: moment(this.state.purchase_date).format('YYYY-MM-DD'),
      mac_address: this.state.serial_no,
      operating_system: this.state.operating_system,
      status: this.state.status,
      comment: this.state.comment
    }
    this.props.callAddNewMachine(apiData)
  }

  handleChangeDate = (event, date) => {
    this.setState({
      purchase_date: date
    })
  };

  handleClose () {
    this.setState({open: false})
  }
  componentWillReceiveProps (props) {}
  render () {
    return (
      <div>

        <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.handleOpen}>Add New Device </button>

        <Dialog title="Add New Device"
          titleStyle={{opacity: '0.56'}}
          modal={false}
          open={this.state.open} onRequestClose={this.handleClose} contentStyle={{
            width: '70%',
            maxWidth: 'none'
          }} autoScrollBodyContent>

          <table className="table">
            <tbody>
              <tr>
                <td>
                   <DatePicker
                     floatingLabelText="Date of Purchase"
                     fullWidth
                     value={this.state.purchase_date}
                     autoOk={this.state.autoOk}
                     mode="landscape"
                     container="inline"
                     formatDate={this.handleDateChange}
                     onChange={this.handleChangeDate}>

                   </DatePicker>
                </td>

                <td colSpan={2}>
                  <TextField
                    floatingLabelText="Machine Name"
                    fullWidth
                    onChange={(e) => (this.setState({machine_name: e.target.value}))}
                    value={this.state.machine_name} />

                </td>
              </tr>

              <tr>
                <td style={{opacity: '0.56'}}>
                  Machine/Device Type
                  <select className="form-control" ref="machine_type"
                    onChange={(evt) => { this.setState({machine_type: evt.target.value}) }}>
                    <option >--select device--</option>
                      <option value="Laptop">Laptop </option>
                      <option value="Mobile">Mobile</option>
                      <option value="Keyboard">Keyboard</option>
                      <option value="Mouse">Mouse</option>
                  </select>
                 </td>
                 {
                   this.state.machine_type == 'Laptop' || this.state.machine_type == 'Mobile'
                 ? <td style={{opacity: '0.56'}}>
                  Operating System
                  <select className="form-control" ref="operating_system"
                    onChange={(evt) => { this.setState({operating_system: evt.target.value}) }}>
                    <option >--select os--</option>
                    <option value="linux">Linux </option>
                    <option value="windows">Windows</option>
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                  </select>
                </td>
                : null
              }
              </tr>
              <tr>
                <td>
                  <TextField
                    floatingLabelText="Mac Address"
                    hintText='00:25:96:FF:FE:12:34:56'
                    fullWidth
                    onChange={(e) => (this.setState({mac_address: e.target.value}))}
                    value={this.state.mac_address} />
                </td>

                <td>
                  <TextField
                    floatingLabelText="Price"
                    hintText='₹'
                    fullWidth
                    onChange={(e) => (this.setState({machine_price: e.target.value}))}
                    value={this.state.machine_price} />
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
                  floatingLabelText="comment"
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
            onClick={this.handleAddDevice}>Add Device</button>
        </Dialog>
      </div>
    )
  }
}
