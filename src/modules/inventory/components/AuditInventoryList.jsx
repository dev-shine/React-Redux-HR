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

class AuditInventoryList extends Component {
    constructor() {
        super();
        let date = new Date();
        this.state = { month: date.getMonth() + 1, year: date.getYear() + 1900 };
        this.monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        this.yearName = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    }
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.onUsersList();
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
        const optionsMonth = this.monthName.map((item, index) => {
            return (<option key={index} value={index + 1}>{item}</option>);
        })
        const optionsYear = this.yearName.map((item, index) => {
            return (<option key={index} value={index + 2011}>{item}</option>);
        })
        if (this.props.manageDevice.auditData.length !== 0) {
            rows = this.props.manageDevice.auditData.map((item, index) => {
                datas.push({
                    "Inventory Id": item.id,
                    "Inventory Name": item.machine_name,
                    "Inventory Type": item.machine_type,
                    "Comment": item.comment,
                    "Audit By Name": item.name,
                    "Audit By User Id": item.audit_done_by_user_id,
                    "Month": item.month,
                    "Year": item.year
                })
                return (
                    <tr key={index}>
                        <td style={{ width: "5%" }}>{index + 1}</td>
                        <td style={{ width: "10%" }}>{item.id}</td>
                        <td style={{ width: "15%" }}>{item.machine_type}</td>
                        <td style={{ width: "15%" }}>{item.machine_name}
                            {item.file_name &&
                                <div className="thumbnail">
                                    <img src={path + item.file_name} />
                                </div>
                            }
                        </td>
                        <td>
                            {item.comment &&
                                (<div>
                                    <div>
                                        <b><i>
                                            By: {item.name} ({item.user_Id})
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

        return (
            <div>
                <Menu {...this.props} />
                <div id="content" className="app-content box-shadow-z0" role="main">
                    <Header
                        pageTitle={"Inventories Audit"}
                        showLoading={this.props.frontend.show_loading}
                    />
                </div>
                <div className="container-fluid">
                    <div className=" col-md-10 col-md-offset-2" style={{ marginTop: "60px", backgroundColor: "white" }}>
                        <div className="row" style={{ padding: "10px 0 20px 0", position: "relative" }}>
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
                        <table key="" className="table table-responsive table-hover table-striped">
                            <thead className="success text-center">
                                <tr style={{ padding: 0 }}>
                                    <th style={{ width: "5%" }}>#</th>
                                    <th style={{ width: "10%" }}>Device Id</th>
                                    <th style={{ width: "15%" }}>Device Type</th>
                                    <th style={{ width: "15%" }}>Device Name</th>
                                    <th className="text-center">Comments</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </table>
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