import React, { Component } from "react";
import Menu from "components/generic/Menu";
import Header from "components/generic/Header";
import { connect } from "react-redux";
import * as actions from "appRedux/actions";
import { CONFIG } from "config";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import * as actionsManageUsers from "appRedux/manageUsers/actions/manageUsers";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";
import { getToken } from 'src/services/generic';
import { CSVLink } from "react-csv/lib";
import moment from 'moment';
import { dateFormatter } from "src/helper/helper";
import { Link } from "react-router";

class AuditInventoryList extends Component {
    constructor() {
        super();
        let date = new Date();
        this.state = { month: date.getMonth() + 1, year: date.getYear() + 1900 };
        this.Year = [];
    }
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.onUsersList();
        for (let i = 0; i < 5; i++) {
            this.Year.push(parseInt(this.state.year) + i - 1);
        }
        this.props.auditList(getToken(), this.state.month, this.state.year);
    }
    onMonthChange = (e) => {
        this.setState({ month: e.target.value });
        this.props.auditList(getToken(), e.target.value, this.state.year);
    }
    onYearChange = (e) => {
        this.setState({ year: e.target.value });
        this.props.auditList(getToken(), this.state.month, e.target.value);
    }
    render() {
        let rows = null;
        let datas = [];
        const path = CONFIG.inventory_images;
        const optionsMonth = dateFormatter().months.map((item, index) => {
            return (<option key={index} value={index + 1}>{item}</option>);
        })
        const optionsYear = this.Year.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        if (Object.keys(this.props.manageDevice.auditData).length !== 0) {
            rows = this.props.manageDevice.auditData.audit_list.map((item, index) => {
                datas.push({
                    "Inventory Id": item.id,
                    "Inventory Name": item.machine_name,
                    "Inventory Type": item.machine_type,
                    "Assigned To": item.assigned_name,
                    "Assigned Id": item.assigned_user_id,
                    "Comment": item.comment,
                    "Audit By Name": item.audit_done_by,
                    "Audit By User Id": item.audit_done_by_user_id,
                    "Month": item.month,
                    "Year": item.year
                })
                return (
                    <tr key={index}>
                        <td style={{ width: "5%" }}>{index + 1}</td>
                        <td style={{ width: "10%" }}>{item.id}</td>
                        <td style={{ width: "15%" }}>{item.machine_type}</td>
                        <td style={{ width: "7%" }}>
                            <Link to={`/inventory_system/${item.machine_type}/${item.id}`}>
                                {item.machine_name}
                            </Link>
                            {item.file_name &&
                                <div className="thumbnail">
                                    <img src={path + item.file_name} />
                                </div>
                            }
                        </td>
                        <td style={{ width: "10%" }}>{item.assigned_to &&
                            (<div>
                                {item.assigned_to} ({item.assigned_user_id})
                            </div>)}
                        </td>
                        <td>
                            {item.comment &&
                                (<div>
                                    <div>
                                        <b><i>
                                            By: {item.audit_done_by} ({item.audit_done_by_user_id})
                                    </i></b>
                                    </div>
                                    {item.comment}
                                </div>
                                )}
                        </td>
                    </tr>
                );

            });
        }
        console.log(this.props);
        return (
            <div>
                <Menu {...this.props} />
                <div id="content" className="app-content box-shadow-z0" role="main">
                    <Header
                        pageTitle={"Inventories Audit"}
                        showLoading={this.props.frontend.show_loading}
                    />
                    <div className="app-body" id="view">
                        <div className="padding">
                            <div style={{ overflow: "auto", backgroundColor: "white" }}>
                                <div className="col-sm-2 col-xs-12" style={{ paddingTop: "10px" }}>
                                    <h4>Audit Summary</h4>
                                </div>
                                <div className="col-sm-10">
                                    <div className="row no-gutter" /* style={{ display: "flex", flex: "wrap" }} */>
                                        <div className="col-xs-12 col-sm-3 day-color-referance white" style={{ padding: "5px" }}>
                                            <h4>{Object.keys(this.props.manageDevice.auditData).length !== 0 && this.props.manageDevice.auditData.stats.total_inventories}</h4>
                                            <div className="text-u-c text-sm" style={{ fontSize: "11px" }}>Total Inventory</div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 day-color-referance red" style={{ padding: "5px" }}>
                                            <h4>{Object.keys(this.props.manageDevice.auditData).length !== 0 && this.props.manageDevice.auditData.stats.audit_pending}</h4>
                                            <div className="text-u-c text-sm" style={{ fontSize: "11px" }}> Pending Audit</div>

                                        </div>

                                        <div className="col-xs-12 col-sm-3 day-color-referance green" style={{ padding: "5px" }}>
                                            <h4>{Object.keys(this.props.manageDevice.auditData).length !== 0 && this.props.manageDevice.auditData.stats.audit_done}</h4>
                                            <div className="text-u-c text-sm" style={{ fontSize: "11px" }}>Done Audit</div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 day-color-referance indigo" style={{ padding: "5px" }}>
                                            <h4>{Object.keys(this.props.manageDevice.auditData).length !== 0 && this.props.manageDevice.auditData.stats.unassigned_inventories}</h4>
                                            <div className="text-u-c text-sm" style={{ fontSize: "11px" }}>Unassigned Inventory</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: "20px", backgroundColor: "white" }}>
                                <div className="row" style={{ padding: "10px 10px 20px 10px", position: "relative" }}>
                                    <div className="col-md-2">
                                        <select className="form-control" onChange={this.onYearChange} value={this.state.year}>
                                            {optionsYear}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-control" onChange={this.onMonthChange} value={this.state.month}>
                                            {optionsMonth}
                                        </select>
                                    </div>
                                    <CSVLink
                                        style={{ position: 'absolute', right: '2%', bottom: '4px', color: '#337ab7', textDecoration: 'underline' }}
                                        data={datas}
                                        filename={`audit-${moment().format("MMM-YYYY-DD-MMM-YYYY")}.csv`}
                                    >   Download Report
                                    </CSVLink>
                                </div>
                                <div style={{overflow: "auto", overflowY: "hidden"}}>

                                <table key="" className="table table-responsive table-hover table-striped">
                                    <thead className="success text-center">
                                        <tr style={{ padding: 0 }}>
                                            <th style={{ width: "5%" }}>#</th>
                                            <th style={{ width: "10%" }}>Device Id</th>
                                            <th style={{ width: "15%" }}>Device Type</th>
                                            <th style={{ width: "7%" }}>Device Name</th>
                                            <th style={{ width: "10%" }}>Assigned To</th>
                                            <th className="text-center">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>{rows}</tbody>
                                </table>
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
        frontend: state.frontend.toJS(),
        usersList: state.usersList.toJS(),
        manageUsers: state.manageUsers.toJS(),
        loggedUser: state.logged_user.userLogin,
        manageDevice: state.manageDevice.toJS()
    };
}

const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
    onUsersList: () => dispatch(actionsUsersList.get_users_list()),
    onUserProfileDetails: (userid, username) => dispatch(
        actionsManageUsers.getUserProfileDetails(userid, username)),
    auditList: (token, month, year) => dispatch(actionsManageDevice.getAuditList(token, month, year))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditInventoryList);