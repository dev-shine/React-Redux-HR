import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import Menu from 'components/generic/Menu';
import {bindActionCreators} from 'redux';
import {isNotUserValid} from 'src/services/generic';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions from 'appRedux/actions';
import Header from 'components/generic/Header';
import UsersListHeader from 'components/generic/UsersListHeader';
import PageUserDashboard from 'modules/manageUsers/components/PageUserDashboard';
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
      teamList:           'show',
      empLifeCycle:       'hidden',
      empHours:           'hidden',
      empData:            ''
    };
    this.openPage = this.openPage.bind(this);
  }
  componentWillMount (props) {
    window.scrollTo(0, 0);
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userId = localStorage.getItem('userid');
    this.props.requestEmployeeHours({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    this.props.requestTeamStats();
    this.props.requestEmployeLifeCycle(year, year);
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
        teamList:     'row',
        firstArrow:   'show',
        empLifeCycle: 'hidden',
        empHours:     'hidden',
        secondArrow:  'hidden',
        thirdArrow:   'hidden'
      });
    } else if ((toDisplay === 'emp_life_cycle')) {
      this.setState({
        empLifeCycle: 'row',
        secondArrow:  'show',
        teamList:     'hidden',
        firstArrow:   'hidden',
        thirdArrow:   'hidden',
        empHours:     'hidden'
      });
    } else if ((toDisplay === 'attendance_list')) {
      this.setState({
        empHours:     'row',
        thirdArrow:   'show',
        teamList:     'hidden',
        firstArrow:   'hidden',
        empLifeCycle: 'hidden',
        secondArrow:  'hidden'
      });
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Employees Dashboard'} />
          <div className="app-body" id="view">
            <div className="col-12">
              <LoadingIcon loading={this.props.teamStats.isLoading} />
            </div>
            <div>
              <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-6 pull-sm-6">
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
                  <PageEmployeeLifeCycle empLifeCycle={this.props.empLifeCycle} {...this.props} />
                </div>
                <div className="padding">
                  <div className={this.state.empHours}>
                    <PageEmpHours empHours={this.props.empHours}{...this.props} />
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
    empHours:               state.teamStats.empHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleManageDashboard = connect(mapStateToProps, mapDispatchToProps)(ManageDashboard);

const RouterVisibleManageDashboard = withRouter(VisibleManageDashboard);

export default RouterVisibleManageDashboard;
