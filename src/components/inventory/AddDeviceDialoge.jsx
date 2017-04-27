import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {notify} from '../../services/index'
import 'react-date-picker/index.css'
var moment = require('moment')
import { CONFIG } from '../../config/index'

export default class AddDeviceDialoge extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceType: '',
      open: false,
      deviceList: [],
      checkValue: []
    }

    this.addMoreDevice = this.addMoreDevice.bind(this)
    this.addDeviceType = this.addDeviceType.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.setValue = this.setValue.bind(this)
  }
  componentWillReceiveProps (props) {
    this.setState({deviceList: props.deviceTypeList, open: props.open})

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
  handleDelete () {
    let checkValue = this.state.checkValue
    let deviceList = this.state.deviceList
    checkValue.map((val) => {
      _.pull(deviceList, val)
    })
    this.setState({deviceList, checkValue: []})
  }

  setValue (e) {
    let array = this.state.checkValue
    array.push(e.target.value)
    this.setState({checkValue: array})
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

  render () {
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
        label="Delete"
        secondary
        onTouchTap={this.handleDelete}
        style={{marginRight: 5}}
    />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.handleClose}
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

        {
          this.props.logged_user.role === CONFIG.HR
          ? <div></div>
          : <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.props.handleOpen}>Add Device Type</button>
}
        <Dialog
          title={'ADD DEVICE TYPE'}
          titleStyle={{opacity: '0.56'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.props.handleClose}
                  ><div className="row m-0">
                  <div className='col-sm-3' style={{overFlowY: 'show'}}>
                    <ol>
                  {this.state.deviceList.map((val, i) => {
                    return <li key={i}><input type='checkbox' value={val} onChange={(e) => {
                      this.setValue(e)
                    }}></input> {val}</li>
                  })}
                </ol>
                </div>
                <div className='col-sm-9'>
                {text}
                <button className="md-btn md-raised m-b-sm indigo" onTouchTap={() => {
                  this.addMoreDevice()
                }}>Add</button>
              </div>
                </div>
                  </Dialog>
                </div>
    )
  }
}
