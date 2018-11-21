import React from "react";
import * as _ from "lodash";
import { notify, confirm } from "src/services/notify";
import { getLowerCase, getLoggedUser } from "src/services/generic";
import AddDeviceDialoge from "src/modules/inventory/components/AddDeviceDialoge";
import AddDeviceStatus from "src/modules/inventory/components/AddDeviceStatus";
import { CONFIG } from "config";
import style from "src/styles/inventory/viewUser.scss";
var moment = require("moment");
import { CSVLink } from 'react-csv';
import {deviceKeys} from 'services/index';


let devices;
let capitalizeDevice;
class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      edit: true,
      open: false,
      openStatus: false,
      id: "",
      openSnackbar: false,
      user: "",
      status_message: "",
      search: "",
      deviceTypeList: [],
      deviceStatusList: [],
      device_status: "",
      deviceList: [],
      statusList: [],
      deviceVal: "",
      unapprovedList: [],
      approveDialog: false,
      headerData:[]
    };

    this.openEditDevice = this.openEditDevice.bind(this);
    this.deleteDevices = this.deleteDevices.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStatusOpen = this.handleStatusOpen.bind(this);
    this.handleStatusClose = this.handleStatusClose.bind(this);
    this.callAddDevice = this.callAddDevice.bind(this);
    this.sendUnapprovedId = this.sendUnapprovedId.bind(this);
    this.callAddStatus = this.callAddStatus.bind(this);
    this.callDeleteDeviceStatus = this.callDeleteDeviceStatus.bind(this);
    this.handleDeviceTypeFilter = this.handleDeviceTypeFilter.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.handleInventory = this.handleInventory.bind(this);
    this.handleStatusTypeFilter = this.handleStatusTypeFilter.bind(this);
  }
  componentWillMount() {
    this.props.onFetchDeviceType().then(val => {
      this.setState({ deviceTypeList: val, deviceStatusList: val });
    });
    this.props.onFetchDeviceStatus().then(val => {
      this.setState({ deviceStatusList: val });
    });
  }
  handleHeaderData(deviceList){
    let headerData = [];
    let headerLabel = '';
    if(deviceList && deviceList.length >= 1){
      let headerObject = deviceKeys;
        _.map(headerObject,(keys,k)=>{
          let label = keys.split("_").join(" ");
          headerLabel = label.charAt(0).toUpperCase() + label.slice(1);
          let header = {
            label:headerLabel,
            key:keys
          }
        headerData.push(header);
        })
       return headerData;
    }
  }
  componentWillReceiveProps(props) {
    if (props.manageDevice.status_message !== this.state.status_message) {
      this.setState({
        openSnackbar: true
      });
    } else {
      this.setState({
        openSnackbar: false
      });
    }
    let unapprovedList = _.orderBy(props.manageDevice.unapprovedList.data,['id'],['desc']);
    this.setState({
      deviceTypeList: props.manageDevice.deviceList,
      deviceList: props.manageDevice.device,
      deviceStatusList: props.manageDevice.statusList,
      statusList: props.manageDevice.statusList,
      unapprovedList: unapprovedList
    });
    if (props.searchVal !== undefined) {
      this.handleDeviceTypeFilter(props.searchVal);
    }
    if (
      props.manageDevice.approvedList == "Machine status updated successfully"
    ) {
      this.setState({
        approveDialog: false
      });
      props.manageDevice.approvedList = "";
    }
    if (!_.isEqual(this.state.deviceList, props.manageDevice.device)) {
      this.setState(
        {
          deviceList: props.manageDevice.device
        },
        () => {
          this.state.search
            ? this.handleDeviceTypeFilter(this.state.search)
            : this.handleDeviceTypeFilter(this.props.routeParams.device);
        }
      );
      this.handleStatusTypeFilter("Working");
    }
  }

  openEditDevice(device) {
    this.setState({
      edit: true,
      open: false
    });
    this.props.editAction(device, this.state.edit, this.state.open);
    this.props.router.push("/addInventory");
  }

  deleteDevices(id, userId) {
    this.props.deleteDevices(id);
  }
  callAddStatus(statusValue, colorValue) {
    this.props.onCallDeviceStatus(statusValue, colorValue).then(
      message => {
        this.setState({
          statusType: "",
          background: "",
          checkValue: ""
        });
        notify("", message, "");
        this.props.onFetchDeviceStatus();
      },
      error => {
        notify("Error !", error, "error");
      }
    );
  }

  callAddDevice(deviceType) {
    this.props.onCallDeviceType(deviceType).then(
      message => {
        this.setState({
          status_message: message
        });
        this.props.onFetchDeviceType();
      },
      error => {
        notify("Error !", error, "error");
      }
    );
  }
  handleStatusClose() {
    this.setState({
      openStatus: false,
      statusType: "",
      background: ""
    });
  }
  handleStatusOpen() {
    this.setState({
      openStatus: true
    });
  }

  handleOpen(e) {
    e.stopPropagation();
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
  }

  handleAssign(id, userId) {
    this.setState({ user: userId });
    this.props.callAssign(id, userId);
  }
  handleInventory(id) {
    this.props.router.push(
      `inventory_system/${this.props.routeParams.device}/${id}`
    );
  }

  callDeleteDeviceStatus(checkValue) {
    this.props.onDeleteDeviceStatus(checkValue).then(val => {
      if (val.error === 1) {
        this.setState({
          statusType: "",
          background: "",
          checkValue: ""
        });
        notify("Error !", "This Device Status Type Is In Use", "error");
        this.handleStatusClose();
      } else if (val.message) {
        this.setState({
          status_message: val.message
        });
        notify("", this.state.status_message, "info");
        this.handleStatusClose();
      } else {
        this.setState({
          statusType: "",
          background: "",
          checkValue: ""
        });
        this.handleStatusClose();
      }
    });
    this.props.onFetchDeviceStatus();
  }

  async handleDeviceTypeFilter(deviceType) {
    if (this.state.deviceTypeList === this.props.manageDevice.deviceList) {
      let devices = this.props.manageDevice.device;
      if (this.state.device_status !== "") {
        devices = this.state.deviceList;
      }
      if (deviceType !== "") {
        devices = _.filter(
          devices,
          row => getLowerCase(row.machine_type) === getLowerCase(deviceType)
        );
      } else {
        if (this.state.device_status !== "") {
          devices = _.filter(
            this.props.manageDevice.device,
            row =>
              getLowerCase(row.status) ===
              getLowerCase(this.state.device_status)
          );
        }
      }
      if (this.state.device_status !== "" && deviceType !== "") {
        devices = _.filter(
          this.props.manageDevice.device,
          row =>
            getLowerCase(row.machine_type) === getLowerCase(deviceType) &&
            getLowerCase(row.status) === getLowerCase(this.state.device_status)
        );
      }
      let header = this.handleHeaderData(devices);
      this.setState({
        deviceList: devices,
        search: deviceType,
        headerData:header,
      });
    }
  }

  handleInventory(id) {
    this.props.router.push(
      `inventory_system/${this.props.routeParams.device}/${id}`
    );
  }

  async handleStatusTypeFilter(statusType) {
    let status = this.props.manageDevice.device;
    if (this.state.search !== "") {
      status = this.state.deviceList;
    }
    if (statusType !== "") {
      status = _.filter(
        status,
        row => getLowerCase(row.status) === getLowerCase(statusType)
      );
    } else {
      if (this.state.search !== "") {
        status = _.filter(
          this.props.manageDevice.device,
          row =>
            getLowerCase(row.machine_type) === getLowerCase(this.state.search)
        );
      }
    }
    if (statusType !== "" && this.state.search !== "") {
      status = _.filter(
        this.props.manageDevice.device,
        row =>
          getLowerCase(row.machine_type) === getLowerCase(this.state.search) &&
          getLowerCase(row.status) === getLowerCase(statusType)
      );
    }
    let header = this.handleHeaderData(status);
    this.setState({
      deviceList: status,
      device_status: statusType,
      headerData:header,
    });
  }

  capitalize(string) {
    return (
      string && string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
  }

  sendUnapprovedId(id) {
    this.setState({ id: id });
    this.props.callUnapprovedId({ id });
  }
  render() {
    let fileNames = this.props.routeParams.device;
    if(this.props.searchVal.length >= 1){
      fileNames = this.props.searchVal.toLowerCase();
    }
    let path = CONFIG.inventory_images;
    const role = getLoggedUser().data.role;
    var statusList = this.state.deviceStatusList || [];
    let statusDropMap = statusList.map((val, i) => {
      return (
        <option value={val.status} key={i}>
          {val.status}
        </option>
      );
    });

    let statusDrop = statusDropMap;
    let listDropMap = this.state.deviceTypeList.map((val, i) => {
      return (
        <option value={val} key={i}>
          {val}
        </option>
      );
    });
    let listDrop = listDropMap.reverse();
    devices =
      this.props.fourthArrow === "show"
        ? this.state.unapprovedList
        : this.state.deviceList;
    let statusVal = this.state.deviceStatusList;

    let rowColor;
    let rows = [];
    _.map(devices, (device, i) => {
      let rowColorData = statusVal.filter(val => val.status === device.status);
      if (rowColorData.length > 0) {
        rowColor = rowColorData[0].color;
      }
      rows.push(
        <tr
          key={i}
          style={{ background: rowColor, borderBottom: "2px solid white" }}
        >
          <td
            onClick={() => this.handleInventory(device.id)}
            style={{ marginRight: "0%", width: "5%", cursor: "pointer" }}
          >
            {i + 1}
          </td>
          <td
            onClick={() => this.handleInventory(device.id)}
            style={{ marginRight: "0%", width: "16%", cursor: "pointer" }}
          >
            {device.machine_type}
            <br />
            {<b>Assigned to :</b>}
            <mark> {device.name}</mark>
          </td>

          <td
            className="tdAlign"
            onClick={() => this.handleInventory(device.id)}
            style={{ marginRight: "0%", width: "15%", cursor: "pointer" }}
          >
            {device.machine_name}
            <br />
            <br />

            {(device.fileInventoryPhoto === null) | undefined ? (
              ""
            ) : (
              <a className="thumbnail">
                <img src={path + device.fileInventoryPhoto} />
              </a>
            )}
          </td>

          <td
            className="tdAlign"
            onClick={() => this.handleInventory(device.id)}
            style={{ cursor: "pointer" }}
          >
            <ul style={{ padding: "0" }}>
              <li>{<b>Purchase Date : </b>} </li>
              {moment(device.date_of_purchase).format("Do MMMM YYYY")}
              <br />
              <li>{<b>Warranty Expire : </b>} </li>
              {moment(device.warranty_end_date).format("Do MMMM YYYY")}
              <br />
              <li>{<b>Price : </b>} </li>
              {"₹"}
              {device.machine_price}
              <br />
              <li>{<b>Serial No : </b>} </li>
              {device.serial_number}
              <br />
            </ul>
          </td>

          <td
            className="tdAlign"
            onClick={() => this.handleInventory(device.id)}
            style={{ cursor: "pointer" }}
          >
            <ul style={{ padding: "0" }}>
              <li>{<b>Status : </b>}</li>
              {device.status} <br />
              <li>{<b>Excellence Bill No:</b>}</li>
              {device.bill_number} <br />
              <li>{<b>Extended Warranty:</b>}</li>
              {device.warranty_comment} <br />
              <li>{<b>Pre Repair Comments:</b>}</li>
              {device.repair_comment} <br />
            </ul>
          </td>
          {role === CONFIG.ADMIN || CONFIG.HR ? (
            <td className="tdAlign row" style={{ marginTop: "5%" }}>
              <button
                className="md-btn md-raised m-b-sm indigo"
                onClick={e => {
                  e.nativeEvent.stopImmediatePropagation();
                  this.openEditDevice(device);
                }}
              >
                Edit
              </button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="md-btn md-raised m-b-sm indigo"
                onClick={() => {
                  confirm(
                    "Are you sure ?",
                    "Do you want to delete this record ?",
                    "warning"
                  ).then(res => {
                    if (res) {
                      this.deleteDevices(
                        device.id,
                        this.props.loggedUser.data.id
                      );
                      notify("Deleted !", "", "success");
                    }
                  });
                }}
                aria-hidden="true"
              >
                Delete
              </button>
              <div>
                {this.props.fourthArrow === "show" ? (
                  <button
                    className="md-btn md-raised m-b-sm indigo"
                    style={{ marginTop: "15%" }}
                    onClick={() => {
                      this.sendUnapprovedId(device.id);
                    }}
                  >
                    Approve
                  </button>
                ) : null}
              </div>
            </td>
          ) : null}
        </tr>
      );
    });
    return (
      <div>
        <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" style={{ float: "right" }}>
            <div className="row">
              <div className="row no-gutter">
                {this.props.fourthArrow === "hidden" ? (
                  <div>
                    <div className="col-md-3 p-r">
                      <div className="form-group" style={{ marginLeft: "4%" }}>
                        <label style={{ fontSize: 15 }}>Filter:</label>
                        <select
                          className="form-control"
                          ref="device_type"
                          value={this.state.search}
                          onChange={e =>
                            this.props.deviceTypeData(e.target.value)
                          }
                        >
                          <option value="">--Select Device Type--</option>
                          {listDrop}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 p-r">
                      <div className="form-group selectDevice">
                        <label style={{ marginTop: "6%" }}> </label>
                        <select
                          className="form-control"
                          ref="device_status"
                          value={this.state.device_status}
                          onChange={e => {
                            this.handleStatusTypeFilter(e.target.value);
                          }}
                        >
                          <option value="">--Select Device Status--</option>
                          {statusDrop}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row m-0">
                  {this.props.fourthArrow === "show" &&
                  this.state.approveDialog ? (
                    <div style={{ marginLeft: "35%", color: "red" }}>
                      Machine is successfully approved
                    </div>
                  ) : null}

                  <div
                    className="buttonbox"
                    style={{ float: "right", marginRight: "1%" }}
                  >
                     <div className="col-sm-4 p-0 pt-5">
                      <CSVLink data={this.state.deviceList} headers={this.state.headerData} filename={`inventory-${fileNames}-report-${moment().format("YYYY-MMMM-DD")}.csv`} style={{float: "right", marginRight: "25px", color: '#337ab7', textDecoration: 'underline',marginTop: '30px', marginLeft: "17px" }} >
                        Download Report
                      </CSVLink>
                    </div>
                    <div className="col-sm-3 p-0 pt-5">
                      <div className=" text-left" style={{ marginTop: "26px" }}>
                        <AddDeviceStatus
                          callAddStatus={this.callAddStatus}
                          handleStatusClose={this.handleStatusClose}
                          handleStatusOpen={this.handleStatusOpen}
                          open={this.state.openStatus}
                          callDeleteDeviceStatus={this.callDeleteDeviceStatus}
                          deviceStatusList={this.state.deviceStatusList}
                          {...this.props}
                        />
                      </div>
                    </div>
                   
                    <div className="col-sm-2 p-0 pt-5">
                      <div
                        className="text-left  addcomp"
                        style={{ marginTop: "26px", paddingLeft: "43px" }}
                      >
                        <AddDeviceDialoge
                          callAddDevice={this.callAddDevice}
                          handleClose={this.handleClose}
                          handleOpen={this.handleOpen}
                          open={this.state.open}
                          deviceTypeList={this.state.deviceTypeList}
                          {...this.props}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-divider m-a-0" />
                  <div className="table-responsive">
                    <table key="" className="table">
                      <thead className="success">
                        <tr>
                          <th>Sr. No</th>
                          <th>Device</th>
                          <th>Name</th>
                          <th>Informations</th>
                          <th>Status/Commments</th>
                          {role === CONFIG.ADMIN || CONFIG.HR ? <th>Actions</th> : null}
                        </tr>
                      </thead>
                      <tbody>{rows}</tbody>
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
