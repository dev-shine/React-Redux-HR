import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as actions from 'appRedux/actions';
import 'react-date-picker/index.css';
var moment = require('moment');

class EmployeeLeastActiveHours extends Component {
    constructor(props){
        super(props);
        this.state={
            year:                '',
            month:               '',
            userId:              '',
            monthlyAllUsersReport: ''
        }
        this.handleMonth = this.handleMonth.bind(this);
        this.handleYear = this.handleYear.bind(this);
    }
    componentWillMount () {
        this.setState({
          year:this.props.currentYear,
          month:this.props.currentMonth,
          monthlyAllUsersReport: this.props.monthlyAllUsersReport
        });
      }
      componentWillReceiveProps (props) {
        this.setState({
            monthlyAllUsersReport: props.monthlyAllUsersReport
        });
      }
      handleMonth(data){
        this.setState({month:data});
        this.getByData({month:data, change: 'month' });
      }
    
      handleYear(data){
        this.setState({ year: data});
        this.getByData({ year: data, change: 'year' });
      }
      getByData (data) {
        const userId = localStorage.getItem('userid');
        let year = this.state.year !== '' ? this.state.year : this.props.currentYear;
        let month = this.state.month !== '' ? this.state.month : this.props.currentMonth;
        if(data.change === 'month'){
          month=data.month;
        }else if (data.change === 'year') {
          year=data.year;
        }
        this.props.requestMonthlyReportAllUsers({
          'month': month,
          'year':  year
        });
      }
    render() {
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
                        <h6>Employee Least Active</h6>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th>Employee Name</th>
                                <th>Average Active Hours</th>
                                <th>Average Total Hours</th>
                                </tr>
                            </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="collapse">
                    
                </div>
                <div className="container p-t ">
                <div className="row">
                    <div className="form-group col-xs-6 profile-input p-a">
                    <label htmlFor="sel1">Select Months:</label>
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



function mapStateToProps (state) {
    return {
      frontend:       state.frontend.toJS(),
      loggedUser:     state.logged_user.userLogin,
      usersList:      state.usersList.toJS(),
      teamStats:      state.teamStats,
      monthlyAllUsersReport: state.teamStats.monthlyAllUsersReport,
      empLifeCycle:   state.teamStats.empLifeCycle,
      empHours:       state.teamStats.empHours,
      monthlyHours:   state.teamStats.monthlyHours,
      empPerformance: state.teamStats.employeePerformance
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeLeastActiveHours));