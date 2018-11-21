import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router";
import _ from "lodash";
import Menu from "src/components/generic/Menu";
import { dateFormatter } from '../../../helper/helper';
import { bindActionCreators } from "redux";
import { isNotUserValid } from "src/services/generic";
import LoadingIcon from "src/components/generic/LoadingIcon";
import * as actions from "src/redux/actions";
import Header from "src/components/generic/Header";
import GetLogo from "src/components/auth/login/GetLogo";
import UsersListHeader from "src/components/generic/UsersListHeader";
import PageUserDashboard from "modules/manageUsers/components/PageUserDashboard";
import PageMonthlyHours from "modules/manageUsers/components/PageMonthlyHours";
import PageEmployeePerformance from "modules/manageUsers/components/PageEmployeePerformance";
import EmployeeLeastActiveHours from 'modules/manageUsers/components/employeeLeastActiveHours';
import NewEmployeeLeastActiveHours from 'modules/manageUsers/components/newEmployeeLeastActiveHours'
import PageEmployeeLifeCycle from "modules/manageUsers/components/PageEmployeeLifeCycle";
import PageEmpHours from "modules/manageUsers/components/PageEmpHours";
import { resetLoggedUser } from "src/services/generic";
import { getLoggedUser } from "src/services/generic";
import * as actionsManageUserPendingHours from "src/redux/workingHours/actions/manageUserPendingHour";

var moment = require("moment");

class ManageDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: dateFormatter(),
      defaultTeamDisplay: "",
      status_message: "",
      active: "active",
      firstArrow: "hidden",
      secondArrow: "hidden",
      thirdArrow: "hidden",
      fourthArrow: "hidden",
      fifthArrow: "show",
      teamList: "hidden",
      empLifeCycle: "hidden",
      empHours: "hidden",
      monthlyHours: "hidden",
      empPerformance: "show",
      empData: "",
      currentDate: "",
      currentYear: "",
      currentMonth: "",
      date: "",
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      years: [],
      startDate: null,
      endDate: null
    };
    this.openPage = this.openPage.bind(this);
    this.getByData = this.getByData.bind(this);
  }
  componentWillMount(props) {
    window.scrollTo(0, 0);
    const dateData = new Date();
    const dataDate = dateData.toString().split(" ");
    const year = dateData.getFullYear();
    const month = dateData.getMonth();
    const date = dataDate[2];
    const months = this.state.months;
    const userId = localStorage.getItem("userid");
    let startYear = 2010;
    let yearOptions = [];
    while (startYear <= year) {
      yearOptions.push(startYear);
      startYear++;
    }
    this.setState({
      currentMonth: months[month],
      currentYear: year,
      currentDate: date,
      years: yearOptions,
      date: dateData
    });
    this.props.requestEmployeeHours({
      id: userId,
      date: date,
      month: months[month],
      year: year
    });
    
    this.props.requestLeastActiveEmployee({
      start_date: "",
      end_date: ""
    })
    let monthlyReport = {
      month: this.state.dateObject.monthAlpha,
      year: year
    };
    this.props.requestUserList();
    this.props.requestTeamStats();
    this.props.requestEmployeLifeCycle({
      start_year: year,
      end_year: year
    });

    this.props.requestEmployeeMonthlyHours({
      id: userId,
      month: months[month],
      year: year
    });

    this.props.requestEmployeePerformance({
      id: userId,
      month: months[month],
      year: year
    });
   
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    let tokenData = getLoggedUser().data;
    let testDate = tokenData.login_date_time;
    let logintime = moment(testDate).format("MM/DD/YYYY hh:mm:ss a");
    var now = moment(new Date()),
      end = moment(testDate),
      hours = now.diff(end, "hours");

    if (hours > 1) {
      resetLoggedUser();
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      defaultTeamDisplay: props.teamStats.teamStats.data.teams,
      empData: props.empHours
    });
  }
  getByData(data) {
    const userId = localStorage.getItem('userid');
    this.props.requestMonthlyReportAllUsers({
      'month': data.month,
      'year': data.year
    });
  }

  openPage(toDisplay) {
    if (toDisplay === "team_list") {
      this.setState({
        teamList: "row",
        firstArrow: "show",
        empLifeCycle: "hidden",
        empHours: "hidden",
        monthlyHours: "hidden",
        empPerformance: "hidden",
        secondArrow: "hidden",
        thirdArrow: "hidden",
        fourthArrow: "hidden",
        fifthArrow: "hidden"
      });
    } else if (toDisplay === "emp_life_cycle") {
      this.setState({
        empLifeCycle: "row",
        secondArrow: "show",
        teamList: "hidden",
        firstArrow: "hidden",
        thirdArrow: "hidden",
        fourthArrow: "hidden",
        fifthArrow: "hidden",
        empHours: "hidden",
        monthlyHours: "hidden",
        empPerformance: "hidden"
      });
    } else if (toDisplay === "attendance_list") {
      this.setState({
        empHours: "row",
        thirdArrow: "show",
        teamList: "hidden",
        firstArrow: "hidden",
        empLifeCycle: "hidden",
        secondArrow: "hidden",
        fourthArrow: "hidden",
        fifthArrow: "hidden",
        monthlyHours: "hidden",
        empPerformance: "hidden"
      });
    } else if (toDisplay === "monthlyHours") {
      this.setState({
        monthlyHours: "row",
        fourthArrow: "show",
        empHours: "hidden",
        thirdArrow: "hidden",
        teamList: "hidden",
        firstArrow: "hidden",
        empLifeCycle: "hidden",
        empPerformance: "hidden",
        secondArrow: "hidden",
        fifthArrow: "hidden"
      });
    } else if (toDisplay === "employee_performance") {
      this.setState({
        empPerformance: "row",
        fifthArrow: "show",
        monthlyHours: "hidden",
        fourthArrow: "hidden",
        empHours: "hidden",
        thirdArrow: "hidden",
        teamList: "hidden",
        firstArrow: "hidden",
        empLifeCycle: "hidden",
        secondArrow: "hidden"
      });
    }
  }
  handleStartDate(date){
    this.setState({
      startDate: date
    });
  }
  handleEndDate(date){
    const {
      startDate,endDate
    } = this.state;
    this.setState({
      endDate: date
    },()=>{
    if(startDate){
      const start_date = moment(startDate).format('YYYY-MM-DD');
      const end_date = moment(date).format('YYYY-MM-DD');
      this.props.requestLeastActiveEmployee({
        start_date: start_date,
        end_date: end_date
      })
    }
    });
    
  }
  render() {
    return (
      <div>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="nav-dashboard box-shadow m-b p-y-sm">
            <div className="navbar">
              <img
                className="p-0"
                style={{ marginTop: "0.7%" }}
                src="./logo.png"
                height="40"
                width="220"
              />
              <Link to="page_login">
                <p
                  className="p-dashboard"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Login"
                >
                  <i id="openLogin" className="material-icons">
                    power_settings_new
                  </i>
                </p>
              </Link>
            </div>
          </div>
          <div className="app-body " id="view">
            <div className="padding">
              <LoadingIcon loading={this.props.teamStats.isLoading} />
            </div>
            <div className="p-a-lg">
              {/* <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-12 pull-sm-12">
                <div className="p-y-md clearfix nav-active-primary">
                <ul className="nav nav-pills nav-sm" style={{marginLeft: '4%'}}>
                {this.state.role==='admin'?
                <li onClick={() => { this.openPage('team_list'); }} className={`nav-item ${this.state.active}`}>
                <a className="nav-link" href="" data-toggle="tab" data-target="#tab_1" aria-expanded="true">Team Dashboard</a>
                <div className={this.state.firstArrow}>
                <span className="arrow bottom b-accent"></span>
                </div>
                </li>:null}
                <li onClick={() => { this.openPage('employee_performance'); }} className={`nav-item ${this.state.active}`}>
                <a className="nav-link" href="" data-toggle="tab" data-target="#tab_5" aria-expanded="false">Employee Monthly Performance</a>
                <div className={this.state.fifthArrow}>
                <span className="arrow bottom b-accent"></span>
                </div>
                </li>

                <li onClick={() => { this.openPage('emp_life_cycle'); }} className={'nav-item'}>
                <a className="nav-link" href="" data-toggle="tab" data-target="#tab_2" aria-expanded="false">Employee Life Cycle</a>
                <div className={this.state.secondArrow}>
                <span className="arrow bottom b-accent"></span>
                </div>
                </li>

                <li onClick={() => { this.openPage('attendance_list'); }} className={'nav-item'}>
                <a className="nav-link" href="" data-toggle="tab" data-target="#tab_3" aria-expanded="false">Employee TimeTable</a>
                <div className={this.state.thirdArrow}>
                <span className="arrow bottom b-accent"></span>
                </div>
                </li>
                <li onClick={() => { this.openPage('monthlyHours'); }} className={'nav-item'}>
                <a className="nav-link" href="" data-toggle="tab" data-target="#tab_4" aria-expanded="false">Employee Monthly Hours</a>
                <div className={this.state.fourthArrow}>
                <span className="arrow bottom b-accent"></span>
                </div>
                </li>

                </ul>
                </div>
                  </div>
                  <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  </div>
                </div>
              </div> */}
              <div className="row">
                {this.state.role === "admin" ? (
                  <div className="col-xs-12 well box-shadow-deep p-a box">
                    <PageUserDashboard
                      {...this.props}
                      team={this.props.teamStats.teamStats.data.teams}
                    />
                  </div>
                ) : null}
                <div className="col-xs-12 well box-shadow-deep p-a box">
                  <PageEmployeePerformance
                    employeePerformance={this.props.employeePerformance}
                    {...this.props}
                    currentMonth={this.state.currentMonth}
                    currentYear={this.state.currentYear}
                    year={this.state.years}
                    months={this.state.months}
                    currentDate={this.state.date}
                  />
                </div>
                <div className="col-xs-12 well box-shadow-deep p-a box">
                  <PageMonthlyHours
                    monthlyHours={this.props.monthlyHours}
                    {...this.props}
                    currentMonth={this.state.currentMonth}
                    currentYear={this.state.currentYear}
                    year={this.state.years}
                    months={this.state.months}
                  />
                </div>
                {this.state.role === "admin" ? (
                  <div className="col-xs-12 well box-shadow-deep p-a box">
                    <PageEmployeeLifeCycle
                      empLifeCycle={this.props.empLifeCycle}
                      {...this.props}
                      currentMonth={this.state.currentMonth}
                      currentYear={this.state.currentYear}
                      year={this.state.years}
                      months={this.state.months}
                    />
                  </div>
                ) : null}
                {/* <div className="col-xs-12 well box-shadow-deep p-a box">
                  <EmployeeLeastActiveHours
                    currentMonth={this.state.currentMonth}
                    currentYear={this.state.currentYear}
                    year={this.state.years}
                    {...this.props}
                    getByData={this.getByData}
                    months={this.state.months}
                    monthlyAllUsersReport={this.props.monthlyAllUsersReport}
                  />
                </div> */}
              
                <div className="col-xs-12 well box-shadow-deep p-a box">
                  <NewEmployeeLeastActiveHours
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}

                    handleStartDate={(date) => { this.handleStartDate(date)}}
                    handleEndDate={(date) => { this.handleEndDate(date) }}
                    empActiveHoursList={this.props.leastActiveEmp}
                  />
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
    loggedUser: state.logged_user.userLogin,
    usersList: state.usersList.toJS(),
    teamStats: state.teamStats,
    empLifeCycle: state.teamStats.empLifeCycle,
    monthlyAllUsersReport: state.teamStats.monthlyAllUsersReport,
    manageUserPendingHours: state.manageUserPendingHours.toJS(),
    empHours: state.teamStats.empHours,
    monthlyHours: state.teamStats.monthlyHours,
    employeePerformance: state.teamStats.employeePerformance,
    employeeList: state.teamStats.employeeList,
    leastActiveEmp:state.teamStats.leastActiveEmp
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageDashboard));
