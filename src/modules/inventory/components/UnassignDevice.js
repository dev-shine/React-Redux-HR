import React from "react";
import "react-date-picker/index.css";
import Dialog from "material-ui/Dialog";
import { DateField } from "react-date-picker";
import PropTypes from "prop-types";
import { notify } from "../../../services/notify";
import TextField from "material-ui/TextField";
import * as actions from "../../../redux/actions";
import * as actionsManageDevice from "../../../redux/inventory/actions/inventory";
import AlertNotification from "../../../components/generic/AlertNotification";

export default class UnassignDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      inventory_id: ""
    };
    this.baseState = this.state;
    this.handleAddUserComment = this.handleAddUserComment.bind(this);
  }

  handleAddUserComment() {

    let { inventory_id, comment } = this.state;
    this.props.callAddUserComment({ inventory_id, comment });
    this.setState({
      comment: ''
    });
  }
  handleChange = e => {
    this.setState({
      comment: e.target.value,
      inventory_id: this.props.device.id
    });
  };

  resetForm = () => {
    this.setState(this.baseState);
  };

  render() {

    return (
      <div>
        <Dialog
          title="Unassign Device"
          titleStyle={{ opacity: "0.56" }}
          modal={false}
          open={this.props.open}
          onRequestClose={()=>{this.props.handleClose();
          this.resetForm()}}
          contentStyle={{ width: "70%", maxWidth: "none" }}
          autoScrollBodyContent
        >
          <div className="col-md-12">
            <div className="row -py-sm">
              <div className="col-sm-3">
                <p style={{ opacity: "0.56" }}>Device Name:</p>
              </div>

              <div className="col-sm-2">
                <p>{this.props.device.machine_name}</p>
              </div>

              <div className="col-sm-3">
                <p style={{ opacity: "0.56" }}>Device Type:</p>
              </div>

              <div className="col-sm-4">
                <p>{this.props.device.machine_type}</p>
              </div>
            </div>

            <div className="row p-y-sm">
              <div className="col-sm-3">
                <p style={{ opacity: "0.56" }}>Assign Date:</p>
              </div>

              <div className="col-sm-2">
                <p>{this.props.device.assign_date}</p>
              </div>

              <div className="col-sm-3">
                <p style={{ opacity: "0.56" }}>Serial Number:</p>
              </div>

              <div className="col-sm-4">
                <p>{this.props.device.serial_number}</p>
              </div>
            </div>

            <div className="row p-y-sm">
              <div className="col-md-12" style={{ opacity: "0.56" }}>
                {"Comment:"}
                <textarea
                  value={this.state.comment}
                  style={{ width: "100%" }}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <button
              className="col-md-12 md-btn md-raised m-b-sm indigo"
              onClick={() => {
                this.handleAddUserComment();
                this.resetForm();
              }}
              style={{ opacity: "0.76", marginTop: "2%" }}
            >
              Unassign Device
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
}

UnassignDevice.PropTypes = {
  displayData: PropTypes.shape({
    roles: PropTypes.Array
  }).isRequired,
  callAddUserComment: PropTypes.func.isRequired
};
