import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import CircularProgress from "material-ui/CircularProgress";
import * as actions from 'src/redux/actions';
import 'react-date-picker/index.css';
var moment = require('moment');
class EmployeeLeastActiveHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            month: '',
            userId: '',
            monthlyAllUsersReport: '',
            loading: false
        }
        this.handleMonth = this.handleMonth.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.setByData = this.setByData.bind(this);
    }
    componentWillMount() {
        this.setState({
            year: this.props.currentYear,
            month: this.props.currentMonth,
            monthlyAllUsersReport: this.props.monthlyAllUsersReport
        });
    }
    componentWillReceiveProps(props) {
        if (props.monthlyAllUsersReport.isLoading) {
            this.setState({
                loading: true,
            })
        } else if (props.monthlyAllUsersReport.isSuccess || props.monthlyAllUsersReport.isError) {
            this.setState({
                loading: false,
            })
        }
        this.setState({
            monthlyAllUsersReport: props.monthlyAllUsersReport,
        });
    }
    handleMonth(data) {
        this.setState({ month: data, loading: true });
        this.setByData({ month: data, change: 'month' });
    }
    handleYear(data) {
        this.setState({ year: data, loading: true });
        this.setByData({ year: data, change: 'year' });
    }
    setByData(data) {
        const userId = localStorage.getItem('userid');
        let year = this.state.year !== '' ? this.state.year : this.props.currentYear;
        let month = this.state.month !== '' ? this.state.month : this.props.currentMonth;
        if (data.change === 'month') {
            month = data.month;
        } else if (data.change === 'year') {
            year = data.year;
        }
        this.props.getByData({
            'month': month,
            'year': year
        });
    }
    renderTotalHours(userData) {
        const computedTime = {
            time: '',
            count: ''
        };
        let count = 0;
        computedTime.time = _.sumBy(userData, function (entryTimings) {
            if (parseInt(entryTimings.active_hours.total_time) > 0) {
                computedTime.count = count++;
            }
            return parseFloat(entryTimings.active_hours.total_time)
        });
        return computedTime;
    }
    render() {
        let user = [];
        let leastaActiveList;
        _.map(this.props.monthlyAllUsersReport.data, (userData, k) => {
            let activeHoursTotalTime = (this.renderTotalHours(userData.data)).time;
            let activeHoursTotalCount = (this.renderTotalHours(userData.data)).count;
            let activeHoursTotalAverage = activeHoursTotalCount > 0 ? _.round((activeHoursTotalTime / activeHoursTotalCount), 1) : 0;
            let totalHoursTotalTime = _.sumBy(userData.data, function (entryTimings) { return parseFloat(entryTimings.total_hours.total_time) });
            let totalHoursTotalAverage = activeHoursTotalCount > 0 ? _.round((totalHoursTotalTime / activeHoursTotalCount), 1) : 0;
            user[k] = {
                name: userData.name,
                id: userData.user_id,
                activeHoursTotalTime,
                activeHoursTotalCount,
                activeHoursTotalAverage,
                totalHoursTotalTime,
                totalHoursTotalAverage
            };
            let orderedActiveHoursTotalAverage = _.orderBy(user, ['activeHoursTotalAverage'], ['asc']);
            let filteredActiveHours = _.filter(orderedActiveHoursTotalAverage, function (o) { return o.activeHoursTotalAverage != 0; });
            let finalActiveHours = _.slice(filteredActiveHours, [0], [10])

            leastaActiveList = _.map(finalActiveHours, (val, i) => {
                return (
                    <tr key={i}>
                        <td>{val.name}</td>
                        <td>{val.activeHoursTotalAverage}</td>
                        <td>{val.totalHoursTotalAverage}</td>
                    </tr>
                )
            });

        });
        let MonthlyAllUsersReport = this.state.monthlyAllUsersReport;
        var noOfDays = [];
        var noOfActiveHours = [];
        var noOfTotalHours = [];
        let monthOptions = [];
        let yearOptions = [];
        let monthOption = _.map(this.props.months, (monthData, i) => {
            monthOptions.push(<option key={i} value={monthData}>{monthData}</option>);
        });
        let yearOption = _.map(this.props.year, (data, i) => {
            return (
                yearOptions.push(<option key={i} value={data}>{data}</option>)
            );
        });
        return (
            <div className="col-xs-12 employee-life-cycle">
                <div className="text-center emp-life-cycle">
                    <div className="row no-gutter box">
                        <h4 style={{ fontSize: "16px", fontWeight: 'bold' }}>LEAST ACTIVE EMPLOYEES</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead style={{ textAlign: "center" }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Employee Name</th>
                                        <th style={{ textAlign: "center" }}>Average Active Hours</th>
                                        <th style={{ textAlign: "center" }}>Average Total Hours</th>
                                    </tr>
                                </thead>
                                {this.state.loading ?
                                    <tbody>
                                        <tr>
                                            <td />
                                            <CircularProgress
                                                size={30}
                                                thickness={3}
                                                style={{ marginTop: "20px" }}
                                            />
                                            <td />
                                        </tr>
                                    </tbody>
                                    : this.props.monthlyAllUsersReport.data.length === undefined ?
                                        <tbody>
                                            <tr>
                                                <td />
                                                No Data Found this month
                                            <td />
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody>
                                            {leastaActiveList}
                                        </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
                <div className="collapse">

                </div>
                <div className="container p-t ">
                    <div className="row">
                        <div className="form-group col-xs-6 profile-input p-a">
                            <label htmlFor="sel1">Select Month:</label>
                            <select className="form-control" id="sel1" defaultValue={this.props.currentMonth}
                                onChange={(evt) => { this.handleMonth(evt.target.value); }}>
                                {monthOptions}
                            </select>
                        </div>
                        <div className="form-group col-xs-6 profile-input p-a">
                            <label htmlFor="sel1">Select Year:</label>
                            <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
                                onChange={(evt) => { this.handleYear(evt.target.value); }}>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeLeastActiveHours;