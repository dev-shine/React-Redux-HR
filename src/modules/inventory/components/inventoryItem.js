import React from "react";
import * as _ from "lodash";
import moment from "moment";
import { CONFIG } from "src/config/index";
import { connect } from "react-redux";
import Menu from "components/generic/Menu";
import { notify } from "src/services/notify";
import Header from "components/generic/Header";
import { withRouter } from "react-router";
import * as actions from "appRedux/actions";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import * as actionsManageUsers from "appRedux/manageUsers/actions/manageUsers";
import ButtonRaised from "components/generic/buttons/ButtonRaised";
import DialogUpload from "./dialogueUpload";
let device_id;
class InventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      inventory_id: "",
      user_id: ""
    };
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentWillMount() {
    device_id = this.props.routeParams.id;
    this.props.onUsersList();
    this.props.onGetDevice(device_id);
    this.props.onIsAlreadyLogin();
    this.props.onFetchDevice();
  }

  handleAddComment(add_inventory_comment) {
    this.props.onAddInventoryComment(add_inventory_comment).then(
      data => {
        notify("Success!", data, "success");
        this.props.onFetchDevice();
        this.props.onGetDevice(device_id);
        this.setState({ comment: "" });
      },
      error => {
        notify("Error!", error, "error");
      }
    );
  }
  AssignDevice(assign_device) {
    this.props.onAssignDevice(assign_device).then(
      data => {
        notify("Success!", data, "success");
        this.props.onGetDevice(device_id);
      },
      error => {
        notify("Error!", error, "error");
      }
    );
  }

  render() {
    const machineName = _.filter(this.props.manageDevice.device, {
      id: this.props.routeParams.id
    });
    const pat = _.isEmpty(machineName)
      ? null
      : machineName[0].fileInventoryPhoto;
    const userName = _.map(this.props.usersList.users, (val, i) => {
      return (
        <option key={i} value={val.user_Id}>
          {val.username}
        </option>
      );
    });
    const Assignhistory = _.map(
      this.props.manageDevice.deviceHistory.history,
      (val, i) => {
        return (
          <div key={i} className="streamline b-l m-l">
            <div className="sl-item b-info">
              <div className="sl-content">
                <div className="sl-date text-muted">
                  Assigned to : {val.assign_unassign_user_name}
                </div>
                <div className="sl-date text-muted">
                  By : {val.updated_by_user}
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
    const history = _.map(
      this.props.manageDevice.deviceHistory.history,
      (val, i) => {
        return (
          <div key={i} className="streamline b-l m-l">
            <div className="sl-item b-info">
              <div className="sl-content">
                <div className="sl-date text-muted">
                  Comment : {val.comment}
                </div>
                <div className="sl-date text-muted">
                  Updated on :{" "}
                  {moment(val.updated_at).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                </div>

                <div className="sl-date text-muted">
                  By : {val.updated_by_user}
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
    let path = CONFIG.inventory_images;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"Inventory Management"} />
          <div className="app-body" id="view">
            <div className="col-12">
              <div className="app-body" id="view">
                <div className="col-xs-12 col-sm-12">
                  <div className="col-md-6 p-r">
                    <div
                      className="form-group"
                      style={{
                        marginLeft: "8%",
                        marginTop: "4%",
                        textAlign: "left"
                      }}
                    >
                      <div className="row">
                        {" "}
                        {pat === null || undefined ? null : (
                          <div className="col-md-12">
                            <img src={path + pat} />
                          </div>
                        )}
                        <br />
                        <div className="col-md-12">
                          <label style={{ fontSize: 15 }}>Device Name:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].machine_name}
                        </div>
                        <div className="col-md-12">
                          <label style={{ fontSize: 15 }}>Serial No:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].serial_number}
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>Device Type:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].machine_type}
                        </div>
                        <br />
                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>Status:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].status}
                        </div>

                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>
                            Approval Status:
                          </label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].approval_status === 0
                              ? "Not Approved"
                              : "Approved"}
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>
                            Date of Purchase:
                          </label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].date_of_purchase}
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>Assigned To:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : machineName[0].name
                              ? machineName[0].name
                              : "Not Assigned To Anyone"}
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: 15 }}>Price:</label>{" "}
                          {_.isEmpty(machineName)
                            ? null
                            : `₹ ${machineName[0].machine_price}`}
                        </div>
                      </div>
                      <br />
                      <label style={{ fontSize: 15 }}>Users:</label>
                      <select
                        onChange={e =>
                          this.setState({
                            user_id: e.target.value,
                            inventory_id: this.props.routeParams.id
                          })
                        }
                        className="form-control"
                        ref="device_type"
                        value={this.state.user}
                      >
                        <option value="">--Select User--</option>
                        {userName}
                      </select>
                      <br />{" "}
                      <button
                        className="btn btn-fw info responsive-p-x-sm"
                        onClick={() => this.AssignDevice(this.state)}
                      >
                        Assign Inventory
                      </button>
                      <div className="row m-1">
                        <div
                          className="col-sm-15 p-8 pt-8"
                          style={{ marginTop: "4%" }}
                        >
                          <label style={{ fontSize: 15 }}>Comment:</label>
                          <textarea
                            placeholder="Your comment"
                            className="form-control resize-y"
                            onChange={e =>
                              this.setState({
                                comment: e.target.value,
                                inventory_id: this.props.routeParams.id
                              })
                            }
                            value={this.state.comment}
                          />
                        </div>
                      </div>
                      <br />
                      <button
                        className="btn btn-fw info responsive-p-x-sm"
                        onClick={() => this.handleAddComment(this.state)}
                      >
                        Submit
                      </button>
                      <div className="row m-2">
                        <div
                          className="col-sm-15 p-8 pt-8"
                          style={{ marginTop: "4%" }}
                        >
                          {" "}
                          {Assignhistory}
                          {history}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-5 p-r col-sm-offset-1" style={{marginTop:'17px'}}>{<DialogUpload inventory_id={this.props.routeParams.id} {...this.props}/>}</div> */}
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
    usersList: state.usersList.toJS(),
    loggedUser: state.logged_user.userLogin,
    manageDevice: state.manageDevice.toJS(),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddInventoryComment: add_inventory_comment => {
      return dispatch(
        actionsManageDevice.addInventoryComment(add_inventory_comment)
      );
    },
    onFetchDevice: () => {
      return dispatch(actionsManageDevice.get_machines_detail());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    },
    onMyProfileDetails: () => {
      return dispatch(actionsMyProfile.getMyProfileDetails());
    },
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onGetDevice: () => {
      return dispatch(actionsManageDevice.getDeviceById(device_id));
    },
    onAssignDevice: assign_device => {
      return dispatch(actionsManageDevice.assignDevice(assign_device));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryItem)
);
