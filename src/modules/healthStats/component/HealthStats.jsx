import React, { Component } from "react";
import { confirm } from "../../../services/notify";

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
              <i
                className="material-icons"
                title="Delete"
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
                delete
              </i>
            </td>
          </tr>
        );
      });
    }
    return (
      <div>
          <h5>
            DB Health - Attendance Table
          </h5>
          <table className="table attendance-stats">
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
    );
  }
}
