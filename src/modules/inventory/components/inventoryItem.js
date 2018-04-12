import React from "react";
import * as _ from "lodash";
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
let device_id;
class InventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      inventory_id: "",
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
        console.log(data);
        this.props.onFetchDevice();
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
    const userName = _.map(this.props.usersList.users, (val, i) => {
      return (
        <option key={i} value={val.username}>
          {val.username}
        </option>
      );
    });
    const history = _.map(this.props.manageDevice.deviceHistory.history, (val,i) => {
      return(
        <div key={i} className="streamline b-l m-l">
        <div className="sl-item b-info">
          <div className="sl-content">
            <div className="sl-date text-muted">
              Comment : {val.comment} 
            </div>
            <div className="sl-date text-muted">
             Updated on : {val.updated_at}
            </div>
        
            <div className="sl-date text-muted">
              By : {val.updated_by_user}
            </div>
          </div>
        </div>
        </div>
      );
    })
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"Inventory Management"} />
          <div className="app-body" id="view">
            <div className="col-12">
              <div className="app-body" id="view">
                <div className="col-xs-12 col-sm-12">
                  <div className="col-md-5 p-r">
                    <div
                      className="form-group"
                      style={{ marginLeft: "8%", marginTop: "4%" }}
                    >
                      <label style={{ fontSize: 15 }}>Device Name:</label>{" "}
                      {_.isEmpty(machineName)
                        ? null
                        : machineName[0].machine_name}
                      <br />
                      <label style={{ fontSize: 15 }}>Users:</label>
                      <select
                        onChange={e => this.setState({ user: e.target.value })}
                        className="form-control"
                        ref="device_type"
                        value={this.state.user}
                      >
                        <option value="">--Select User--</option>
                        {userName}
                      </select>
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
                         
                         {history}
                         
                          
                        </div>
                      </div>
                    </div>
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
    usersList: state.usersList.toJS(),
    loggedUser: state.logged_user.userLogin,
    manageDevice: state.manageDevice.toJS()
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
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onGetDevice: () => {
      return dispatch(actionsManageDevice.getDeviceById(device_id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryItem)
);
