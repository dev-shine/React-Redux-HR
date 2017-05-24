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
      deviceTypeList: [],
      deviceList: []

    }
  }
  componentWillMount () {
    this.props.onFetchDeviceType().then((val) => {
      this.setState({deviceTypeList: val})
    })
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0)
    this.setState({
      deviceTypeList: props.manageDevice.deviceList,
      deviceList: props.manageDevice.device
    })
  }

  render () {
    console.log(this.state.deviceTypeList, 'llkkjslkfjsdfsg')
    let DeviceList = this.state.deviceTypeList.map((device, i) => {
      return (
      <option value={device} key={i}>{device}</option>)
    })

    return (
      <div>
        <div className="col-xs-12">
              <div className="box p-a" style={{height: '80px'}}>
                <div className="pull-left m-r">
                  <span className="w-48 rounded primary">
                    <i className="fa fa-pie-chart" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="clear">
                  <h4 className="m-a-0 text-lg _300"></h4>
                  <small className="text-muted"> Total Device </small>
                    <h2 style={{float: 'right'}}>{'60'}</h2>
              </div>
              </div>
          </div>
          <div className='row'>
            <div className="col-xs-12 col-sm-4">
              <div className="box p-a" style={{height: '80px', marginLeft: '4%'}}>
                <div className="pull-left m-r">
                  <span className="w-48 rounded  accent">
                    <i className="fa fa-laptop" aria-hidden="true"></i>
                </span>
                </div>
                <div className="clear">
                  <h4 className="m-a-0 text-lg _300"></h4>
                  <small className="text-muted"> Laptop </small>
                  <h4 style={{float: 'right'}}>{'15'}</h4>
                </div>
              </div>
          </div>

          <div className="col-xs-12 col-sm-4">
                <div className="box p-a" style={{height: '80px', marginLeft: '4%'}}>
                  <div className="pull-left m-r">
                    <span className="w-48 rounded  accent">
                      <i className="fa fa-desktop" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="clear">
                    <h4 className="m-a-0 text-lg _300"></h4>
                    <small className="text-muted"> Desktop </small>
                    <h4 style={{float: 'right'}}>{'15'}</h4>
                  </div>
                </div>
            </div>

            <div className="col-xs-12 col-sm-4">
                  <div className="box p-a" style={{height: '80px', marginRight: '4%'}}>
                    <div className="pull-left m-r">
                      <span className="w-48 rounded  accent">
                        <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                    </span>
                    </div>
                    <div className="clear">
                      <h4 className="m-a-0 text-lg _300"></h4>
                      <small className="text-muted"> Keyboard </small>
                        <h4 style={{float: 'right'}}>{'15'}</h4>
                    </div>
                  </div>
              </div>
              <div className="col-xs-12 col-sm-4">
                    <div className="box p-a" style={{height: '80px', marginLeft: '4%'}}>
                      <div className="pull-left m-r">
                        <span className="w-48 rounded  accent">
                          <i className="fa fa-desktop" aria-hidden="true"></i>
                      </span>
                      </div>
                      <div className="clear">
                        <h4 className="m-a-0 text-lg _300"></h4>
                        <small className="text-muted"> Monitor </small>
                          <h4 style={{float: 'right'}}>{'15'}</h4>
                      </div>
                    </div>
                </div>
              </div>
            </div>
    )
  }
}
