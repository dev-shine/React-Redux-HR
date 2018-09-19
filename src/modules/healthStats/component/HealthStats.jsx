import React, { Component } from "react";

export default class HealthStats extends React.Component {
    render() {
        let data;
        if (this.props.attendance_rows) {
            data = Object.keys(this.props.attendance_rows).map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item}</td>
                        <td>{this.props.attendance_rows[`${item}`]}</td>
                    </tr>
                );
            });
        }
        return (
            <div className="row" style={{margin: "0px"}}>
                <div className="col-sm-4" style={{backgroundColor: "white"}}>
                        <h5 style={{ padding: "10px" }}>Database Health - Attendance Table</h5>
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
                    </div>
        )
    }
}
