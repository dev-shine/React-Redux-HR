import React from "react";
import "react-date-picker/index.css";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router";
import { DateField } from "react-date-picker";
import { show_loading, hide_loading } from "appRedux/generic/actions/frontend";
import { notify } from "src/services/notify";
import TextField from "material-ui/TextField";
import AlertNotification from "components/generic/AlertNotification";
import CircularProgress from "material-ui/CircularProgress";
import DatePicker from "material-ui/DatePicker";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";
import * as actions from "appRedux/actions";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import * as actionsManageUsers from "appRedux/manageUsers/actions/manageUsers";
import style from "src/styles/inventory/viewUser.scss";
import Header from "components/generic/Header";
import Menu from "components/generic/Menu";
import { isNotUserValid } from "src/services/generic";
var moment = require("moment");

let purchase;
let warranty;
let datef;

class FormAddNewInventory extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      open: false,
      edit: false,
      id: "",
      user: "",
      autoOk: true,
      machine_type: "",
      machine_name: "",
      machine_price: "",
      serial_no: "",
      purchase_date: "",
      operating_system: "",
      comment: "",
      warranty_comment: "",
      repair_comment: "",
      bill_no: "",
      warranty: "",
      user_Id: "unassign",
      msg: "",
      deviceTypeList: [],
      deviceStatusList: [],
      loading: false,
      unassign_comment: ""
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleAddDevice = this.handleAddDevice.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleAddDialog = this.handleAddDialog.bind(this);
    this.openEditDevice = this.openEditDevice.bind(this);
  }

  componentWillMount() {
    this.props.onUsersList();
    this.props.onFetchDeviceType();
    this.props.onFetchDeviceStatus();
  }
  openEditDevice(id) {
    this.props.onGetDeviceById(id).then(val => {
      this.setState({
        edit: true,
        open: true,
        deviceId: id,
        status_message: "",
        getByIdData: val
      });
    });
  }
  componentWillReceiveProps(props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    this.setState({
      open: props.open,
      edit: props.edit,
      deviceTypeList: props.manageDevice.deviceList,
      deviceStatusList: props.manageDevice.statusList,
      username: props.manageUsers.username,
      user_profile_detail: props.manageUsers.user_profile_detail,
      user_assign_machine: props.manageUsers.user_assign_machine
    });
    <CircularProgress />;

    if (props.manageDevice.editData.edit) {
      purchase = moment(props.manageDevice.editData.device.date_of_purchase)._d;
      warranty = moment(props.manageDevice.editData.device.warranty_end_date)
        ._d;
      this.setState({
        id: props.manageDevice.editData.device.id,
        machine_type: props.manageDevice.editData.device.machine_type,
        machine_name: props.manageDevice.editData.device.machine_name,
        machine_price: props.manageDevice.editData.device.machine_price,
        serial_no: props.manageDevice.editData.device.serial_number,
        purchase_date: purchase,
        operating_system: props.manageDevice.editData.device.operating_system,
        status: props.manageDevice.editData.device.status,
        comment: props.manageDevice.editData.device.comments,
        warranty_comment: props.manageDevice.editData.device.warranty_comment,
        repair_comment: props.manageDevice.editData.device.repair_comment,
        bill_no: props.manageDevice.editData.device.bill_number,
        warranty: warranty,
        user_Id: props.manageDevice.editData.device.user_Id,
        unassign_comment: props.manageDevice.editData.device.unassign_comment
      });
      if (
        this.props.manageDevice.status_message ===
        "Successfully Updated into table"
      ) {
        this.props.manageDevice.status_message = "";
      }
    } else if (
      this.props.manageDevice.status_message ==
      "Inventory added successfully and need to be approved by admin!!"
    ) {
      this.setState({
        id: "",
        machine_type: "",
        machine_name: "",
        machine_price: "",
        serial_no: "",
        purchase_date: "",
        operating_system: "",
        status: "",
        comment: "",
        warranty_comment: "",
        repair_comment: "",
        bill_no: "",
        warranty: "",
        user_Id: "",
        loading: false,
        unassign_comment: ""
      });
      this.props.manageDevice.status_message = "";
    }
  }
  handleAddDevice() {
    let apiData = {
      machine_type: this.state.machine_type,
      machine_name: this.state.machine_name.trim(),
      machine_price: this.state.machine_price.trim(),
      serial_no: this.state.serial_no.trim(),
      purchase_date: this.state.purchase_date,
      operating_system: this.state.operating_system,
      status: this.state.status,
      comment: this.state.comment.trim(),
      warranty_comment: this.state.warranty_comment.trim(),
      repair_comment: this.state.repair_comment.trim(),
      bill_no: this.state.bill_no.trim(),
      warranty: this.state.warranty,
      user_Id: this.state.user_Id,
      unassign_comment: this.state.unassign_comment
    };
    let resetFields = {
      machine_type: "",
      machine_name: "",
      machine_price: "",
      serial_no: "",
      purchase_date: "",
      operating_system: "",
      comment: "",
      warranty_comment: "",
      repair_comment: "",
      bill_no: "",
      warranty: "",
      user_Id: "",
      unassign_comment: ""
    };
    let validate = true;
    this.setState({
      loading: true
    });
    if (validate && !this.props.manageDevice.editData.edit) {
      this.props.onAddNewMachine(apiData).then(
        val => {
          notify("Success !", val, "success");
          this.props.router.push(
            `/inventory_system/${this.state.machine_type}`
          );
          this.props.onFetchDevice();
        },
        error => {
          notify("Error !", error, "error");
          this.setState({
            loading: false
          });
        }
      );
    } else if (validate) {
      this.props
        .onUpdateDevice(this.state.id, apiData)
        .then(message => {
          notify("", message, "");
          if (message == "No fields updated into table") {
            this.setState({
              loading: false
            });
          }
          this.props.handleClose();
          this.props.onFetchDevice();
        })
        .catch(message => {
          this.setState({
            msg: message
          });
          this.props.router.push(
            `/inventory_system/${this.state.machine_type}`
          );
        });
    }
    return false;
  }
  handleAssign(deviceId, Userid) {
    this.setState({ userId: Userid });
    this.props.callAssign(deviceId, Userid);
  }

  handleChangeDate(event, date) {
    this.setState({
      purchase_date: date
    });
  }
  handleAddDialog() {
    this.setState({
      deviceId: "",
      open: true,
      status_message: "",
      edit: false
    });
  }

  render() {
    let userList = this.props.usersList.users.map((val, i) => {
      return (
        <option key={val.id} id={i} value={val.user_Id}>
          {val.name}
        </option>
      );
    });
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={
              this.props.manageDevice.editData.edit
                ? "Edit Inventory"
                : "Add New Inventory"
            }
            showLoading={this.props.frontend.show_loading}
          />
          <div className="addinventory">
            <AlertNotification message={this.state.msg} />
            <div>
              {/* <button style={{display:'inline-block',float:'left',marginRight:'2%'}} className="md-btn md-raised m-b-sm indigo">Approved Inventory</button>
          <button style={{display:'inline-block',float:'left',marginRight:'2%'}} className="md-btn md-raised m-b-sm indigo">Unapproved Inventory</button> */}
              {/* <button style={{float:'right',marginRight:'25px'}} className="md-btn md-raised m-b-sm indigo"
            onTouchTap={this.handleOpen}>Add New Inventory </button> */}
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {this.state.purchase_date ? "Date of Purchase" : ""}
                  <DatePicker
                    hintText="Date of Purchase"
                    onChange={(e, date) => {
                      this.setState({ purchase_date: date });
                    }}
                    textFieldStyle={{ width: "100%" }}
                    value={this.state.purchase_date}
                    required
                  />
                </div>

                <div className="col-md-6">
                  {this.state.warranty ? "Date Of Warrenty Expiry" : ""}
                  <DatePicker
                    hintText="Date Of Warrenty Expiry"
                    onChange={(e, date) => {
                      this.setState({ warranty: date });
                    }}
                    value={this.state.warranty}
                    required
                    textFieldStyle={{ width: "100%" }}
                  />
                </div>

                <div
                  className="col-md-6"
                  style={{ opacity: "0.56", marginTop: "2%" }}
                >
                  {"Machine/Device Type"}
                  <select
                    className="form-control"
                    ref="machine_type"
                    value={this.state.machine_type}
                    onChange={evt => {
                      this.setState({ machine_type: evt.target.value });
                    }}
                  >
                    <option value="" disabled>
                      --Select Device--
                    </option>
                    {this.state.deviceTypeList.map((val, i) => {
                      return (
                        <option key={i} value={val}>
                          {" "}
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className="col-md-6"
                  style={{ opacity: "0.56", marginTop: "2%" }}
                >
                  {"Status"}
                  <select
                    className="form-control"
                    ref="status"
                    value={this.state.status}
                    onChange={e => this.setState({ status: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      --Select Status--
                    </option>
                    {this.state.deviceStatusList.map((val, i) => {
                      return (
                        <option key={i} value={val.status}>
                          {" "}
                          {val.status}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-6">
                  <TextField
                    floatingLabelText="Machine Name"
                    fullWidth
                    onChange={e =>
                      this.setState({ machine_name: e.target.value })
                    }
                    onBlur={e => {
                      this.setState({
                        machine_name: this.state.machine_name.trim()
                      });
                    }}
                    value={this.state.machine_name}
                    required
                  />
                </div>

                <div
                  className="col-md-6"
                  style={{ opacity: "0.56", marginTop: "2%" }}
                >
                  {"Assign User"}
                  <select
                    value={this.state.user_Id}
                    onChange={evt => {
                      this.setState({ user_Id: evt.target.value });
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select User</option>
                    <option value="unassign">Unassign</option>
                    {userList.map((value, i) => {
                      return (
                        <option key={i} value={value}>
                          {" "}
                          {value.props.children}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {this.state.user_Id == "unassign" ? (
                  <div className="col-md-6">
                    <TextField
                      floatingLabelText="Unassign Device comment"
                      fullWidth
                      onChange={e =>
                        this.setState({ unassign_comment: e.target.value })
                      }
                      onBlur={e => {
                        this.setState({
                          unassign_comment: this.state.unassign_comment.trim()
                        });
                      }}
                      value={this.state.unassign_comment}
                      required
                    />
                  </div>
                ) : null}
                <div className="col-md-6">
                  <TextField
                    floatingLabelText="Price"
                    hintText="₹"
                    fullWidth
                    onChange={e =>
                      this.setState({ machine_price: e.target.value })
                    }
                    onBlur={e => {
                      this.setState({
                        machine_price: this.state.machine_price.trim()
                      });
                    }}
                    value={this.state.machine_price}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    floatingLabelText="Serial No"
                    fullWidth
                    onChange={e => this.setState({ serial_no: e.target.value })}
                    onBlur={e => {
                      this.setState({ serial_no: this.state.serial_no.trim() });
                    }}
                    value={this.state.serial_no}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    floatingLabelText="Excellence Serial no "
                    fullWidth
                    onChange={e => this.setState({ bill_no: e.target.value })}
                    onBlur={e => {
                      this.setState({ bill_no: this.state.bill_no.trim() });
                    }}
                    value={this.state.bill_no}
                  />
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <CircularProgress
                size={30}
                thickness={3}
                style={{ marginLeft: "50%" }}
              />
            ) : null}
            {this.state.loading == false ? (
              <button
                className="col-md-12 md-btn md-raised m-b-sm indigo invbtn"
                style={{ opacity: "0.76", marginTop: "2%" }}
                onClick={e => this.handleAddDevice(e)}
              >
                {this.props.manageDevice.editData.edit
                  ? "Update Inventory"
                  : "Add Inventory"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    usersList: state.usersList.toJS(),
    manageUsers: state.manageUsers.toJS(),
    loggedUser: state.logged_user.userLogin,
    manageDevice: state.manageDevice.toJS()
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    },
    onUserProfileDetails: (userid, username) => {
      return dispatch(
        actionsManageUsers.getUserProfileDetails(userid, username)
      );
    },
    onAddNewMachine: newMachineDetails => {
      return dispatch(actionsManageDevice.addNewMachine(newMachineDetails));
    },
    onFetchDevice: () => {
      return dispatch(actionsManageDevice.get_machines_detail());
    },
    onGetDeviceById: id => {
      return dispatch(actionsManageDevice.getDeviceById(id));
    },
    onUpdateDevice: (id, machineData) => {
      return dispatch(actionsManageDevice.updateDevice(id, machineData));
    },
    onFetchDeviceType: () => {
      return dispatch(actionsManageDevice.getDeviceType());
    },
    onFetchDeviceStatus: () => {
      return dispatch(actionsManageDevice.getDeviceStatus());
    },
    onShowTab: ()=>{
      return dispatch(actionsManageDevice.showTab());
    }
  };
};

const AddInvetorySystem = connect(mapStateToProps, mapDispatchToProps)(
  FormAddNewInventory
);

const RouterAddInventorySystem = withRouter(AddInvetorySystem);

export default RouterAddInventorySystem;
