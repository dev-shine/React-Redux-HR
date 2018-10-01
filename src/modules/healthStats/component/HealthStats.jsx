import React, { Component } from "react";

export default class HealthStats extends React.Component {
    render() {
        let data;
        if (this.props.attendance_rows) {
            data = this.props.attendance_rows.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.year}</td>
                        <td>{item.count}</td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <h5>
                    Database Health - Attendance Table
                </h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        )
    }
}
