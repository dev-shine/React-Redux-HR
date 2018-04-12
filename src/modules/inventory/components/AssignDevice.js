import React from "react";
import "react-date-picker/index.css";
import Dialog from "material-ui/Dialog";
import { DateField } from "react-date-picker";
import { notify } from "src/services/notify";
import TextField from "material-ui/TextField";
import * as _ from "lodash";
import AlertNotification from "components/generic/AlertNotification";

export default class AssignDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(e) {
    e.stopPropagation();
    this.props.handleAddDialog();
  }

  render() {
    return (
      <div className="p-y">
        <button
          className="md-btn md-raised m-b-sm indigo"
          onTouchTap={this.handleOpen}
        >
          Assign Device
        </button>
        <Dialog
          title="Assign Device"
          titleStyle={{ opacity: "0.56" }}
          modal={false}
          open={this.props.openAssign}
          onRequestClose={this.props.handleCloseAssign}
          contentStyle={{ width: "70%", maxWidth: "none" }}
          autoScrollBodyContent
        >
          <div className="col-md-12">
            <div className="row -py-sm">
              <div className="col-12">
                <label style={{ fontSize: "15px" }}>Search Device:</label>
                <input type="text" id="search-form" className="form-control" />
                <div className="box p-y">
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
                        </tr>
                      </thead>
                      <tbody />
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="col-md-12 md-btn md-raised m-b-sm indigo"
              style={{ opacity: "0.76", marginTop: "2%" }}
            >
              Assign Device
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
}
