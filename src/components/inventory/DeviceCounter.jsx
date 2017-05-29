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
      deviceCountList: {}
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
    let deviceData = this.state.deviceCountList
    let assigned = 0
    let notAssigned = 0
    let newMachine = 0
    let oldMachine = 0
    let notWorking = 0
    let working = 0
    let total = 0
    // console.log('deviceData', deviceData)
    let newDeviceCountData = Object.keys(deviceData).map((key, i) => {
      var ab = deviceData[key]
      var a = ab
      for (var k in a) {
      }
      if (deviceData.hasOwnProperty(key)) {
        let a = deviceData[key]
        let b = {key}
        total = total + a.total
        assigned = assigned + a.assigned
        if (a.not_assigned != null) {
          notAssigned = notAssigned + a.not_assigned
        }
        if (a.New != null) {
          newMachine = newMachine + a.New
        }
        if (a.Old != null) {
          oldMachine = oldMachine + a.Old
        }
        if (a.Working != null) {
          working = working + a.Working
        }
        notWorking = notWorking + a.NotWorking

        return <div className="col-xs-11 col-sm-4" key={i}>
            <div className="box p-a" style={{height: '185px'}}>
              <div className="pull-left m-r">
                <span className="w-48 rounded  accent">
                  <i className="fa fa-check-circle" aria-hidden="true"></i>
              </span>
              </div>
              <div className="clear">
                <h4 className="m-a-0 text-lg _300"></h4>
                <small className="text-muted">{b.key} </small>
                <h4 style={{float: 'right'}}>{a.total}</h4>
              </div>
            <ul>
              <li>
                {k} : {a[k]}
              </li>
            </ul>
              </div>
            </div>
      }
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
        <div className="col-xs-12">
          <div className='row'>
            <div className="box">
              <div className="box-header">
                <h3>Device Status Overview</h3>
                <small></small>
              </div>
              <div className="box-body">
                <div className="row no-gutter m-b text-xs l-h-1x">
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a green">
                      <h4>{working}</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}>Working</div>
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a yellow">
                      <h4>{assigned}</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}> Assigned</div>
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a white ">
                      <h4>{notAssigned}</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}>Not Assigned</div>
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a red">
                      <h4>0</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}>Not Working</div>
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a red-100">
                      <h4>{oldMachine}</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}>Old</div>
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                    <div className="p-a indigo">
                      <h4>{newMachine}</h4>
                      <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '25%'}}>New</div>
                    </div>
                  </div>
                </div>
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
