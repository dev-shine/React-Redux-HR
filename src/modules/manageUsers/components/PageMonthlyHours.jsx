import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, Chart, XAxis, Tooltip, YAxis, Title, Subtitle, Legend, ColumnSeries, LineSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
var moment = require('moment');

class PageMonthlyHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:       '',
      start_year:   '',
      end_year:     '',
      userId:       '',
      pendingData:  '',
      year:         '',
      month:        '',
      monthlyHours: ''
    };
    this.getByData = this.getByData.bind(this);
  }
  componentsWillMount () {
    this.setState({
      monthlyHours: this.props.monthlyHours
    });
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    this.setState({
      monthlyHours: this.props.monthlyHours.data
    });
  }

  getByData (evt) {
    const userId = localStorage.getItem('userid');
    let year = this.state.year !== '' ? this.state.year : this.props.currentYear;
    let month = this.state.month !== '' ? this.state.month : this.props.currentMonth;
    this.props.requestEmployeeMonthlyHours({
      'id':    this.state.userId,
      'month': month,
      'year':  year
    });
  }
  render () {
    let EmpMonthltHours = this.state.monthlyHours;
    var noOfDays = [];
    var activeHour = [];
    var totalHour = [];
    let monthOptions = [];
    let yearOptions = [];
    let userIdOptions = [];
    let monthOption = _.map(this.props.months, (monthData, i) => {
      monthOptions.push(<option key={i} value={monthData}>{monthData}</option>);
    });
    let yearOption = _.map(this.props.year, (data, i) => {
      return (
      yearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    let userIdOption = _.map(this.props.employeeList.data, (userList, k) => {
      userIdOptions.push(<option key={k} value={userList.id}>{userList.id}  {userList.name}</option>);
    });
    if (EmpMonthltHours[0] !== null && EmpMonthltHours[0] !== undefined) {
      let timeList = _.map(EmpMonthltHours[0].day_wise_detail, (Data, j) => {
        noOfDays.push(Data.day);
        activeHour.push(Data.active_hours.hours);
        totalHour.push(Data.total_hours.hours);
        return (
        <div></div>
        );
      });
    }
    return (
      <div>
        <div>
          <div className="team row">
            <HighchartsChart >
              <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}} >{'Employee Monthly Hours'}</Title>
              <Subtitle>{'Monthly Active Hour of Employee'}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0} />
              <XAxis id="x" categories={noOfDays} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
                <XAxis.Title>Month Days</XAxis.Title>
              </XAxis>
              <YAxis id='activeHour' minorTickInterval={'auto'} title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
                <YAxis.Title>No. of Hours</YAxis.Title>
                <LineSeries id='emp' name={'Active Hours'} key={'activeHour'} data={activeHour} />
                <LineSeries id='emp2' name={'Total Hours'} key={'totalHour'} data={totalHour} />
              </YAxis>
            </HighchartsChart>
          </div>
        </div>
        <div className="col-md-12 row">
          <div className="form-group col-md-4">
            <label htmlFor="sel1">Select User</label>
            <select className="form-control" id="user"
              onChange={(evt) => { this.setState({userId: evt.target.value}); }}>
              <option>Select User</option>
              {userIdOptions}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sel1">Select Months:</label>
              <select className="form-control" id="sel1" defaultValue={this.props.currentMonth}
                onChange={(evt) => { this.setState({month: evt.target.value}); }}>
                {monthOptions}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sel1">Select Year:</label>
              <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
                onChange={(evt) => { this.setState({year: evt.target.value}); }}>
                {yearOptions}
              </select>
            </div>
            <div className="form-group col-md-4">
              <button type="button" style={{marginTop: '6%'}} onClick={(evt) => this.getByData()} className="btn btn-primary form-group">Get Details</button>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:     state.frontend.toJS(),
    loggedUser:   state.logged_user.userLogin,
    usersList:    state.usersList.toJS(),
    teamStats:    state.teamStats,
    empLifeCycle: state.teamStats.empLifeCycle,
    empHours:     state.teamStats.empHours,
    monthlyHours: state.teamStats.monthlyHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageMonthlyHours));
