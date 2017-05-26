import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Paper from 'material-ui/Paper'
var moment = require('moment')
import { CONFIG } from '../../config/index'
import * as actions_login from '../../actions/login/index'
import 'react-date-picker/index.css'
var moment = require('moment')

export default class DeviceCounter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceCountList: []
    }
  }
  componentWillMount () {
    this.props.onFetchDeviceCount()
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
    this.setState({
      deviceCountList: props.manageDevice.deviceCountList
    })
  }

  render () {
    let deviceCountData = this.state.deviceCountList
    let deviceData = deviceCountData
    let total = 0
    let newDeviceCountData = Object.keys(deviceData).map((key, i) => {
      total = total + deviceData[key]
      return <div className="col-xs-11 col-sm-4" key={i}>
          <div className="box p-a" style={{height: '80px'}}>
            <div className="pull-left m-r">
              <span className="w-48 rounded  accent">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
            </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted"> {key} </small>
              <h4 style={{float: 'right'}}>{deviceData[key]}</h4>
            </div>
          </div>
      </div>
    })
    return (
      <div>
        <div className="col-xs-12">
          <div className='row'>
              <div className="box p-a" style={{height: '87px'}}>
                <div className="pull-left m-r">
                  <span className="w-48 rounded primary">
                    <i className="fa fa-pie-chart fa-lg" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="clear">
                  <h4 className="m-a-0 text-lg _300"></h4>
                  <small className="text-muted"> Total Device </small>
                    <h1 style={{float: 'right', color: '#0E9BB1'}}>{total}</h1>
              </div>
              </div>
          </div>
        </div>
          <div className='row'>
            {newDeviceCountData}
              </div>
            </div>
    )
  }
}
