import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {notify} from '../../services/index'
import 'react-date-picker/index.css'
var moment = require('moment')
import AlertNotification from '../../components/generic/AlertNotification'
import { GithubPicker } from 'react-color'
import { CONFIG } from '../../config/index'

export default class AddDeviceStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      background: '',
      colorPicker: 'hide',
      statusType: '',
      checkValue: '',
      status_message: ''
    }
    this.addMoreStatus = this.addMoreStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.handleStatusClose = this.handleStatusClose.bind(this)
  }

  componentWillReceiveProps (props) {
    this.setState({statusList: props.deviceStatusList,
      open: props.open})
    window.scrollTo(0, 0)

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.HR || localStorage.getItem('userid') === '375') {

      } else {
        this.props.router.push('/home')
      }
    }
  }
  addMoreStatus (event) {
    event.preventDefault()
    const statusValue = this.state.statusType
    const colorValue = this.state.background
    if (colorValue && statusValue != null) {
      this.props.callAddStatus(statusValue.replace(' ', '_'), colorValue)
      this.setState({
        statusType: '',
        background: ''
      })
    } else {
      notify('First Fill Status Type & Color')
    }
  }

  handleChangeComplete (color) {
    this.setState({ background: color.hex })
  };

  handleDelete () {
    this.props.callDeleteDeviceStatus(this.state.checkValue)
  }

  handleStatusClose () {
    this.setState({
      openStatus: false,
      statusType: '',
      background: ''
    })
  }

  render () {
    var text = <div>
          <TextField
            ref='value'
            floatingLabelText={'Status Type'}
            fullWidth
            onChange={(e) => {
              this.setState({
                colorPicker: 'show',
                statusType: e.target.value
              })
            }}
            value={this.state.statusType}
          />
      </div>

    const actions = [
      <FlatButton
        label="Delete"
        secondary
        onTouchTap={() => {
          if (this.state.checkValue != '') {
            if (confirm('Are you sure you want to delete this Device Status ?')) {
              this.handleDelete()
            };
          }
        }}
        style={{marginRight: 5}}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.handleStatusClose}
        style={{marginRight: 5}}
    />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.addMoreStatus}
    />
    ]
    return (
      <div>

      {
      this.props.logged_user.role === CONFIG.ADMIN
    ? <button className="md-btn md-raised m-b-sm indigo"
      onTouchTap={this.props.handleStatusOpen}>Add Status Type</button>
    : null
  }
      <Dialog
        title={'ADD STATUS TYPE'}
        titleStyle={{opacity: '0.56'}}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleStatusClose}>
        <div className="row m-0">
        <div className='col-sm-4' style={{overflowY: 'auto', maxHeight: '200px'}}>
          <label>Status Type List</label>
          <ol>
        {this.props.manageDevice.statusList.map((val, i) => {
          let col = this.props.deviceStatusList.filter(data => data.status === val.status)
          let statusColor
          if (col.length > 0) {
            statusColor = col[0].color
          }
          return <li key={i}>
            <input type='radio' name="first" value={val.status}
              onChange={(e) => {
                this.setState({checkValue: e.target.value})
              }}>
            </input>
            {val.status.replace('_', ' ')}
            <span style={{
              background: statusColor,
              marginLeft: '5%',
              width: '45px',
              height: '15px',
              color: statusColor
            }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
</li>
        })}
      </ol>
      </div>
    <div className='col-sm-8' style={{marginTop: '5%'}}>
    {text}
        {this.state.statusType
          ? <div className='col-sm-12 well'>
          <label>Add Color</label>
          <div className='row'>
        <div className='col-sm-6 '>
          <GithubPicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
            triangle={'top-left'} />
        </div>
        <div className="col-sm-6">
        <div className="panel panel-default">
          <div className="panel-heading">Selected Color</div>
          <div style={{backgroundColor: this.state.background, height: '41px'}}
            value={this.state.background} className="panel-body"></div>
        </div>
      </div>
    </div>
  </div>
  : null
  }
</div>
</div>
          </Dialog>
        </div>
    )
  }
  }
