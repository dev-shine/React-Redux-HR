import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, AreaSplineSeries, LineSeries, Chart, XAxis, YAxis, Title, Tooltip, Subtitle, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import DatePicker from 'material-ui/DatePicker';
import 'react-date-picker/index.css';
var moment = require('moment');
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class PageEmpHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:      '',
      start_year:  '',
      userId:      '',
      end_year:    '',
      pendingData: '',
      year:        '',
      month:       '',
      empHours:    '',
      date:        {}
    };
    // this.getByData = this.getByData.bind(this);
    // this.handleUserId = this.handleUserId.bind(this);
    // this.handleDate = this.handleDate.bind(this);
  }
  componentWillMount () {
    this.setState({
      empHours: this.props.empHours,
      date: this.props.currentDate
    });
    if(this.props.userId !== ''){
      this.props.requestEmployeeHours({
        'id':    this.props.userId,
        'date':  this.props.date,
        'month': this.props.selectedMonth,
        'year':  this.props.selectedYear
      });
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      empHours: props.empHours
    });
  }

  // handleDate (data) {
  //   this.setState({ date: data});
  //   this.getByData({ date: data, change: 'date' });
  // }
  //
  // handleUserId (data) {
  //   this.setState({ userId: data});
  //   this.getByData({ userId: data, change: 'user_id' });
  // }
  //
  // getByData (data) {
  //   let userId = this.state.userId;
  //   let date= this.state.date.toString().split(" ");
  //     if(data.change === 'date'){
  //       date=data.date.toString().split(" ");
  //     }else if (data.change === 'user_id') {
  //       userId=data.userId;
  //     }
  //     if(userId === ''){
  //       notify('Error!', 'Please Select user', 'error');
  //     }else{
  //     this.props.requestEmployeeHours({
  //       'id':    userId,
  //       'date':  date[2],
  //       'month': date[1],
  //       'year':  date[3]
  //     });
  //   }
  // }
  render () {
    let EmpTimeTable = this.state.empHours;
    var name = [];
    var date = [];
    var inTime = [];
    var outTime = [];
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
      userIdOptions.push(<option key={k} value={userList.user_Id}>  {userList.name}</option>);
    });
    if(EmpTimeTable !== null && EmpTimeTable.isSuccess){
      date.push(EmpTimeTable.data.date);
      name.push(EmpTimeTable.data.employee_name);
    let inTimeList = _.map(EmpTimeTable.data.entry_time, (hoursData, j) => {
      inTime.push({y:parseFloat(hoursData.in_time),dateData:hoursData.in_time,status:'in'});

    });
    let outTimeList = _.map(EmpTimeTable.data.exit_time, (hoursData, j) => {
      outTime.push({y:parseFloat(hoursData.out_time),dateData:hoursData.out_time,status:'out'});
    });
  }
  // const spinOutTimeOptions= {
  //     spline: {
  //         dataLabels: {
  //             enabled: true,
  //             format: 'Time: {point.dateData}'
  //         },
  //         pointStart: Date.UTC(2017, 4, 0, 9, 0, 0)
  //     }
  // };
  let inOutTime= _.concat(inTime,outTime);
  let timeData = inOutTime.sort(function compare(a, b) {
   var dateA = new Date('1970/01/01 ' + a.dateData);
   var dateB = new Date('1970/01/01 ' + b.dateData);
   return dateA - dateB;
 });
  let inTimeData = _.map(timeData, (hoursData, j) =>{
      let checkClass = 'b-success';
      if (hoursData.status === 'out') {
          checkClass = 'b-danger';
      }
      let showText = `In/Out time of ${this.state.empHours.data.employee_name}`;
      return (
        <div key={j} className={`sl-item ${checkClass}`}>
          <div className="sl-icon">
            <i className="fa fa-check"></i>
          </div>
          <div className="sl-content">
            <div>{hoursData.dateData}</div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <div className="team row p-a ">
        <div className="col-xs-12 table-responsive">
          <div className="box">
            <div className="box-header">
              <h3>{this.state.empHours.data.employee_name}</h3>
              <small>In time of {this.props.date} <sup className="sup-date" >th</sup> {this.props.selectedMonth}, {this.props.selectedYear}</small>
            </div>
            <div className="box-body">
              <div className="streamline b-l m-l">
                {inTimeData}
              </div>
            </div>
          </div>
          <div className=" col-md-2 col-sm-3 col-xs-3 pull-right">
            <RaisedButton onTouchTap={(evt) => this.props.handleClose()} primary label="close" />
          </div>
          {/* <HighchartsChart  plotOptions={spinOutTimeOptions}>
              <Chart  backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}} >{'Employee Time Table'}</Title>
              <Subtitle>{'In/Out Time Of Employee'}{name}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0}
            pointFormat={  '<span style="color:{point.color}">\u25CF</span> Hours: <b>{point.dateData}</b><br/>' }
              />
              <XAxis id="x" type="datetime" min title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
            <SplineSeries id="In-Time" name="In-Time" data={inTime}  />
            <SplineSeries id="Out-Time" name="Out-Time" data={outTime}  />
              </XAxis>
              <YAxis id='y' reversed title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
            <YAxis.Title>In and Out Time on {date}</YAxis.Title>
            <SplineSeries id="In-Time" name="In-Time" data={inTime}  />
            <SplineSeries id="Out-Time" name="Out-Time" data={outTime}  />
              </YAxis>
          </HighchartsChart> */}
        </div>
      </div>
      {/* <div className="row"> */}
        {/* <div className="container p-t">
            <div className="row">
          <DatePicker
            hintText="Landscape Dialog"
            mode="landscape"
            className="col-sm-6 p-a m-t"
            onChange={(event, date) => { this.handleDate(date); }}
            value={this.state.date}
          />
          <div className="form-group col-sm-6  p-a">
            <label htmlFor="sel1">Select User</label>
            <select className="form-control" id="user"
            onChange={(evt) => {  this.handleUserId(evt.target.value); }}>
            <option>Select User</option>
            {userIdOptions}
            </select>
          </div>
            </div>
        </div> */}
        {/*<div className="form-group col-md-3">
            <label htmlFor="sel1">Select User</label>
            <select className="form-control" id="user"
          onChange={(evt) => { this.setState({userId: evt.target.value}); }}>
          <option>Select User</option>
          {userIdOptions}
            </select>
            </div>
            <div className="form-group col-md-3">
            <label htmlFor="sel1">Select Months:</label>
            <select className="form-control" id="sel1" defaultValue={this.props.currentMonth}
          onChange={(evt) => { this.setState({month: evt.target.value}); }}>
          {monthOptions}
            </select>
            </div>
            <div className="form-group col-md-3">
            <label htmlFor="sel1">Select Year:</label>
            <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
          onChange={(evt) => { this.setState({year: evt.target.value}); }}>
          {yearOptions}
            </select>
        </div>*/}
        {/* <div className="form-group col-md-2 col-sm-3 col-xs-3">
            <button type="button" onClick={(evt) => this.getByData()} className="btn btn-primary form-group m-t-md">Get Details</button>
        </div> */}
        {/* </div> */}
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
    empHours:     state.teamStats.empHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageEmpHours));
