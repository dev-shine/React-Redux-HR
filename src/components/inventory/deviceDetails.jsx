import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
// import "react-date-picker/index.css";
import { CONFIG } from "../../config/index";

let path = CONFIG.inventory_images;
const DeviceDetails = ({
  userAssignMachine,
  unassignDevice,
  loggedUser,
  handleAuditClick
}) => {
  let machineList = _.map(userAssignMachine, (val, i) => {
    const auditComment =
      val.audit_current_month_status.status !== false
        ? val.audit_current_month_status.status.audit_comment
        : "";
    return (
      <tr key={i}>
        <td style={{ width: "180px" }}>
          {val.id}
          <br />
          <br />
          {val.fileInventoryPhoto ? (
            <a className="thumbnail">
              <img src={path + val.fileInventoryPhoto} />
            </a>
          ) : null}
        </td>
        <td>{val.machine_type}</td>
        <td>{val.machine_name}</td>
        <td>{val.bill_number}</td>
        <td>{val.serial_number}</td>
        <td style={{ width: "100px" }}>{val.assign_date}</td>
        <td style={{ width: "255px" }}>
          {val.audit_current_month_status.status === false ? (
            <button
              className="btn btn-primary btn-responsives"
              data-toggle="modal"
              data-target="#modalAudit"
              onClick={() => handleAuditClick(val)}
              style={{ background: "red", fontSize:"13px" }}
            >
              Audit Pending
            </button>
          ) : (
            <div style={{width:"inherit"}}>
              <div style={{width:"inherit"}}>
                <p
                  title={auditComment}
                  className={auditComment.length > 100 ? "audit-comment" : ""}
                >
                  {auditComment}
                </p>
              </div>
              <div>
                Audited On -{moment(
                  val.audit_current_month_status.status.updated_at
                ).format("Do MMMM YYYY, h:mm:ss a")}
              </div>
            </div>
          )}
        </td>
        <td style={{ textAlign: "center" }}>
          {loggedUser.data.role === "Admin" ? (
            <i
              className="fa fa-lg fa fa-trash"
              onClick={() => unassignDevice(val)}
              aria-hidden="true"
              style={{
                color: "rgb(183, 28, 28)",
                textAlign: "center",
                cursor: "pointer"
              }}
            />
          ) : null}
        </td>
      </tr>
    );
  });
  if (_.isEmpty(machineList)) {
    machineList = (
      <tr>
        <td colSpan="5">
          <h5 className="text-center text-danger">{"Device Not Asssigned"}</h5>
        </td>
      </tr>
    );
  }

  return (
    <div className="row no-gutter box">
      <h6 className="text-center">Assigned Device Details</h6>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Device Type</th>
              <th>Name</th>
              <th>Excellence Bill Number</th>
              <th>Serial Number</th>
              <th>Assign Date</th>
              <th>Audit Status</th>
              {loggedUser.data.role === "Admin" ? (
                <th style={{ textAlign: "center" }}>Unassign</th>
              ) : null}
            </tr>
          </thead>
          <tbody>{machineList}</tbody>
        </table>
      </div>
    </div>
  );
};

DeviceDetails.propTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default DeviceDetails;
