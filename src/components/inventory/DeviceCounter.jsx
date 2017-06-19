import * as _ from 'lodash';
var moment = require('moment');
import 'react-date-picker/index.css';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import React, {PropTypes} from 'react';
import { CONFIG } from '../../config/index';

export default class DeviceCounter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      statusListData: [],
      deviceCountList: {}
    };
  }
  componentWillMount () {
    this.props.onFetchDeviceCount();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.HR || localStorage.getItem('userid') === '375') {
      } else {
        this.props.router.push('/home');
      }
    }
    this.setState({
      statusListData: props.manageDevice.statusList,
      deviceCountList: props.manageDevice.deviceCountList
    });
  }

  render () {
    let deviceData = this.state.deviceCountList;
    let total = 0;
    let newDeviceCountData = Object.keys(deviceData).map((key, i) => {
      var ab = deviceData[key];
      let list = Object.keys(ab).map((k, idx) => {
        if (k == 'User_Assign' || k == 'User_Not_Assign' || k == 'Assigned') {
          return;
        } else {
          return <li key={idx}> {k} : {ab[k]}</li>;
        }
      });
      if (deviceData.hasOwnProperty(key)) {
        let a = deviceData[key];
        let b = {key};
        total = total + a.total;
        return <div className="col-xs-11 col-sm-4" key={i}>
          <div className="box p-a" style={{height: '350px'}}>
            <div className="pull-left m-r">
              <span className="w-48 rounded accent">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
              </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted" style={{color: '#000'}}>{b.key} </small>
              <h4 style={{float: 'right', marginTop: '-1%', color: '#0E9BB1'}}>{a.total}</h4>
            </div>
            <div className='well'>
              <ul className='text-muted'>
                <li>
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted" style={{color: '#000'}}>Assigned To User </small>
              <h4 style={{float: 'right', marginTop: '-1%', color: '#838383'}}>
                {a.User_Assign ? a.User_Assign : '0'}
              </h4>
              </li>
            <li>
            <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted" style={{color: '#000'}}>Not Assigned </small>
            <h4 style={{float: 'right', marginTop: '-1%', color: '#838383'}}>
              {a.User_Not_Assign ? a.User_Not_Assign : '0'}
            </h4>
            </li>
          </ul>
          </div>
            <br />
            <ul className='text-muted'>
              {list}
            </ul>
          </div>
        </div>;
      }
    });
    let statusList = this.state.statusListData.map((val, i) => {
      let statusColor = val.color;
      return <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2" key={i} >
        <div className="p-a" style={{backgroundColor: statusColor, margin: '2px 2px 2px 2px'}}>
          <h4></h4>
          <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '20%'}}>{val.status}</div>
        </div>
      </div>;
    });
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
                <small className="text-muted"> Device Status Overview </small>
              </div>

              <div className="box-body">
                <div className="row no-gutter m-b text-xs l-h-1x">
                  <div className="row">
                  {statusList}
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
    );
  }
}
