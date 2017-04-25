import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {notify} from '../../services/index'
import 'react-date-picker/index.css'
var moment = require('moment')

export default class AddDeviceDialoge extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceType: '',
      open: false,
      deviceList: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addMoreDevice = this.addMoreDevice.bind(this)
    this.addDeviceType = this.addDeviceType.bind(this)
  }

  handleOpen (e) {
    e.stopPropagation()
    this.setState({
      open: true,
      array: [1]
    })
  }

  addMoreDevice () {
    if (!_.isEmpty(this.state.deviceType)) {
      var deviceList = this.state.deviceList
      deviceList.push(this.state.deviceType)
      this.setState({
        deviceType: '',
        deviceList: deviceList
      })
    }
  }
  addDeviceType () {
    this.props.callAddDevice(this.state.deviceList)
  }

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    console.log(this.state.deviceList)
    var text = <div>
          <TextField
            ref='value'
            floatingLabelText={'Add Device Type'}
            fullWidth
            onChange={(e) => {
              this.setState({
                deviceType: e.target.value
              })
            }}
            value={this.state.deviceType}
          />
      </div>

    const actions = [
      <FlatButton
        label="Cancle"
        primary
        onTouchTap={this.handleClose}
        style={{marginRight: 5}}
    />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.addDeviceType}
    />
    ]
    return (
      <div>
          <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.handleOpen}>Add Device Type</button>
          <Dialog
            title={'ADD DEVICE TYPE'}
            titleStyle={{opacity: '0.56'}}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
                  >
                  {text}
                  <button className="md-btn md-raised m-b-sm indigo" onTouchTap={() => {
                    this.addMoreDevice()
                  }}>Add More Device</button>
                  </Dialog>
                </div>
    )
  }
}
