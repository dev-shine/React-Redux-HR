import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import _ from 'lodash';
import Menu from 'components/generic/Menu';
import {bindActionCreators} from 'redux';
import {isNotUserValid} from 'src/services/generic';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions from 'appRedux/actions';
import Header from 'components/generic/Header';
import GetLogo from 'components/auth/login/GetLogo';
import UsersListHeader from 'components/generic/UsersListHeader';
import PageUserDashboard from 'modules/manageUsers/components/PageUserDashboard';
import PageMonthlyHours from 'modules/manageUsers/components/PageMonthlyHours';
import PageEmployeePerformance from 'modules/manageUsers/components/PageEmployeePerformance';
import PageEmployeeLifeCycle from 'modules/manageUsers/components/PageEmployeeLifeCycle';
import PageEmpHours from 'modules/manageUsers/components/PageEmpHours';
import * as actionsManageUserPendingHours from 'appRedux/workingHours/actions/manageUserPendingHour';

class ManageDashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultTeamDisplay: '',
      status_message:     '',
      active:             'active',
      firstArrow:         'show',
      secondArrow:        'hidden',
      thirdArrow:         'hidden',
      fourthArrow:        'hidden',
      fifthArrow:         'hidden',
      teamList:           'show',
      empLifeCycle:       'hidden',
      empHours:           'hidden',
      monthlyHours:       'hidden',
      empPerformance:     'hidden',
      empData:            '',
      currentYear:        '',
      currentMonth:       '',
      months:             ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      years:              []
    };
    this.openPage = this.openPage.bind(this);
  }
  componentWillMount (props) {
    window.scrollTo(0, 0);
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const months = this.state.months;
    const userId = localStorage.getItem('userid');
    let startYear = 2010;
    let yearOptions = [];
    while (startYear <= year) {
      yearOptions.push(startYear);
      startYear++;
    }
    this.setState({
      currentMonth: months[month],
      currentYear:  year,
      years:        yearOptions
    });
    this.props.requestEmployeeHours({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    this.props.requestUserList();
    this.props.requestTeamStats();
    this.props.requestEmployeLifeCycle({
      'start_year': year,
      'end_year':   year
    });
    this.props.requestEmployeeMonthlyHours({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    this.props.requestEmployeePerformance({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    this.setState({
      defaultTeamDisplay: props.teamStats.teamStats.data.teams,
      empData:            props.empHours
    });
  }

  openPage (toDisplay) {
    if (toDisplay === 'team_list') {
      this.setState({
        teamList:       'row',
        firstArrow:     'show',
        empLifeCycle:   'hidden',
        empHours:       'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden',
        secondArrow:    'hidden',
        thirdArrow:     'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden'
      });
    } else if ((toDisplay === 'emp_life_cycle')) {
      this.setState({
        empLifeCycle:   'row',
        secondArrow:    'show',
        teamList:       'hidden',
        firstArrow:     'hidden',
        thirdArrow:     'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden',
        empHours:       'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden'
      });
    } else if ((toDisplay === 'attendance_list')) {
      this.setState({
        empHours:       'row',
        thirdArrow:     'show',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        secondArrow:    'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden'
      });
    } else if ((toDisplay === 'monthlyHours')) {
      this.setState({
        monthlyHours:   'row',
        fourthArrow:    'show',
        empHours:       'hidden',
        thirdArrow:     'hidden',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        empPerformance: 'hidden',
        secondArrow:    'hidden',
        fifthArrow:     'hidden'
      });
    } else if ((toDisplay === 'employee_performance')) {
      this.setState({
        empPerformance: 'row',
        fifthArrow:     'show',
        monthlyHours:   'hidden',
        fourthArrow:    'hidden',
        empHours:       'hidden',
        thirdArrow:     'hidden',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        secondArrow:    'hidden'
      });
    }
  }
  render () {
    return (
      <div>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="nav-dashboard box-shadow m-b">
            <div className="navbar">
              <img className="p-0" style={{'marginTop': '0.7%'}} src="./logo.png" height="40" width="220"></img>
              <Link to="page_login">
                <p className='p-dashboard'
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Login">
                   <i className="material-icons">power_settings_new</i>
                   </p>
              </Link>
            </div>
            <div className="row no-gutter">
              <div className="col-12">
              </div>
            </div>
          </div>
          <div className="app-body" id="view">
            <div className="col-12">
              <LoadingIcon loading={this.props.teamStats.isLoading} />
            </div>
            <div>
              <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-12 pull-sm-12">
                    <div className="p-y-md clearfix nav-active-primary">
                      <ul className="nav nav-pills nav-sm" style={{marginLeft: '4%'}}>
                        <li onClick={() => { this.openPage('team_list'); }} className={`nav-item ${this.state.active}`}>
                          <a className="nav-link" href="" data-toggle="tab" data-target="#tab_1" aria-expanded="true">Team Dashboard</a>
                          <div className={this.state.firstArrow}>
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
                        <li onClick={() => { this.openPage('employee_performance'); }} className={'nav-item'}>
                          <a className="nav-link" href="" data-toggle="tab" data-target="#tab_5" aria-expanded="false">Employee Monthly Performance</a>
                          <div className={this.state.fifthArrow}>
                            <span className="arrow bottom b-accent"></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  </div>
                </div>
              </div>
              <div className="padding">
                <div className={this.state.teamList}>
                  <PageUserDashboard {...this.props} team={this.props.teamStats.teamStats.data.teams} />
                </div>
                <div className={this.state.empLifeCycle}>
                  <PageEmployeeLifeCycle empLifeCycle={this.props.empLifeCycle} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                </div>
                <div className={this.state.monthlyHours}>
                  <PageMonthlyHours monthlyHours={this.props.monthlyHours} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                </div>
                <div className={this.state.empPerformance}>
                  <PageEmployeePerformance employeePerformance={this.props.employeePerformance} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                </div>
                <div className="padding">
                  <div className={this.state.empHours}>
                    <PageEmpHours empHours={this.props.empHours}{...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:               state.frontend.toJS(),
    loggedUser:             state.logged_user.userLogin,
    usersList:              state.usersList.toJS(),
    teamStats:              state.teamStats,
    empLifeCycle:           state.teamStats.empLifeCycle,
    manageUserPendingHours: state.manageUserPendingHours.toJS(),
    empHours:               state.teamStats.empHours,
    monthlyHours:           state.teamStats.monthlyHours,
    employeePerformance:    state.teamStats.employeePerformance,
    employeeList:           state.teamStats.employeeList
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleManageDashboard = connect(mapStateToProps, mapDispatchToProps)(ManageDashboard);

const RouterVisibleManageDashboard = withRouter(VisibleManageDashboard);

export default RouterVisibleManageDashboard;
