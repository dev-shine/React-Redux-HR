import React, { Component } from "react";
import { confirm } from "src/services/notify";

export default class HealthStats extends React.Component {
  render() {
    let data;
    if (this.props.healthData.attendance_rows) {
      data = this.props.healthData.attendance_rows.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.year}</td>
            <td>{item.count}</td>
            <td>
              <button
                className="md-btn md-raised m-b-sm danger"
                onClick={e => {
                  confirm(
                    "Are you sure ?",
                    "Do you want to delete this record ?",
                    "warning"
                  ).then(res => {
                    if (res) {
                      this.props.deleteHealthStats(item.year);
                    }
                  });
                }}
                aria-hidden="true"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className="row" style={{ margin: "0px" }}>
        <div className="col-sm-4" style={{ backgroundColor: "white" }}>
          <h5 style={{ padding: "10px" }}>
            Database Health - Attendance Table
          </h5>
          <table className="table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
