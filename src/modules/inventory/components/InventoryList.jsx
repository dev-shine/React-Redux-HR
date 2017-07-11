import React from 'react';
import * as _ from 'lodash';
import {notify, confirm} from 'src/services/notify';
import AddDeviceDialoge from 'modules/inventory/components/AddDeviceDialoge';
import AddDeviceStatus from 'modules/inventory/components/AddDeviceStatus';
var moment = require('moment');

class InventoryList extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      edit:             false,
      open:             false,
      openStatus:       false,
      id:               '',
      openSnackbar:     false,
      user:             '',
      search:           '',
      status_message:   '',
      deviceTypeList:   [],
      deviceStatusList: [],
      device_status:    '',
      deviceList:       [],
      statusList:       []
    };

    this.openEditDevice = this.openEditDevice.bind(this);
    this.deleteDevices = this.deleteDevices.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStatusOpen = this.handleStatusOpen.bind(this);
    this.handleStatusClose = this.handleStatusClose.bind(this);
    this.callAddDevice = this.callAddDevice.bind(this);
    this.callAddStatus = this.callAddStatus.bind(this);
    this.callDeleteDeviceStatus = this.callDeleteDeviceStatus.bind(this);
    this.handleDeviceTypeFilter = this.handleDeviceTypeFilter.bind(this);
    this.handleStatusTypeFilter = this.handleStatusTypeFilter.bind(this);
  }
  componentWillMount () {
    this.props.onFetchDeviceType().then((val) => {
      this.setState({deviceTypeList: val, deviceStatusList: val});
    });
    this.props.onFetchDeviceStatus().then((val) => {
      this.setState({deviceStatusList: val});
    });
  }

  componentWillReceiveProps (props) {
    if (props.manageDevice.status_message !== this.state.status_message) {
      this.setState({
        openSnackbar: true
      });
    } else {
      this.setState({
        openSnackbar: false
      });
    }

    this.setState({deviceTypeList: props.manageDevice.deviceList, deviceList: props.manageDevice.device});
    this.setState({
      deviceStatusList: props.manageDevice.statusList,
      statusList:       props.manageDevice.statusList
    });
  }
  openEditDevice (id) {
    this.props.openEditDevice(id);
  }

  deleteDevices (id) {
    this.props.deleteDevices(id);
  }
  callAddStatus (statusValue, colorValue) {
    this.props.onCallDeviceStatus(statusValue, colorValue).then((message) => {
      this.setState({
        statusType: '',
        background: '',
        checkValue: ''
      });
      notify('Success !', message, 'success');
      this.props.onFetchDeviceStatus();
      this.handleStatusClose();
    }, (error) => {
      notify('Error !', error, 'error');
    });
  }

  callAddDevice (deviceType) {
    this.props.onCallDeviceType(deviceType).then((message) => {
      this.setState({
        status_message: message
      });
      this.props.onFetchDeviceType();
    }, (error) => {
      notify('Error !', error, 'error');
    });
  }
  handleStatusClose () {
    this.setState({
      openStatus: false,
      statusType: '',
      background: ''
    });
  }
  handleStatusOpen () {
    this.setState({
      openStatus: true
    });
  }

  handleOpen (e) {
    e.stopPropagation();
    this.setState({
      open: true
    });
  }
  handleClose () {
    this.setState({
      open: false

    });
  }

  handleAssign (id, userId) {
    this.setState({user: userId});
    this.props.callAssign(id, userId);
  }

  callDeleteDeviceStatus (checkValue) {
    this.props.onDeleteDeviceStatus(checkValue).then((val) => {
      if (val.error === 1) {
        this.setState({
          statusType: '',
          background: '',
          checkValue: ''
        });
        notify('Error !', 'This Device Status Type Is In Use', 'error');
        this.handleStatusClose();
      } else if (val.message) {
        this.setState({
          status_message: val.message
        });
        notify('', this.state.status_message, 'info');
        this.handleStatusClose();
      } else {
        this.setState({
          statusType: '',
          background: '',
          checkValue: ''
        });
        this.handleStatusClose();
      }
    });
    this.props.onFetchDeviceStatus();
  }

  handleDeviceTypeFilter (deviceType) {
    let devices = this.props.manageDevice.device;
    if (this.state.device_status !== '') {
      devices = this.state.deviceList;
    }
    if (deviceType !== '') {
      devices = _.filter(devices, row => row.machine_type === deviceType);
    } else {
      if (this.state.device_status !== '') {
        devices = _.filter(this.props.manageDevice.device, row => row.status === this.state.device_status);
      }
    }
    if (this.state.device_status !== '' && deviceType !== '') {
      devices = _.filter(this.props.manageDevice.device, row => (row.machine_type === deviceType && row.status === this.state.device_status));
    }
    this.setState({
      deviceList: devices,
      search:     deviceType

    });
  }

  handleStatusTypeFilter (statusType) {
    let status = this.props.manageDevice.device;
    if (this.state.search !== '') {
      status = this.state.deviceList;
    }
    if (statusType !== '') {
      status = _.filter(status, row => row.status === statusType);
    } else {
      if (this.state.search !== '') {
        status = _.filter(this.props.manageDevice.device, row => row.machine_type === this.state.search);
      }
    }
    if (statusType !== '' && this.state.search !== '') {
      status = _.filter(this.props.manageDevice.device, row => (row.machine_type === this.state.search && row.status === statusType));
    }
    this.setState({
      deviceList:    status,
      device_status: statusType
    });
  }
  render () {
    var statusList = this.state.deviceStatusList || [];

    let statusDropMap = statusList.map((val, i) => {
      return (
        <option value={val.status} key={i}>{val.status}</option>);
    });

    let statusDrop = statusDropMap;

    let listDropMap = this.state.deviceTypeList.map((val, i) => {
      return (<option value={val} key={i}>{val}</option>);
    });
    let listDrop = listDropMap.reverse();
    let devices = this.state.deviceList;
    let statusVal = this.state.deviceStatusList;

    let rowColor;
    let rows = [];
    _.map(devices, (device, i) => {
      let rowColorData = statusVal.filter(val => val.status === device.status);
      if (rowColorData.length > 0) {
        rowColor = rowColorData[0].color;
      }
      rows.push(<tr key={i} style={{background: rowColor, borderBottom: '2px solid white'}}>
        <td style={{marginRight: '0%'}}>{i + 1}</td>
        <td>{device.machine_type}</td>
        <td style={{align: 'center'}}>{device.machine_name}</td>
        <td style={{align: 'center'}}>
          {<b>Purchase Date : </b>}
          {moment(device.date_of_purchase).format('Do MMMM YYYY')}
          <br /> <br />
          {<b>Warranty Expire : </b>}
          {moment(device.warranty_end_date).format('Do MMMM YYYY')}
        </td>
        <td style={{align: 'center'}}>
          {device.mac_address}
          <br />
        </td>
        <td style={{align: 'center'}}>{'₹'}{device.machine_price}</td>
        <td style={{align: 'center'}}>
          {device.serial_number}
          <br />
          {<b>Bill No : </b>}
          {device.bill_number} <br />
        </td>
        <td>
          <ul style={{padding: '0'}}>
            <li>{<b>Status : </b>}</li>
            {device.status} <br />
            <li>{<b>Working Comments:</b>}</li>
            {device.comments} <br />
            <li>{<b>Extended Warranty:</b>}</li>
            {device.warranty_comment} <br />
            <li>{<b>Pre Repair Comments:</b>}</li>
            {device.repair_comment} <br />
          </ul>
        </td>
        <td style={{align: 'center'}}>
          {device.name}
        </td>
        <td style={{marginTop: '5%', align: 'center'}}>
          <i className="fa fa-lg fa-pencil-square-o" style={{color: '#3f51b5', cursor: 'pointer'}} onClick={() => {
            this.openEditDevice(device.id);
          }} aria-hidden="true"></i>
        </td>
        <td style={{marginRight: '5%', align: 'center'}} >
          <i className="fa fa-lg fa fa-trash" style={{color: '#B71C1C', cursor: 'pointer'}} onClick={() => {
            confirm('Are you sure ?', 'Do you want to delete this record ?', 'warning').then((res) => {
              if (res) {
                this.deleteDevices(device.id);
              }
            });
          }} aria-hidden="true"></i>
        </td>
      </tr>);
    });
    return (
      <div>
        <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" style={{'float': 'right'}}>
            <div className="row">
              <div className="row no-gutter">
                <div className="col-md-3 p-r" >
                  <div className="form-group" style={{marginLeft: '4%'}}>
                    <label style={{'fontSize': 15}}>Filter:</label>
                    <select className="form-control"
                      ref="device_type"
                      value={this.state.search}
                      onChange={(e) => {
                        this.handleDeviceTypeFilter(e.target.value);
                      }}>
                      <option value="">--Select Device Type--</option>
                      {listDrop}
                    </select>
                  </div>
                </div>
                <div className="col-md-3 p-r">
                  <div className="form-group">
                    <label style={{marginTop: '6%'}}> </label>
                    <select className="form-control" ref="device_status"
                      value={this.state.device_status}
                      onChange={(e) => {
                        this.handleStatusTypeFilter(e.target.value);
                      }}>
                      <option value="">--Select Device Status--</option>
                      {statusDrop}
                    </select>
                  </div>
                </div>
                <div className='row m-0'>
                  <div className='buttonbox'>
                    <div className='col-sm-2 p-0 pt-5' style={{marginLeft: '16%', paddingLeft: '8%'}}>
                      <div className=" text-left" style={{marginTop: '26px'}}>
                        <AddDeviceStatus
                          callAddStatus={this.callAddStatus}
                          handleStatusClose={this.handleStatusClose}
                          handleStatusOpen={this.handleStatusOpen}
                          open={this.state.openStatus}
                          callDeleteDeviceStatus={this.callDeleteDeviceStatus}
                          deviceStatusList={this.state.deviceStatusList}
                          {...this.props} />
                      </div>
                    </div>
                    <div className='col-sm-2 p-0 pt-5'>
                      <div className="text-left" style={{marginTop: '26px', paddingLeft: '43px'}}>
                        <AddDeviceDialoge callAddDevice={this.callAddDevice}
                          handleClose={this.handleClose}
                          handleOpen={this.handleOpen}
                          open={this.state.open}
                          deviceTypeList={this.state.deviceTypeList}
                          {...this.props} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-divider m-a-0"></div>
                  <div>
                    <table key='' className="table table-striped table-hover">
                      <thead className="col-12" style={{align: 'center'}}>
                        <tr>
                          <th>Sr. No</th>
                          <th>Device Type</th>
                          <th>Name</th>
                          <th>Dates</th>
                          <th>Mac Address</th>
                          <th>Price</th>
                          <th>Serial No</th>
                          <th style={{'textAlign': 'center', paddingLeft: '0px'}}>
                            Status/Commments
                          </th>
                          <th>Assigned UserName</th>
                          <th> Actions </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryList;
