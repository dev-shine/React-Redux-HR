import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import CircularProgress from "material-ui/CircularProgress";
import * as actions from '../../../redux/actions';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class NewEmployeeLeastActiveHours extends Component {
    render() {
        let leastaActiveList;        
        leastaActiveList = _.map(this.props.empActiveHoursList.data, (val,i) => {
            return(
                <tr key={i}>
                    <td>{val.name}</td>
                        <td>{val.average_inside_hours}  <span>({val.totalPresentDays} day present)</span>
                    </td>
                </tr>
            )
        })
        return (
            <div className="col-xs-12 employee-life-cycle">
                <div className="text-center emp-life-cycle">
                    <div className="row no-gutter box">
                        <h4 style={{ fontSize: "16px", fontWeight: 'bold' }}>LEAST ACTIVE EMPLOYEES</h4>
                        <div className="row ">
                            <div className="col-sm-6">
                                <h4 style={{ fontSize: "16px", fontWeight: 'bold', display: "inline-block", marginRight: "20px" }}>Select Start Date</h4>
                                <div style={{ display: "inline-block" }}>
                                    <DatePicker
                                        placeholderText="Select a Start date"
                                        selected={this.props.startDate}
                                        onChange={(date) => { this.props.handleStartDate(date) }}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <h4 style={{ fontSize: "16px", fontWeight: 'bold', display: "inline-block",marginRight:"20px" }}>Select End Date</h4>
                                <div style={{ display: "inline-block" }}>
                                    <DatePicker
                                        placeholderText="Select a End date"
                                        selected={this.props.endDate}
                                        onChange={(date) => { this.props.handleEndDate(date) }}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <div className="container-fluid">
                            </div>  
                            <table className="table table-striped table-hover">
                                <thead style={{ textAlign: "center" }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Employee Name</th>
                                        <th style={{ textAlign: "center" }}>Average Inside Hours</th>
                                    </tr>
                                </thead>
                                {this.props.empActiveHoursList.isLoading ?
                                    <tbody>
                                        <tr>
                                            <td colSpan="2" >
                                                <CircularProgress
                                                    size={30}
                                                    thickness={3}
                                                    style={{ marginTop: "20px" }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    : this.props.empActiveHoursList.data.length == 0 ?
                                        <tr>
                                            <td colSpan="2" >No Data Found </td>
                                        </tr>
                                        :
                                       <tbody>
                                            {leastaActiveList}
                                        </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewEmployeeLeastActiveHours;