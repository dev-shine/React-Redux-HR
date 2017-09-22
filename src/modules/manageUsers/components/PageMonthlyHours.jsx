import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, Chart, XAxis, Tooltip, YAxis, Title, Subtitle, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
var moment = require('moment');

class PageMonthlyHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:       '',
      start_year:   '',
      end_year:     '',
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
    this.props.requestEmployeeMonthlyHours({
      'id':    userId,
      'month': this.state.month,
      'year':  this.state.year
    });
  }
  render () {
    let EmpMonthltHours = this.state.monthlyHours;
    var noOfDays = [];
    var activeHour = [];
    var totalHour = [];
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
              <Chart />
              <Title>{'Employee Monthly Hours'}</Title>
              <Subtitle>{'Monthly Active Hour of Employee'}</Subtitle>
              <Legend />
              <Tooltip />
              <XAxis id="x" categories={noOfDays}>
                <XAxis.Title>Month Days</XAxis.Title>
              </XAxis>
              <YAxis id='activeHour'>
                <YAxis.Title>Hours</YAxis.Title>
                <ColumnSeries id='emp' name="Active Hours" data={activeHour} />
                <ColumnSeries id='emp2' name="Total Hours" data={totalHour} />
              </YAxis>
            </HighchartsChart>
          </div>
        </div>
          <div className="col-md-12 row">
            <div className="form-group col-md-4">
              <label htmlFor="sel1">Select Months:</label>
              <select className="form-control" id="sel1"
                onChange={(evt) => { this.setState({month: evt.target.value}); }}>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="March">Mar</option>
                <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sel1">Select Year:</label>
              <select className="form-control" id="sel12"
                onChange={(evt) => { this.setState({year: evt.target.value}); }}>
                <option value="2014" >2010</option>
                <option value="2015">2011</option>
                <option value="2016">2012</option>
                <option value="2017">2013</option>
                <option value="2014" >2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                  <option value="2015">2018</option>
                  <option value="2016">2019</option>
                  <option value="2017">2020</option>
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
