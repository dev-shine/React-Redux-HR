import React from "react";
import "react-date-picker/index.css";
import Dialog from "material-ui/Dialog";
import { DateField } from "react-date-picker";
import { notify } from "src/services/notify";
import * as actions from "src/redux/actions";
import * as actionsManageDevice from "src/redux/inventory/actions/inventory";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import * as _ from "lodash";
import AlertNotification from "src/components/generic/AlertNotification";

export default class AssignDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
  }

  handleOpen(e) {
    e.stopPropagation();
    this.props.handleAddDialog();
  }
  handleAssign(inventory_id,user_id){
  this.props.callAssignDevice( {inventory_id, user_id} );
  }

  render() {
    
    
    const unassignInventory = _.map(
      this.props.unassignDeviceList,
      (val, i) => {
        return (
          <tr key={i}  style={{background: 'green',padding:'20px', borderBottom: '2px solid white'}}>
                        <td style={{marginRight: '0%', width: '5%',cursor:'pointer'}}>{i+1}</td>
                        <td  style={{marginRight: '0%', width: '5%',cursor:'pointer'}}>{val.machine_type}</td>
                        <td  style={{marginRight: '0%', width: '5%',cursor:'pointer'}}>{val.machine_name}</td>
                        <td  style={{marginRight: '0%', width: '5%',cursor:'pointer'}}>MAC Address : {val.mac_address}<br/>Date of purchase : {val.date_of_purchase}</td>
                        <td  style={{marginRight: '0%', width: '5%',cursor:'pointer'}}>{val.status}</td>
                        <td><button
                        onClick={()=>this.handleAssign(val.id , this.props.user_id)}
              className="col-md-14 md-btn md-raised m-b-sm indigo"
              style={{ opacity: "0.76", marginTop: "2%"  }}
            >
              Assign Device
            </button></td>
                      </tr>
        );
      }
    );




    return (
      <div className="p-y">
      {this.props.loggedUser.data.role ==='Admin'?  <button
          className="md-btn md-raised m-b-sm indigo"
          onTouchTap={this.handleOpen}
        >
          Assign Device
        </button>:null}
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
                          <th>Assign</th>
                        </tr>
                      </thead>
                      <tbody>
                      {unassignInventory}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
              className="col-md-12 md-btn md-raised m-b-sm indigo"
              style={{ opacity: "0.76", marginTop: "2%" }}
            >
              Assign Device
            </button> */}
          </div>
        </Dialog>
      </div>
    );
  }
}


AssignDevice.PropTypes = {
  displayData: PropTypes.shape({
    roles: PropTypes.Array
  }).isRequired,
  callAssignDevice: PropTypes.func.isRequired
};
