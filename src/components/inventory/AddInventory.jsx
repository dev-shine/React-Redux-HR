import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import 'react-date-picker/index.css'

export default class FormAddNewInventory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      autoOk: true,
      machine_type: '',
      machine_name: '',
      machine_price: '',
      serial_number: '',
      date_of_purchase: '',
      mac_address: '',
      operating_system: '',
      status: '',
      comments: ''
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
  }
  handleOpen () {
    this.setState({
      open: true,
      autoOk: true,
      machine_type: '',
      machine_name: '',
      machine_price: '',
      serial_number: '',
      date_of_purchase: '',
      mac_address: '',
      operating_system: '',
      status: '',
      comments: ''
    })
  }
  handleChangeDate = (event, date) => {
    this.setState({
      date_of_purchase: date
    })
  };
  handleClose () {
    this.setState({open: false})
  }
  componentWillReceiveProps (props) {}
  render () {
    console.log(this.state.machine_type, '-----machine_type')
    return (
      <div>

        <button className="btn btn-fw info" onTouchTap={this.handleOpen}>Add New Device </button>

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
                     value={this.state.date_of_purchase}
                     autoOk={this.state.autoOk}
                     mode="landscape"
                     container="inline"
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
                      <option value="Linux">Linux </option>
                      <option value="Windows">Windows</option>
                        <option value="Windows">iOS</option>
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
                    onChange={(e) => (this.setState({serial_number: e.target.value}))}
                    value={this.state.serial_number} />
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
                  hintText="add your comments here"
                  onChange={(e) => (this.setState({comments: e.target.value}))}
                  value={this.state.comments} />
              </td>
            </tr>

            </tbody>
          </table>
          <button
            className="col-md-12 md-btn md-raised m-b-sm indigo"
            onClick={() => this.props.callAddNewMachine(this.state)}>Add Device</button>
        </Dialog>
      </div>
    )
  }
}
