import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router";
import _ from "lodash";
import { notify } from "../../../services/notify";
import Menu from "../../../components/generic/Menu";
import { isNotUserValid } from "../../../services/generic";
import LoadingIcon from "../../../components/generic/LoadingIcon";
import Header from "../../../components/generic/Header";
import AlertNotification from "../../../components/generic/AlertNotification";
import UsersList from "../../../components/generic/UsersList";
import FormAddNewInventory from "../../../modules/inventory/components/AddInventory";
import ViewUserDevice from "../../../components/inventory/ViewUser";
import InventoryList from "../../../modules/inventory/components/InventoryList";
import DeviceCounterTab from "../../../components/inventory/DeviceCounterTab";
import style from "../../../styles/inventory/viewUser.scss";
import * as actionsManageDevice from "../../../redux/inventory/actions/inventory";
import * as actions from '../../../redux/actions';
import * as actionsUsersList from "../../../redux/generic/actions/usersList";
import * as actionsManageUsers from "../../redux/manageUsers/actions/manageUsers";
import moment from 'moment';


class InventorySystem extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      defaultUserDisplay: "",
      search: "",
      status_message: "",
      active: "active",
      firstArrow: "show",
      secondArrow: "hidden",
      thirdArrow: "hidden",
      deviceList: "row ",
      viewUser: "hidden",
      viewUserNew: "hidden",
      fourthArrow: "hidden",
      open: false,
      edit: false,
      deviceId: "",
      user_profile_detail: {},
      user_assign_machine: [],
      getByIdData: {},
      unapprovedList: {},
      openUnapprove: "",
      selectedTab: false
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(
      this
    );
    this.openEditDevice = this.openEditDevice.bind(this);
    this.handleAddDialog = this.handleAddDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteDevices = this.deleteDevices.bind(this);
    this.callAssign = this.callAssign.bind(this);
    this.openPage = this.openPage.bind(this);
    this.unapprovedList = this.unapprovedList.bind(this);
    this.callFetchDeviceType = this.callFetchDeviceType.bind(this);
    this.callFetchDeviceStatus = this.callFetchDeviceStatus.bind(this);
    this.callUnapprovedId = this.callUnapprovedId.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.editAction = this.editAction.bind(this);
  }
  componentWillMount() {
    this.props.onFetchDevice();
    this.props.onUsersList();
    this.props.onFetchDeviceType();
    this.props.onFetchDeviceStatus();
    this.props.onFetchDeviceCount();
    this.props.onFetchUnapprovedUser();
  }
  componentWillReceiveProps(props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    this.setState({
      username: props.manageUsers.username,
      user_profile_detail: props.manageUsers.user_profile_detail,
      user_assign_machine: props.manageUsers.user_assign_machine
    });
    if (props.manageDevice.showTab) {
      this.openPage("unapproved_user");
      this.setState({ selectedTab: true });
      this.props.onNoTab();
    }
  }

  componentDidUpdate() {
    if (this.state.defaultUserDisplay === "") {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        let defaultUserName = firstUser.username;
        this.onUserClick(defaultUserId, defaultUserName);
      }
    }
  }
  onUserClick(userid, username) {
    let selectedUserName = "";
    let selectedUserImage = "";
    let selectedUserJobtitle = "";
    let selectedUserId = "";
    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, { user_Id: userid });
      if (typeof userDetails !== "undefined") {
        selectedUserName = userDetails.name;
        selectedUserImage = userDetails.slack_profile.image_192;
        selectedUserJobtitle = userDetails.jobtitle;
        selectedUserId = userDetails.user_Id;
      }
    }
    this.setState({
      defaultUserDisplay: userid,
      selectedUserName: selectedUserName,
      selectedUserImage: selectedUserImage,
      selectedUserJobtitle: selectedUserJobtitle,
      selectedUserId: selectedUserId
    });
    this.props.onUserProfileDetails(userid, username);
  }

  callUpdateUserDeviceDetails(newDeviceDetails) {
    this.props.onUpdateUserDeviceDetails(newDeviceDetails).then(
      data => {},
      error => {
        notify("Error !", error, "error");
      }
    );
  }
  callFetchDeviceType() {
    this.onFetchDeviceType();
  }
  callFetchDeviceStatus() {
    this.onFetchDeviceStatus();
  }
  editAction(device, edit, open) {
    this.props.onUserEditData(device, edit, open);
  }
  openPage(toDisplay) {
    if (toDisplay === "device_list") {
      this.setState({
        deviceList: "row",
        firstArrow: "show",
        viewUser: "hidden",
        viewUserNew: "hidden",
        secondArrow: "hidden",
        thirdArrow: "hidden",
        thirdArrow: "hidden",
        fourthArrow: "hidden"
      });
    } else if (toDisplay === "view_user") {
      this.setState({
        deviceList: "hidden",
        firstArrow: "hidden",
        viewUser: "row",
        secondArrow: "show",
        thirdArrow: "hidden",
        viewUserNew: "hidden",
        thirdArrow: "hidden",
        fourthArrow: "hidden"
      });
    } else if (toDisplay === "view_user_new") {
      this.setState({
        deviceList: "hidden",
        firstArrow: "hidden",
        viewUser: "hidden",
        viewUserNew: "hidden",
        secondArrow: "hidden",
        thirdArrow: "show",
        thirdArrow: "hidden",
        fourthArrow: "hidden"
      });
      this.props.router.push("inventoryOverviewDetail");
    } else if (toDisplay === "unapproved_user") {
      this.setState({
        deviceList: "show",
        firstArrow: "hidden",
        viewUser: "hidden",
        secondArrow: "hidden",
        thirdArrow: "hidden",
        viewUserNew: "hidden",
        fourthArrow: "show"
      });
    }
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
  deleteDevices(id, userId) {
    this.props.onDeleteDevice(id, userId).then(val => {
      this.setState({
        status_message: ""
      });
      this.props.onFetchDevice();
    });
  }
  handleClose() {
    this.setState({
      open: false,
      status_message: "",
      edit: false,
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
      warranty: "",
      user_Id: ""
    });
  }
  addDevice() {
    this.setState({
      edit: false,
      open: true
    });
    this.props.onUserEditData({}, this.state.edit, this.state.open);
    this.props.router.push("/addInventory");
  }

  handleAddDialog() {
    this.setState({
      deviceId: "",
      open: true,
      status_message: "",
      edit: false
    });
  }
  callAssign(id, userId) {
    this.setState({ user: userId });
    this.props.onCallAssign(id, userId).then(
      message => {
        this.setState({
          status_message: message
        });
        this.props.onFetchDevice();
      },
      error => {
        notify("Error !", error, "");
      }
    );
  }
  unapprovedList() {
    this.setState({
      openUnapprove: "true",
      unapprovedList: this.props.manageDevice.unapprovedList
    });
  }
  callUnapprovedId(id) {
    this.props.onFetchApprovedUser(id.id);
  }
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"Inventory Management"}
            showLoading={this.props.frontend.show_loading}
          />

          <div className="app-body" id="view">
            <div className="">
              <div className="col-12">
                <LoadingIcon {...this.props} />
              </div>
            </div>
            {this.state.secondArrow === "show" ? null : (
              <div className="" style={{ marginTop: "2%", marginLeft: "4%" }}>
                <div className="col-md-11 col-xs-offset-0" />
              </div>
            )}
            <div className="dker p-x">
              <div className="">
                <div className="col-sm-10 pull-sm-10">
                  <div
                    className="p-y-md clearfix nav-active-primary"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <ul
                      className="nav nav-pills nav-sm"
                      style={{ marginLeft: "4%" }}
                    >
                      <li
                        onClick={() => {
                          this.openPage("device_list");
                        }}
                        className={
                          this.state.selectedTab
                            ? "nav-item"
                            : `nav-item ${this.state.active}`
                        }
                      >
                        <a
                          className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_1"
                          aria-expanded="true"
                        >
                          Inventory Details
                        </a>
                        <div className={this.state.firstArrow}>
                          <span className="arrow bottom b-accent" />
                        </div>
                      </li>

                      <li
                        onClick={() => {
                          this.openPage("view_user");
                        }}
                        className={"nav-item"}
                      >
                        <a
                          className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_2"
                          aria-expanded="false"
                        >
                          User Inventory Details
                        </a>
                        <div className={this.state.secondArrow}>
                          <span className="arrow bottom b-accent" />
                        </div>
                      </li>
                      <li
                        onClick={() => {
                          this.openPage("view_user_new");
                        }}
                        className={`nav-item `}
                      >
                        <Link
                          to="inventoryOverviewDetail"
                          className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_3"
                          aria-expanded="false"
                        >
                          Inventory Overview
                        </Link>
                        <div className={this.state.thirdArrow}>
                          <span className="arrow bottom b-accent" />
                        </div>
                      </li>
                      <li
                        onClick={() => {
                          this.openPage("unapproved_user");
                        }}
                        className={
                          this.state.selectedTab
                            ? `nav-item ${this.state.active}`
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_4"
                          aria-expanded="true"
                        >
                          Unapproved Inventory
                        </a>
                        <div className={this.state.fourthArrow}>
                          <span className="arrow bottom b-accent" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  style={{ float: "right", marginRight: "25px",marginTop: '22px', }}
                  className="md-btn md-raised m-b-sm indigo addInventory"
                  onClick={this.addDevice}
                >
                  Add New Inventory{" "}
                </button>

                {/* <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  {this.state.firstArrow === 'show'|| this.state.fourthArrow==='show'
                    ? <FormAddNewInventory
                      deviceId={this.state.id}
                      handleClose={this.handleClose}
                      callAddNewMachine={this.callAddNewMachine}
                      handleAddDialog={this.handleAddDialog}
                      open={this.state.open}
                      edit={this.state.edit}
                      callAssign={this.callAssign}
                      callAddDevice={this.callAddDevice}
                      getByIdData={this.state.getByIdData}
                      {...this.props} />
                    : null
                  }
                </div>  */}
              </div>
            </div>
            <div className="padding">
              <div className={this.state.deviceList}>
                <InventoryList
                  openEditDevice={this.openEditDevice}
                  deleteDevices={this.deleteDevices}
                  callFetchDevice={this.callFetchDevice}
                  searchVal={this.state.search}
                  fourthArrow={this.state.fourthArrow}
                  unapproveList={this.unapprovedList}
                  callUnapprovedId={this.callUnapprovedId}
                  editAction={this.editAction}
                  deviceTypeData={val => {
                    this.setState({
                      search: val
                    });
                  }}
                  {...this.props}
                />
              </div>
              <div className={this.state.viewUser}>
                <div className="row">
                  <div className="col-md-3">
                    <UsersList
                      users={this.props.usersList.users}
                      selectedUserId={this.state.selectedUserId}
                      onUserClick={this.onUserClick}
                      callUpdateUserDeviceDetails={
                        this.callUpdateUserDeviceDetails
                      }
                      {...this.props}
                    />
                  </div>
                  <div className="col-md-9">
                    <ViewUserDevice
                      userAssignMachine={
                        this.props.manageUsers.user_assign_machine
                      }
                    />
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
    onUpdateUserDeviceDetails: newDeviceDetails => {
      return dispatch(
        actionsManageUsers.updateUserDeviceDetails(newDeviceDetails)
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
    onDeleteDevice: (id, userId) => {
      return dispatch(actionsManageDevice.deleteDevice(id, userId));
    },
    onCallAssign: (deviceId, id) => {
      return dispatch(actionsManageDevice.assignDevice(deviceId, id));
    },
    onCallDeviceType: deviceList => {
      return dispatch(actionsManageDevice.assignDeviceType(deviceList));
    },
    onCallDeviceStatus: (statusValue, colorValue) => {
      return dispatch(
        actionsManageDevice.assignDeviceStatus(statusValue, colorValue)
      );
    },
    onFetchDeviceType: () => {
      return dispatch(actionsManageDevice.getDeviceType());
    },
    onFetchDeviceStatus: () => {
      return dispatch(actionsManageDevice.getDeviceStatus());
    },
    onDeleteDeviceStatus: checkValue => {
      return dispatch(actionsManageDevice.deleteDeviceStatus(checkValue));
    },
    onFetchDeviceCount: () => {
      return dispatch(actionsManageDevice.deviceCount());
    },
    onFetchUnapprovedUser: () => {
      return dispatch(actionsManageDevice.unapprovedUser());
    },
    onFetchApprovedUser: id => {
      return dispatch(actionsManageDevice.approvedUser(id));
    },
    onUserEditData: (device, edit, open) => {
      return dispatch(actionsManageDevice.editDeviceData(device, edit, open));
    },
    onNoTab: () => {
      return dispatch(actionsManageDevice.noTab());
    }
  };
};

const VisibleInvetorySystem = connect(mapStateToProps, mapDispatchToProps)(
  InventorySystem
);

const RouterVisibleInventorySystem = withRouter(VisibleInvetorySystem);

export default RouterVisibleInventorySystem;
