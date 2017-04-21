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
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleOpen (e) {
    e.stopPropagation()
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({open: false})
  };

  render () {
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
        onTouchTap={this.handleClose}
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
                  <div>
                      <TextField
                        ref='value'
                        floatingLabelText={'Add Device Type'}
                        hintText={'device type'}
                        fullWidth
                        onChange={(e) => {
                          this.setState({
                            deviceType: e.target.value
                          })
                        }}
                      />
                  </div>
                  </Dialog>
                </div>
    )
  }
}
