import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {notify} from '../../services/index'
import 'react-date-picker/index.css'
var moment = require('moment')
import { GithubPicker } from 'react-color'
import { CONFIG } from '../../config/index'

export default class AddDeviceStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      background: '',
      colorPicker: 'hide',
      statusType: '',
      open: false,
      statusList: [],
      checkValue: []
    }

    this.addMoreStatus = this.addMoreStatus.bind(this)
    // this.addStatusType = this.addStatusType.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.setValue = this.setValue.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
  }
  componentWillReceiveProps (props) {
    this.setState({statusList: props.deviceStatusList, open: props.open})
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
    let statusList = this.state.statusList
    checkValue.map((val) => {
      _.pull(statusList, val)
    })
    this.props.onCallDeviceStatus(statusList).then((val) => {
      if (val.data.not_delete) {
        this.setState({statusList: this.state.statusList, checkValue: []})
        alert('Device Status in Use')
      } else {
        this.setState({statusList, checkValue: []})
      }
    })
  }

  handleClose () {
    this.setState({
      open: false,
      statusType: ''
    })
  };

  setValue (e) {
    if (e.target.checked) {
      let array = this.state.checkValue
      array.push(e.target.value)
      this.setState({checkValue: array})
    } else if (!e.target.checked) {
      let array = this.state.checkValue
      _.pull(array, e.target.value)
      this.setState({
        checkValue: array
      })
    }
  }

  addMoreStatus () {
    if (!_.isEmpty(this.state.statusType)) {
      var statusList = this.state.statusList
      let arr = _.filter(statusList, status => status === this.state.statusType)
      if (arr.length > 0) {
        alert('This Device Status Already In Use')
        this.setState({
          statusType: ''
        })
      } else {
        let aa = {
          'this.state.statusType': this.state.background
        }
        statusList.push(aa)
        this.setState({
          statusList: statusList
        })
      }
    }
    this.props.callAddStatus(statusList)
  }
  // addStatusType () {
  //   this.props.callAddStatus(this.state.statusList)
  // }
  handleChangeComplete (color) {
    this.setState({ background: color.hex })
  };

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
    var status = []
    var statusList = this.state.statusList
    for (var i = 0; i < statusList.length; i = i + 2) {
      status.push(<li key={i}>
        <input type='checkbox' value={statusList[i]}

          onChange={(e) => {
            this.setValue(e)
          }}>
        </input> {statusList[i].replace('_', ' ')}
      </li>)
    }
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
        onRequestClose={this.props.handleStatusClose}
                  ><div className="row m-0">
                    <div className='col-sm-3'style={{overflowY: 'auto', maxHeight: '200px'}}>
                    <label>Device Type List</label>
                    <ol>
                  {status}
                </ol>
                </div>
                <div className='col-sm-9' style={{marginTop: '2%'}}>
                {text}
                <div className='box'>

                </div>
                {this.state.statusType
                  ? <div className='col-md-12'>
                  <div className='row'>
                <div className='col-sm-6'>
                  <GithubPicker
                    color={this.state.background}
                    onChangeComplete={this.handleChangeComplete}
                    triangle={'top-right'} />
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
